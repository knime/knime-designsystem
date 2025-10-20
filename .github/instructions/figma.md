---
applyTo: "**/*.vue"
---

# Figma MCP Integration Rules

These rules define how to translate Figma inputs into code and must be followed for every Figma-driven change.

## Required flow (do not skip)

1. IMPORTANT! Ask the user to provide a tree of used design tokens (the user has to copy & paste via [Token Studio Tree Inspector](https://www.figma.com/community/plugin/1507929423982882409/tokens-studio-tree-inspector) plugin).
2. Run get_code first to fetch the structured representation for the exact node(s).
3. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_code.
4. Run get_screenshot for a visual reference of the node variant being implemented.
5. Get the exact name of the component from Figma (starting with `kds-`) and name it accordingly. Don't guess the name.
6. Only after you have all three, get_code, get_screenshot and the user-provided tokens, download any assets needed and start implementation.
7. Translate the output (usually React + Tailwind) into this project's conventions, styles and framework. Reuse the project's color tokens, components, and typography wherever possible. Remove unnecessary wrappers and divs.
8. Match the component props to the Figma component properties as closely as possible.
9. Match the icon names precisely, all icons used in Figma are available in this codebase! Double-check in case you can't find the icon.
10. In the Storybook story, add a DesignComparator story as shown in the [example implementation](../copilot-instructions.md#example-implementations) (using `buildDesignComparatorStory`). All variants shown in Figma need to be added with their Figma link including the according node id.
11. Run Storybook, then #openSimpleBrowser `http://localhost:6006/`. IMPORTANT! Ask the user to select the component element. Then visually validate the user-provided screenshot against the screenshot you got via get_screenshot for 1:1 look and behavior before marking complete.

### Implementation rules

- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design‑system tokens when applicable.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
