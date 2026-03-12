===============
## Known Bugs

### 1. Negative amount is accepted in payment/request transaction
**Steps to reproduce:**
1. Login
2. Click New Transaction
3. Select a user
4. Enter negative amount e.g. -100
5. Click Pay or Request

**Expected:** Buttons should be disabled, transaction should be rejected
**Actual:** Transaction is accepted with negative amount

---

### 2. SQL injection accepted in amount field
**Steps to reproduce:**
1. Login
2. Click New Transaction
3. Select a user
4. Enter `' OR '1'='1` in amount field
5. Click Pay or Request

**Expected:** Buttons should be disabled, only numeric values allowed
**Actual:** Application parses number from string and accepts transaction with amount $11

**Suggested improvement:** Add numeric-only validation on amount field

### 3. No maximum amount limit on transaction
**Steps to reproduce:**
1. Login
2. Click New Transaction
3. Select a user
4. Enter extremely large amount e.g. 999999999999
5. Click Pay

**Expected:** Buttons should be disabled or error message shown
**Actual:** Transaction is accepted with no limit on amount

**Suggested improvement:** Add maximum amount validation on amount field


### Question / Clarification needed

#### Decimal amounts in transaction
**Observation:** Application does not accept decimal amounts e.g. 10.50
**Question:** Is this expected behavior? Should users be able to send decimal amounts?
**Status:** Needs clarification from product owner / developer


### Question / Clarification needed

#### Amount field is type="text" instead of type="number"
**Observation:** Amount field has `type="text"` with `inputmode="numeric"` 
**Question:** Should this be changed to `type="number"` for better validation?
**Status:** Needs clarification from developer
