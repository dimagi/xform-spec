---
title: Cascade
---

The order in which form logic is evaluated and events are handled is of critical importance to ensure identical behaviour in different form engines.

[Actions](#actions) always fire before any [bind](#bind-attributes) logic is evaluated. So an [xforms-ready](#setvalue-events) event fires before relevants, calculates are evaluated.

Form logic specified in the `<bind>` nodes is evaluated in the following order:

1. relevant
2. calculate
3. required
4. constraint

[enketo](# "Enketo does this differently: calculate -> relevant -> output -> itemset. Required and constraint are not evaluated as part of the same cascade.")
