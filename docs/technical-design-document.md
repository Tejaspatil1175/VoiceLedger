# Technical Design Document — VoiceLedger

| Field | Value |
|---|---|
| Status | Draft |
| Owner | Tejas Bachhav |
| Team | Neural Ninjas |
| Related | [System Architecture](../architecture/system-architecture.md), [Data Flow](../architecture/data-flow.md), [Component Diagram](../architecture/component-diagram.md) |

## 1. Purpose

Define the technical approach for VoiceLedger: an offline, voice-first ledger app that converts a spoken transaction into a structured bookkeeping entry, entirely on-device, for shopkeepers and street vendors who cannot rely on typing or connectivity.

## 2. Problem Statement

Small shopkeepers track sales and customer credit (udhaar) on paper because existing digital ledger apps still require typing and a stable internet connection. Both assumptions fail for this user base: they are hands-busy and often in low or no-connectivity areas, and they think in Hindi, Marathi, or Hinglish rather than English app UI.

## 3. Goals and Non-Goals

**Goals**
- Convert a single spoken transaction into a structured ledger entry with no typing
- Run speech-to-text and language understanding fully on-device, with zero network calls
- Keep running totals and pending dues (udhaar) accurate after every entry
- Support Hindi, Marathi, and Hinglish input in the same session

**Non-Goals (for this build)**
- Multi-device sync or cloud backup
- Multi-user / multi-shop accounts
- Payment collection or gateway integration
- Full accounting features (GST, invoicing, tax reports)

## 4. Users and Use Cases

Primary user: a kirana store owner or street vendor recording day-to-day sales and credit given to regular customers, mid-transaction, with a phone in one hand.

Core use case: "Ramesh ko 500 rupaye udhaar diya" is spoken, recognized, parsed into `{customer: Ramesh, amount: 500, type: credit}`, and reflected instantly in the ledger and in Ramesh's running due balance.

## 5. High-Level Architecture

See [System Architecture](../architecture/system-architecture.md) for the full diagram. Summary of the pipeline:

1. Mic captures raw audio
2. Whisper Tiny (on-device STT) transcribes audio to text
3. Local LLM (Phi-3 or Gemma 2B) parses the transcript into structured fields
4. The structured JSON entry is written to the local data layer
5. Running totals and pending dues are recalculated
6. The ledger UI updates immediately

Both AI models run on the Snapdragon NPU, which is the reason this must be a phone-first build rather than a laptop-only prototype — offline, low-latency inference at this scale is not something a laptop CPU/GPU-only path meaningfully demonstrates for this use case.

## 6. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Mobile app | React Native | Cross-platform UI, single codebase for demo speed |
| App logic / local server layer | Node.js + Express | Runs bundled logic for parsing orchestration and local API surface used by the RN app |
| Local data layer | MongoDB (local instance) | Document store fits the variable structure of parsed entries; no cloud connection used |
| Speech-to-text | Whisper Tiny (on-device, quantized) | Runs on NPU for offline STT |
| NLU / structuring | Phi-3-mini or Gemma 2B (on-device, quantized) | Extracts structured fields from raw transcript |
| Charts | Recharts or Victory Native | Daily/weekly spend and credit trend visualization (Green Light phase) |

## 7. Data Model

See [Data Model](data-model.md) for full entity definitions and the JSON schema used between the LLM output and the ledger store.

## 8. API / Interface Contracts

See [API Contracts](api-contracts.md) for the internal interfaces between the STT stage, the parsing stage, and the local data layer.

## 9. Non-Functional Requirements

See [Non-Functional Requirements](non-functional-requirements.md) for latency, offline, accuracy, and reliability targets.

## 10. Testing Strategy

See [Testing Strategy](testing-strategy.md) for the test plan across STT accuracy, parsing accuracy, and ledger correctness.

## 11. Risks and Open Questions

| Risk | Impact | Mitigation |
|---|---|---|
| On-device LLM misparses ambiguous phrasing (e.g. unclear name/amount order) | Wrong ledger entry | Confirmation step showing parsed fields before final save; edit-before-save UI |
| Code-mixed Hindi/Marathi/English reduces STT accuracy | Bad transcript in → bad structured data out | Fine-tune/prompt-tune parsing stage to tolerate noisy transcripts; allow quick voice correction |
| NPU model load time on first launch | Slow first entry, bad demo impression | Preload/warm models at app start, not at first recording |
| Ambiguous customer name matching (e.g. "Ramesh" vs existing "Ramesh Patil") | Duplicate or misattributed customer records | Fuzzy-match against existing customer list with a confirm-new-customer prompt |

## 12. Milestones

| Milestone | Scope |
|---|---|
| M1 | Mic capture and Whisper Tiny transcription working offline |
| M2 | Local LLM parsing transcript into structured fields |
| M3 | Ledger store with running totals and pending dues |
| M4 | UI polish, charts, and reminder message drafts |
| M5 | Demo video walkthrough |

## 13. Revision History

| Date | Change |
|---|---|
| 2026-09-01 | Initial draft |

[Back to README](../README.md)
