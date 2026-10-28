# Quadratic and Fractional Equations

A 10-level interactive course on Quadratic and Fractional Equations (Sec 3 E-Maths, Chapter 1), including a calculator-skills level for the Casio fx-97SG X.
Plain HTML, CSS and JavaScript. No build step.

## Run it on a computer

```bash
cd quadratic-fractional-equations
python3 -m http.server 8765
```

Then open http://localhost:8765. Progress is saved in that browser.

## Publish on GitHub Pages

1. Put this folder's contents in a GitHub repository.
2. Repository Settings → Pages → Source: "Deploy from a branch" → `main` / root.
3. The site appears at `https://<username>.github.io/<repository>/`.

Math is rendered with KaTeX loaded from cdnjs, so the page needs an internet connection.
All questions are original and randomly generated; no textbook pages are included.

## Shared XP policy — 28 October 2026

1,000 XP = $2. Existing balances become a preserved opening credit. New completed assessments use the Editing score curve, scaled by question count; retries pay only improvements under a stable content ID. Hints and corrections do not deduct XP. Completion badges and guided training do not add cash bonuses. Cloud transactions merge XP ledgers so stale saves do not lower the balance. Arcade tokens remain separate. See XP-POLICY.md. Run `node check-xp.cjs` for reward and migration checks.

## Subject gaming tokens

Maze Chase, Snake, Block Breaker and Tetris reuse Editing’s game engines. Each subject has its own wallet: one token per earned XP, including a one-time matching credit for preserved XP. Games cost 80 tokens per minute (750 ms per token), charged only during active play; pausing, leaving the tab and returning to learning stop play. XP is never deducted. Saved balances do not expire. No XP or token transfers between subjects.

The `gameTokens` field is separate from Physics’s existing `arcade` learning progress. Per-session spending counters merge with cloud saves without refunding stale spending; browser locks prevent simultaneous play in two tabs of the same subject/account. Parent testing uses a separate fictional balance. Run `node check-tokens.cjs` for credit, isolation, spending, reload and merge checks. Existing Editing balances and its arcade are unchanged.
