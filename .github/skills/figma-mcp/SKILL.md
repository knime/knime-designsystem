---
applyTo: "**/*.vue,**/*.ts,**/*.css"
---

# Figma MCP — Implementing Designs from Figma

Use this skill when the user provides a Figma link or asks you to implement a design from Figma.

## Prerequisites — MCP server setup

This workflow requires the Figma MCP server providing `get_code`, `get_screenshot`, and `get_metadata` tools.

If the tools are not available, tell the user:

> Figma MCP tools are not available. Add the Figma MCP server to your VS Code MCP settings:
>
> In `.vscode/mcp.json` (or your user settings), add:
> ```json
> {
>   "servers": {
>     "figma": {
>       "type": "stdio",
>       "command": "npx",
>       "args": ["-y", "figma-developer-mcp", "--figma-api-key=<YOUR_KEY>"]
>     }
>   }
> }
> ```
> Then reload VS Code and try again.

## Extracting Figma node from URLs

Figma URLs contain a file key and node ID. Examples:

- `https://www.figma.com/design/ABC123/File-Name?node-id=12-34` → file `ABC123`, node `12-34`
- `https://www.figma.com/file/ABC123/File-Name?node-id=12%3A34` → file `ABC123`, node `12:34` (URL-encoded)

When calling MCP tools, pass the full Figma URL or the file key + node ID as required by the tool.

## Design token mapping

Tokens from the Token Studio Tree Inspector map directly to CSS variables:
- `kds.spacing.container.0_25x` → `--kds-spacing-container-0-25x`
- `kds.color.background.primary` → `--kds-color-background-primary`
- Dots become dashes, underscores in numbers become dashes

## Required flow (do not skip)

1. **Ask for design tokens.** Ask the user to provide a tree of used design tokens (copy & paste via [Token Studio Tree Inspector](https://www.figma.com/community/plugin/1507929423982882409/tokens-studio-tree-inspector) plugin). Those tokens directly map to available CSS variables (e.g. `kds.spacing.container.0_25x` = `--kds-spacing-container-0-25x`).
2. **Fetch structured code.** Run `get_code` for the exact node(s).
3. If the response is too large or truncated, run `get_metadata` to get the high-level node map and then re-fetch only the required node(s) with `get_code`.
4. **Fetch visual reference.** Run `get_screenshot` for the node variant being implemented.
5. **Identify components.** Get the exact name of the components from Figma. Don't guess component names.
   - If the name starts with `Kds`, it's a design system component — check if it's available in `@knime/kds-components` using the **kds-component-discovery** skill.
   - If the `Kds` component is not available yet, follow [Implementation of missing KDS components](#implementation-of-missing-kds-components).
   - If the name doesn't start with `Kds`, implement locally in the project.
6. **Implement.** Only after you have all three (code structure, screenshot, and user-provided tokens), download any assets needed and start implementation.
7. **Translate.** Convert the output (usually React + Tailwind) into the project's conventions, styles, and framework. Reuse the project's color tokens, components, and typography wherever possible. Remove unnecessary wrappers and divs.
8. **Match props.** Match the component props to the Figma component properties as closely as possible.
9. **Match icons precisely.** All icons used in Figma are available in this codebase. Double-check in case you can't find the icon.
10. **Border + padding adjustment.** If an element has a border and padding, set the padding as follows to match the Figma design: `padding: calc(var({{design-token}}) - var(--kds-core-border-width-xs));`

### Implementation rules

- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design-system tokens when applicable.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design-system tokens and adjust spacing or sizes minimally to match visuals.

## Implementation of missing `Kds*` components

Follow the [required flow](#required-flow-do-not-skip) and additionally:

1. Implement the component in `knime-designsystem/packages/components`.
2. Add Storybook stories matching the guidelines of this project. All variants shown in Figma need to be added with their Figma link including the node id.
3. Don't add a unit test yet.
4. Run lint and fix potential issues.
5. ONLY AFTER lint passing, run Storybook and open it with `#openSimpleBrowser`. Don't quit Storybook as the user wants to preview the component.
6. Ask the user to open the "Design Comparator" story so they can visually verify the implementation.
7. Tell the user that if they're not yet happy, they can select the component element to send a screenshot via the chat. If they do, visually validate the user-provided screenshot against the Figma screenshot you got via `get_screenshot` for 1:1 look. When doing changes, always stick to using the user-provided design tokens!
8. Ask the user if everything is fine so you can proceed writing unit tests.

