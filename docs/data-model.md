# Data Model

## Entities

### Customer

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `name` | string | Normalized display name, e.g. "Ramesh" |
| `aliases` | string[] | Alternate spoken forms matched during STT (e.g. "Ramesh bhai") |
| `totalCredit` | number | Sum of all credit (udhaar) given, in rupees |
| `totalPaid` | number | Sum of all repayments recorded |
| `pendingDue` | number | Derived: `totalCredit - totalPaid` |
| `createdAt` | datetime | |
| `updatedAt` | datetime | |

### LedgerEntry

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Primary key |
| `customerId` | ObjectId \| null | Null for cash sales with no named customer |
| `rawTranscript` | string | Exact STT output, kept for audit/correction |
| `type` | enum: `credit` \| `debit` \| `payment` | `credit` = udhaar given, `debit` = cash sale, `payment` = due repayment |
| `amount` | number | Rupees |
| `item` | string \| null | Optional item/description if spoken |
| `confidence` | number | Parser confidence score (0-1), used to decide if confirmation UI is shown |
| `confirmed` | boolean | Whether the user confirmed the parsed fields before save |
| `createdAt` | datetime | |

### DailySummary (derived, computed not stored per entry)

| Field | Type | Notes |
|---|---|---|
| `date` | date | |
| `totalSales` | number | Sum of `debit` entries for the day |
| `totalCreditGiven` | number | Sum of `credit` entries for the day |
| `totalPaymentsReceived` | number | Sum of `payment` entries for the day |

## Structured Output Contract (LLM stage)

The local LLM must emit strictly this JSON shape from a raw transcript. This is the contract between the parsing stage and the ledger store — see [API Contracts](api-contracts.md).

```json
{
  "customerName": "Ramesh",
  "amount": 500,
  "type": "credit",
  "item": null,
  "confidence": 0.92
}
```

Rules:
- `amount` is always a positive number in rupees, currency words stripped
- `type` must be one of `credit`, `debit`, `payment` — never free text
- `customerName` is `null` when no name is spoken (plain cash sale)
- `confidence` below a threshold (default `0.6`) forces the confirm-before-save UI

[Back to README](../README.md)
