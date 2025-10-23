# ![Image](https://www.knime.com/sites/default/files/knime_logo_github_40x40_4layers.png) KNIME® Design System Monorepo

This monorepo contains the KNIME Design System, including design tokens, icons, Vue components derived from the design tokens, and its documentation.

This repository is maintained by [UI Core](mailto:team-ui-core@knime.com).

## Prerequisites

To get started, you need to have [Proto](https://moonrepo.dev/proto) installed, which acts as a version manager for Node.js and pnpm.
Only once, after installed you need to run

```
proto install
```

## Setup

Before running any scripts, you need to install the dependencies. Run the following command in the root of the monorepo:

```
pnpm install
```

## Packages

The monorepo comprises the following packages:

- **@knime/kds-styles**: Contains the design tokens and icons used across the KNIME Design System.
- **@knime/kds-components**: Contains Vue components derived from the design tokens.
- **@knime/kds-documentation**: Contains a Storybook instance that functions as the documentation for the design system and the components.

## Important Scripts

Here are some of the most important scripts defined in the top-level [`package.json`](package.json):

- **Dev**: Starts the Storybook documentation in dev mode.

  ```
  pnpm dev
  ```

- **Format Code**: Formats the code using Prettier.

  ```
  pnpm format
  ```

- **Lint Code**: Lints the code using ESLint and Stylelint.

  ```
  pnpm lint
  ```

- **Security Check**: Checks used dependencies for known vulnerabilities.

  ```
  pnpm run audit
  ```

- **Build Design Tokens**: Builds the design tokens.

  ```
  pnpm build:tokens
  ```

## AI assistance

- copy [./documentation/.env.development](./documentation/.env.development) to `./documentation/.env.development.local` and set your [Figma Personal Access Token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) (needs `file_content:read` permission). This is needed to display Figma screenshots in Storybook in the "SimpleBrowser" integrated in VS Code.
- in VS Code, add the [Figma MCP server](https://github.com/mcp/figma/mcp-server-guide) - use the cloud-based server to not require the Figma desktop app
- then select a component or a design in Figma, copy the URL including the node id and prompt into Agent mode, e.g.: `implement component: {{FigmaUrl}}`

## Maintaining changelogs & publishing to npm

Every PR with changes that should be published must include changeset file(s) out of which the CHANGELOG file of each package will get generated. Use the following command to create such files:

```sh
pnpm run changeset
```

Merge those files with the PR to master.

### Publishing to npm

The [`release` GitHub Action](./.github/workflows/release.yml) will automatically create & update a "Version Packages" PR if it detects
changeset file(s) on master. Once a release should be published to npm, simply do merge this PR.

# Join the Community!

- [KNIME Forum](https://forum.knime.com/)
