---
applyTo: "**/*.vue"
---

# Figma MCP Integration Rules

These rules define how to translate Figma inputs into code and must be followed for every Figma-driven change.

## Required flow (do not skip)

1. IMPORTANT! Ask the user to provide a tree of used design tokens (the user has to copy & paste via [Token Studio Tree Inspector](https://www.figma.com/community/plugin/1507929423982882409/tokens-studio-tree-inspector) plugin).
2. Run get_code first to fetch the structured representation for the exact node(s).
3. Get the exact name of the component from Figma (starting with `kds-`) and name it accordingly. Don't guess the name.
4. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_code.
5. Run get_screenshot for a visual reference of the node variant being implemented.
6. Only after you have both get_code and get_screenshot, download any assets needed and start implementation.
7. Translate the output (usually React + Tailwind) into this project's conventions, styles and framework. Reuse the project's color tokens, components, and typography wherever possible. Remove unnecessary wrappers and divs.
8. Match the component props to the Figma component properties as closely as possible. Also match the icon names precisely, all icons used in Figma are available in this codebase!
9. In the Storybook story, add a DesignComparator story as shown in the example implementation. All variants shown in Figma should be added.
10. Run Storybook, then #openSimpleBrowser `http://localhost:6006/`. IMPORTANT! Ask the user to select the component element. Then visually validate the user-provided screenshot against the screenshot you got via get_screenshot for 1:1 look and behavior before marking complete.

### Implementation rules

- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design‑system tokens when applicable.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
