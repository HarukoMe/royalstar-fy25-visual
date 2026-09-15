#!/usr/bin/env python3
"""Extract IF2 Key Facts chapters 1–6 and study-text chapter 1 into sourced sections.

Does not ingest chapter 7 onward.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader

UPLOADS = Path("/home/ubuntu/.cursor/projects/workspace/uploads")
KF = UPLOADS / "IF2KF61_2026_online_574a.pdf"
ST = UPLOADS / "IF2TB61_2026_online-17-264-5-19_8705.pdf"
OUT = Path(__file__).resolve().parents[1] / "src" / "curriculum" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

CHAPTERS = {
    1: {"title": "Motor insurance", "pdf": (7, 18), "printed": (5, 16)},
    2: {"title": "Health insurance", "pdf": (19, 26), "printed": (17, 24)},
    3: {"title": "Package policies", "pdf": (27, 48), "printed": (25, 46)},
    4: {"title": "Property insurance", "pdf": (49, 64), "printed": (47, 62)},
    5: {"title": "Pecuniary insurance", "pdf": (65, 74), "printed": (63, 72)},
    6: {"title": "Liability insurance", "pdf": (75, 94), "printed": (73, 92)},
}

HEADING_HINTS = {
    1: [
        "Private motor insurance",
        "Standard policy cover",
        "Road Traffic Act only",
        "Third party only",
        "Third party, fire and theft",
        "Comprehensive",
        "No claims discount",
        "Uninsured driver promise",
        "Optional extensions",
        "Breakage of glass",
        "Personal belongings and clothing",
        "Young additional drivers",
        "Loss of use",
        "Personal accident benefits",
        "Foreign use",
        "Elections",
        "Racing, competitions, rallies and trials",
        "Caravans and trailers",
        "Breakdown cover",
        "Motor legal expenses",
        "Joint policies",
        "Multi car policies",
        "Misfuelling",
        "Exclusions",
        "Motorcycle insurance",
        "Commercial motor insurance",
        "Third party liability",
        "Loss of or damage to the vehicle",
        "Trailers",
        "Limitations",
    ],
    2: [
        "Personal accident and sickness",
        "Accident cover",
        "Sickness cover",
        "Policy benefits",
        "Death",
        "Permanent total disablement",
        "Permanent partial disablement",
        "Temporary total disablement",
        "Temporary partial disablement",
        "Medical expenses",
        "Optional extensions",
        "Geographical limits",
        "Age limits",
        "Exclusions",
        "Medical expenses insurance",
        "Standard policy cover",
        "Limitations",
    ],
    3: [
        "Introduction",
        "Household insurance",
        "Building insurance",
        "Contents insurance",
        "Legal liability",
        "Travel insurance",
        "Commercial packages",
        "Shopkeepers",
        "Office",
        "Tradesman",
        "Hotel",
    ],
    4: [
        "Fire and special perils",
        "Theft insurance",
        "Glass insurance",
        "Money insurance",
        "All risks",
        "Engineering",
    ],
    5: [
        "Legal expenses insurance",
        "Business interruption insurance",
        "Material damage warranty",
        "Fidelity",
        "Credit insurance",
    ],
    6: [
        "Employers’ liability",
        "Employers' liability",
        "Public liability",
        "Product liability",
        "Directors",
        "Professional indemnity",
        "Trustee",
        "Cyber insurance",
        "Extended warranties",
    ],
}


def clean(text: str) -> str:
    text = text.replace("\u00ad", "")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    # drop running headers
    lines = []
    for ln in text.splitlines():
        s = ln.strip()
        if re.match(r"^\d+\s+IF2/", s):
            continue
        if re.match(r"^IF2/\d{4}", s):
            continue
        lines.append(s)
    return "\n".join(lines).strip()


def extract_kf():
    reader = PdfReader(str(KF))
    sections = []
    for ch, meta in CHAPTERS.items():
        a, b = meta["pdf"]
        printed_start, _ = meta["printed"]
        buf = []
        for pdf_i in range(a - 1, b):
            raw = reader.pages[pdf_i].extract_text() or ""
            printed = printed_start + (pdf_i - (a - 1))
            buf.append((printed, pdf_i + 1, clean(raw)))
        # stitch into paragraphs
        full = []
        for printed, pdf_i, t in buf:
            full.append({"printedPage": printed, "pdfPage": pdf_i, "text": t})
        sections.append(
            {
                "chapter": ch,
                "title": meta["title"],
                "source": "key-facts",
                "edition": "IF2 2026 Key Facts",
                "pages": full,
            }
        )
        if ch == 6:
            last_text = buf[-1][2]
            assert "Non-insurance" not in last_text[:200]
    return sections


def extract_study_ch1():
    reader = PdfReader(str(ST))
    pages = []
    for i, page in enumerate(reader.pages):
        t = clean(page.extract_text() or "")
        pages.append({"printedPage": i + 1, "pdfPage": i + 1, "text": t})
    return {
        "chapter": 1,
        "title": "Motor insurance",
        "source": "study-text",
        "edition": "IF2 2026 Study Text extract (Chapter 1)",
        "pages": pages,
    }


def main():
    kf = extract_kf()
    study = extract_study_ch1()
    payload = {
        "scope": "chapters-1-to-6",
        "syllabusYear": 2026,
        "keyFacts": kf,
        "studyText": [study],
        "excluded": "Chapters 7 onward were not ingested.",
    }
    path = OUT / "sources.json"
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2))
    print("wrote", path, "bytes", path.stat().st_size)
    # integrity: no chapter 7 heading as a chapter object
    titles = [c["title"] for c in kf]
    assert titles == [
        "Motor insurance",
        "Health insurance",
        "Package policies",
        "Property insurance",
        "Pecuniary insurance",
        "Liability insurance",
    ]


if __name__ == "__main__":
    main()
