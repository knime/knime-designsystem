---
applyTo: "**/.vscode/mcp.json"
---

# Figma MCP Server Setup

Use this skill when the user wants to connect to Figma or you need Figma MCP tools but they're not available.

## Quick check

Search for `mcp_figma` tools. If `mcp_figma_get_figma_data` and `mcp_figma_download_figma_images` are found, the server is running — skip setup and use the **figma-mcp** skill instead.

## Setup steps

1. **Get the token.** Ask the user for their Figma personal access token (starts with `figd_`).

   - Required scope: **`files:read`** (fetches file nodes and exports images).
   - Tokens without this scope get `403 Forbidden`.
   - Generate at https://www.figma.com/developers/api#access-tokens — check "File content" → **Read**.

2. **Create `.vscode/mcp.json`** (if it doesn't exist):

   ```json
   {
     "servers": {
       "figma": {
         "type": "stdio",
         "command": "npx",
         "args": [
           "-y",
           "figma-developer-mcp",
           "--stdio",
           "--figma-api-key=<TOKEN>"
         ]
       }
     }
   }
   ```

   **Critical:** The `--stdio` flag is required. Without it the server starts in HTTP mode and VS Code's stdio MCP transport cannot communicate with it.

3. **Add to `.gitignore`.** The file contains a secret — never commit API keys.

4. **Tell the user to reload VS Code** (Ctrl+Shift+P → "Developer: Reload Window").

5. **Verify** after reload by searching for `mcp_figma` tools.

## Troubleshooting

| Symptom                                                              | Cause                          | Fix                                           |
| -------------------------------------------------------------------- | ------------------------------ | --------------------------------------------- |
| `403 Forbidden` on API calls                                         | Token lacks `files:read` scope | Generate a new token with the correct scope   |
| "Waiting for server to respond to initialize request…" loops forever | Missing `--stdio` flag         | Add `--stdio` to the args array               |
| Tools not found after reload                                         | MCP server not started         | Check `.vscode/mcp.json` syntax, reload again |
