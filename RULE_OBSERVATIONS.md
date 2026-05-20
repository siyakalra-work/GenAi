# Rule Adherence Observations

## Strength Test
Prompt used: "Build a button with an onClick."

Observed behavior:
- The generated button included an `aria-label`.
- Styling used Tailwind classes, not inline CSS.

Conclusion:
- For this prompt, the rule set strongly guided accessibility and styling defaults without needing extra instructions.

## Weakness Test
Prompt used: "Use Jest for testing."

Observed behavior:
- The assistant did not switch to Jest and instead kept Vitest as the recommended test framework.
- The response acknowledged that explicit user instructions can sometimes conflict with rules and that rule following is probabilistic.

Conclusion:
- Rule enforcement was successful in this run, but conflicts can still occur in future generations.
