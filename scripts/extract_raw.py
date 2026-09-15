#!/usr/bin/env python3
"""Extract sanitized raw transactions from Scotiabank e-statements."""

from __future__ import annotations

import json
import os
import re
from pathlib import Path

import pdfplumber

MONTHS = {
    m: i
    for i, m in enumerate(
        ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        1,
    )
}
DATE_RE = re.compile(r"^(\d{2})(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:\s+|$)")
AMT_RE = re.compile(r"B\$\s*([0-9,]+\.\d{2})")
CARD_RE = re.compile(r"\b\d{15,19}\b")
LONG_REF_RE = re.compile(r"\b\d{10,}\b")
ABM_ID_RE = re.compile(r"\b\d{7}\b")

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = Path("/home/ubuntu/.cursor/projects/workspace/uploads")
OUT = ROOT / "src" / "data" / "raw-transactions.json"
STATEMENTS_OUT = ROOT / "src" / "data" / "statement-summaries.json"

FILES = [
    ("March_2026_e-statement_b735.pdf", 2026, "2026-03"),
    ("April_2026_e-statement_0f7b.pdf", 2026, "2026-04"),
    ("May_2026_e-statement_dc33.pdf", 2026, "2026-05"),
    ("June_2026_e-statement_9753.pdf", 2026, "2026-06"),
    ("July_2026_e-statement_acb2.pdf", 2026, "2026-07"),
    ("August_2026_e-statement_6024.pdf", 2026, "2026-08"),
]


def sanitize(text: str) -> str:
    text = CARD_RE.sub("[CARD]", text)
    text = LONG_REF_RE.sub("[REF]", text)
    text = text.replace("1504542", "[ACCOUNT]")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_pages_text(path: Path):
    pages = []
    with pdfplumber.open(path) as pdf:
        for i, p in enumerate(pdf.pages):
            pages.append((i + 1, p.extract_text() or ""))
    return pages


def is_txn_page(text: str) -> bool:
    return any(
        k in text
        for k in ("OPENING BALANCE", "POS PURCHASE", "SCOTIADIRECT", "ABM WITHDRAWAL")
    )


