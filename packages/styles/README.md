# ![Image](https://www.knime.com/sites/default/files/knime_logo_github_40x40_4layers.png) KNIME® Design Tokens

This package contains the design tokens used across the KNIME Design System. The design tokens are stored in a standard W3C JSON format and are transformed into CSS and JavaScript variables using Style Dictionary.

## Design Tokens Format

The design tokens are stored in a standard W3C JSON format. For more information, see the [W3C Design Tokens Format][w3c-format].

## Transformation Process

### Style Dictionary

[Style Dictionary][style-dictionary] is utilized to transform the token definitions into CSS and JavaScript variables. Style Dictionary allows for the definition and transformation of design tokens into various formats.

### Tokens Studio Plugin

Certain tokens employ special modifiers from Tokens Studio. To manage these modifiers, the [Tokens Studio Style Dictionary Plugin][tokens-studio-plugin] is used. This plugin provides a preprocessor and custom transforms to accurately calculate the values of the tokens.

### Calculation of Values

All token values are fully calculated, ensuring that no variable references remain in the result files. This guarantees that the output files contain only the final values.

### Light and Dark Mode

Two sets of files are generated for light and dark mode. Subsequently, the CSS files are merged to contain all variables only once. For variables that use different color values in light and dark mode, the `light-dark()` function is employed.

## Usage

_This section will be filled in later once the output and possible changes are clear._

## Important Scripts

Here are some of the most important scripts defined in the [`package.json`](package.json):

- **Build Design Tokens**: Builds the design tokens. The resulting files will be written in `dist/tokens/`
  ```
  pnpm build:tokens
  ```

# Join the Community!

- [KNIME Forum](https://forum.knime.com/)

[w3c-format]: https://tr.designtokens.org/format/
[style-dictionary]: https://amzn.github.io/style-dictionary/#/
[tokens-studio-plugin]: https://www.npmjs.com/package/@tokens-studio/sd-transforms
