# Non-Functional Requirements

| Category | Requirement | Target |
|---|---|---|
| Offline | No feature in the core loop (speak, transcribe, parse, save, view) requires network access | 100% offline |
| Latency | Time from end of speech to entry appearing in ledger | Under 3 seconds on target NPU hardware |
| STT accuracy | Word-level accuracy on Hindi/Marathi/Hinglish short transactional phrases | 85%+ on test set |
| Parsing accuracy | Correct extraction of customer, amount, and type on valid transcripts | 90%+ on test set |
| Data durability | Ledger entries survive app restart and device reboot | 100%, local persistent storage only |
| Privacy | No audio, transcript, or ledger data ever leaves the device | Enforced by architecture, not just policy |
| Battery/thermal | On-device inference should not cause noticeable device heating during normal use (a few entries per minute) | Verified on target device during demo prep |
| Recoverability | A misparsed entry can be corrected without re-recording | Confirm-before-save + manual edit always available |

## Explicitly Out of Scope for This Build

- Multi-language UI localization beyond the spoken-language handling above
- Concurrent multi-device usage for the same shop
- Formal accessibility audit (kept in mind but not a v1 gate)

[Back to README](../README.md)
