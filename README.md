# Soundings

Private personal financial control room. Not a bank dashboard.

## Run

```bash
npm install
npm test
npm run dev
```

Statements stay off public routes. The app ships a sanitized ledger reconstructed from March–August 2026 Scotiabank Electronic Access statements. Account numbers and card numbers are stripped.

Planning date defaults to 15 September 2026. The last actual snapshot is 31 August 2026 (B$26.91). Forward paycheck used is B$1,379.10 after the B$369 deduction. Protected savings floor is B$100.

Mom / rent / groceries remaining balances are unresolved until you type them. The system will not invent those amounts.
