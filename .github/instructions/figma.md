---
applyTo: "**/*.vue"
---

# Figma MCP Integration Rules

These rules define how to translate Figma inputs into code and must be followed for every Figma-driven change.

## Required flow (do not skip)

1. IMPORTANT! Ask the user to provide a tree of used design tokens (the user has to copy & paste via [Token Studio Tree Inspector](https://www.figma.com/community/plugin/1507929423982882409/tokens-studio-tree-inspector) plugin). Those tokens directly map to available CSS variables (e.g. `kds.spacing.container.0_25x` = `--kds-spacing-container-0-25x`).
2. Run get_code first to fetch the structured representation for the exact node(s).
3. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_code.
4. Run get_screenshot for a visual reference of the node variant being implemented.
5. Get the exact name of the component from Figma (starting with `kds-`) and name it accordingly. Don't guess the name.
6. Only after you have all three (get_code, get_screenshot and the user-provided tokens), download any assets needed and start implementation.
7. Translate the output (usually React + Tailwind) into this project's conventions, styles and framework. Reuse the project's color tokens, components, and typography wherever possible. Remove unnecessary wrappers and divs.
8. Match the component props to the Figma component properties as closely as possible.
9. Match the icon names precisely, all icons used in Figma are available in this codebase! Double-check in case you can't find the icon.
10. IMPORTANT! If an element has a border and padding, set the padding as follows as otherwise it doesn't match the Figma design: `padding: calc(
  var({{design-token}}) - var(--kds-core-border-width-xs)
);`
11. Add Storybook stories matching the guidelines of this project. All variants shown in Figma need to be added with their Figma link including the according node id.
12. Don't add a unit test yet.
13. Run lint and fix potential issues.
14. ONLY AFTER lint passing, run Storybook and open it with #openSimpleBrowser. Don't quit Storybook as the user wants to preview the component.
15. Ask the user to open the "Design Comparator" story so he can visually verify the implementation.
16. IMPORTANT! Tell the user, that if he's not yet happy, he can select the component element to send you a screenshot via the chat. If he does, visually validate the user-provided screenshot against the Figma screenshot you got via get_screenshot for 1:1 look. When doing changes, always stick to using the user-provided design tokens!
17. Ask the user if everything is fine so you can proceed writing unit tests.

### Implementation rules

- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design‑system tokens when applicable.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
