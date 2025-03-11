# ![Image](https://www.knime.com/sites/default/files/knime_logo_github_40x40_4layers.png) KNIME® Design System Monorepo

This monorepo contains the basics of the KNIME Design System, including design tokens, icons, Vue components derived from the design tokens, and a Storybook instance for documentation.

This repository is maintained by [UI Core](mailto:team-ui-core@knime.com).

## Prerequisites

To get started, you need to have [Proto](https://moonrepo.dev/proto) installed, which acts as a version manager for Node.js and pnpm.
Once installed you need to run

```
proto install
```

once to pull the initial node and pnpm versions specified in the package.json.

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

# Join the Community!

- [KNIME Forum](https://forum.knime.com/)