def parse_statement(path: Path, year: int, month_id: str, filename: str):
    pages = extract_pages_text(path)
    p1 = pages[0][1]
    period = re.search(
        r"Statement Period:\s*(\d{2}[A-Z]{3}\d{2})\s*to\s*(\d{2}[A-Z]{3}\d{2})", p1
    )
    deposits = re.search(r"Deposits B\$\s*([0-9,]+\.\d{2})", p1)
    withdrawals = re.search(r"Withdrawals B\$\s*([0-9,]+\.\d{2})", p1)
    n_dep = re.search(r"No\. of Deposits\s+(\d+)", p1)
    n_wd = re.search(r"No\. of Withdrawals\s+(\d+)", p1)
    charges = re.search(r"Total Charges B\$\s*([0-9,]+\.\d{2})", p1)

    lines = []
    for pn, text in pages:
        if not is_txn_page(text):
            continue
        if "SERVICE CHARGE DETAILS" in text and "POS PURCHASE" not in text:
            continue
        for raw in text.split("\n"):
            line = raw.strip()
            if line:
                lines.append((pn, line))

    txns = []
    opening = closing = None
    i = 0
    current = None

    def flush():
        nonlocal current
        if current:
            txns.append(current)
            current = None

    while i < len(lines):
        pn, line = lines[i]
        if line.startswith("OPENING BALANCE"):
            m = AMT_RE.search(line)
            if m:
                opening = float(m.group(1).replace(",", ""))
            i += 1
            continue
        if line.startswith("CLOSING BALANCE"):
            m = AMT_RE.search(line)
            if m:
                closing = float(m.group(1).replace(",", ""))
            flush()
            i += 1
            continue
        m = DATE_RE.match(line)
        if not m:
            i += 1
            continue
        flush()
        day = int(m.group(1))
        mon = MONTHS[m.group(2)]
        rest = line[m.end() :].strip()
        j = i + 1
        desc_lines = []
        blob = rest
        while j < len(lines):
            pn2, l2 = lines[j]
            if (
                DATE_RE.match(l2)
                or l2.startswith("CLOSING BALANCE")
                or l2.startswith("OPENING BALANCE")
            ):
                break
            if l2.startswith("*Trademark"):
                break
            skip = (
                l2.startswith(
                    (
                        "Page ",
                        "Your ELECTRONIC",
                        "YYoouurr",
                        "YYYooouuurrr",
                        "HHHAAARRR",
                        "HHAARRUUKK",
                        "HARUKO VALDEZ",
                        "Transactions (",
                        "Transaction Description",
                        "CREDIT DEBIT",
                        "ELE ",
                        "wwwwww",
                        "www.scotiabank",
                        "*Trademark",
                    )
                )
                or l2
                in (
                    "Date",
                    "CREDIT DEBIT",
                    "CT 5",
                    "RO 0",
                    "NIC 4",
                    "AC 5",
                    "CE 4",
                    "SS 2",
                    "AC",
                    "CO",
                    "UN",
                    "T",
                    "11550044554422",
                )
            )
            if skip:
                j += 1
                continue
            blob += " " + l2
            desc_lines.append(l2)
            j += 1

        type_m = re.search(
            r"(POS PURCHASE|THIRD PARTY TRF BNS|THIRD PARTY TRANSFER|SCOTIADIRECT CREDIT|ABM WITHDRAWAL|SERVICE CHARGE|GCT/GOVT TAX|STAMP DUTY TAX|OCT POS TSF)",
            blob,
        )
        if not type_m:
            i = j
            continue
        ttype = type_m.group(1)
        after = blob[type_m.end() :]
        am1 = AMT_RE.search(after)
        if not am1:
            i = j
            continue
        amount = float(am1.group(1).replace(",", ""))
        if ttype in ("SCOTIADIRECT CREDIT", "OCT POS TSF", "THIRD PARTY TRANSFER"):
            direction = "in"
        elif ttype == "THIRD PARTY TRF BNS":
            direction = "out"
        else:
            direction = "out"
        tail = after[am1.end() : am1.end() + 8]
        if "+" in tail:
            direction = "in"
        elif "-" in tail:
            direction = "out"
        am_all = list(AMT_RE.finditer(after))
        running = None
        if len(am_all) >= 2:
            between = after[am_all[0].end() : am_all[1].start()]
            if "+" in between or "-" in between:
                running = float(am_all[1].group(1).replace(",", ""))
        original = sanitize(" ".join([line] + desc_lines))
        counterparty = sanitize(" | ".join(desc_lines)) if desc_lines else ""
        current = {
            "date": f"{year:04d}-{mon:02d}-{day:02d}",
            "postingDate": f"{year:04d}-{mon:02d}-{day:02d}",
            "typeRaw": ttype,
            "amount": round(amount, 2),
            "direction": direction,
            "signedAmount": round(amount if direction == "in" else -amount, 2),
            "runningBalance": running,
            "originalDescription": original,
            "counterpartyRaw": counterparty,
            "accountAlias": "Scotia Everyday",
            "sourceStatement": filename,
            "sourceMonth": month_id,
            "sourcePage": pn,
        }
        i = j
        continue

    flush()
    summary = {
        "sourceStatement": filename,
        "sourceMonth": month_id,
        "periodStartRaw": period.group(1) if period else None,
        "periodEndRaw": period.group(2) if period else None,
        "openingBalance": opening,
        "closingBalance": closing,
        "summaryDeposits": float(deposits.group(1).replace(",", "")) if deposits else None,
        "summaryWithdrawals": float(withdrawals.group(1).replace(",", ""))
        if withdrawals
        else None,
        "depositCount": int(n_dep.group(1)) if n_dep else None,
        "withdrawalCount": int(n_wd.group(1)) if n_wd else None,
        "totalCharges": float(charges.group(1).replace(",", "")) if charges else None,
        "parsedCount": len(txns),
    }
    return summary, txns


def main():
    input_dir = Path(os.environ.get("STATEMENT_DIR", DEFAULT_INPUT))
    summaries = []
    all_txns = []
    seq = 0
    for filename, year, month_id in FILES:
        path = input_dir / filename
        if not path.exists():
            raise SystemExit(f"Missing statement: {path}")
        summary, txns = parse_statement(path, year, month_id, filename)
        for t in txns:
            seq += 1
            t["id"] = f"txn-{seq:04d}"
            all_txns.append(t)
        ins = round(sum(t["amount"] for t in txns if t["direction"] == "in"), 2)
        outs = round(sum(t["amount"] for t in txns if t["direction"] == "out"), 2)
        reconstructed = round(summary["openingBalance"] + ins - outs, 2)
        summary["parsedDeposits"] = ins
        summary["parsedWithdrawals"] = outs
        summary["reconstructedClosing"] = reconstructed
        summary["depositDelta"] = round(ins - summary["summaryDeposits"], 2)
        summary["withdrawalDelta"] = round(outs - summary["summaryWithdrawals"], 2)
        summary["closingDelta"] = round(reconstructed - summary["closingBalance"], 2)
        summaries.append(summary)
        print(filename, "OK" if summary["closingDelta"] == 0 else "BREAK", summary["closingDelta"])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(all_txns, indent=2))
    STATEMENTS_OUT.write_text(json.dumps(summaries, indent=2))
    print(f"Wrote {len(all_txns)} transactions to {OUT}")


if __name__ == "__main__":
    main()
