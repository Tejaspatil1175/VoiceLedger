# API / Interface Contracts

Internal interfaces between pipeline stages. All calls are local (in-process or localhost) — there is no external network call anywhere in this list.

## 1. STT Stage — `transcribeAudio`

| | |
|---|---|
| Direction | Mic buffer to Whisper Tiny |
| Input | Raw audio buffer (PCM, 16kHz mono) |
| Output | `{ transcript: string, language: "hi" \| "mr" \| "en" \| "mixed" }` |
| Runs on | Snapdragon NPU |
| Failure mode | Empty/low-confidence transcript triggers a "didn't catch that, please repeat" prompt rather than a silent bad parse |

## 2. Parsing Stage — `parseTransaction`

| | |
|---|---|
| Direction | Transcript to structured entry |
| Input | `{ transcript: string, knownCustomers: string[] }` |
| Output | See structured output contract in [Data Model](data-model.md) |
| Runs on | Snapdragon NPU (Phi-3 / Gemma 2B) |
| Failure mode | Malformed JSON from the model is caught and retried once with a stricter format instruction before falling back to manual entry |

## 3. Local Data Layer — internal REST surface (Express, localhost only)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/entries` | Create a new ledger entry from a structured parse result |
| `GET` | `/entries` | List entries, filterable by date range and customer |
| `GET` | `/customers/:id` | Get a customer's profile and pending due |
| `GET` | `/customers/:id/entries` | Get all entries for one customer |
| `GET` | `/summary/daily` | Get computed daily/weekly totals for charts |
| `PATCH` | `/entries/:id` | Correct a previously saved entry (manual fix) |

Request/response bodies use the `LedgerEntry` and `Customer` shapes defined in [Data Model](data-model.md).

## 4. UI to Data Layer

The React Native app talks to the local Express layer over `localhost` only — this server never binds to a public interface and never makes outbound requests, which is what keeps the "no internet dependency" guarantee true end to end, not just at the AI-inference layer.

[Back to README](../README.md)
