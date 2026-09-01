# Testing Strategy

## 1. STT Layer

| Test | Method |
|---|---|
| Hindi transaction phrases | Recorded test set of 20+ common udhaar/sale phrases, checked against expected transcript |
| Marathi transaction phrases | Same, Marathi test set |
| Hinglish / code-mixed phrases | Same, mixed test set (most realistic real-world case) |
| Noisy environment | Test set recorded with background shop noise |

## 2. Parsing Layer

| Test | Method |
|---|---|
| Correct field extraction | Feed known-good transcripts, assert `customerName`, `amount`, `type` match expected |
| Ambiguous phrasing | Feed transcripts with unclear amount/name order, assert confidence drops below threshold and confirm-UI triggers |
| Malformed model output | Force a bad JSON response, assert retry-then-fallback path works without crashing |
| New vs existing customer | Assert fuzzy name matching correctly reuses existing customer records for close matches |

## 3. Ledger Store

| Test | Method |
|---|---|
| Running totals | After N entries of mixed type, assert `totalCredit`, `totalPaid`, `pendingDue` are arithmetically correct |
| Persistence | Kill and relaunch app, assert all entries and totals are intact |
| Entry correction | Edit a saved entry, assert totals recompute correctly |

## 4. End-to-End

| Test | Method |
|---|---|
| Full voice-to-ledger loop | Speak a transaction, verify it appears correctly in the ledger view within the latency target |
| Offline guarantee | Enable airplane mode, run the full loop, confirm no failure and no network calls attempted |

[Back to README](../README.md)
