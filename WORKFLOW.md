# Structured Context-Based Workflow

This workflow leverages available MCP servers (sequentialthinking, context7, brave-search) to handle tasks methodically: Research → Plan → Execute → Reflect. It minimizes errors, hallucinations, and lost context by enforcing step-by-step tool use and explicit sourcing. **Strict rule: Never use browser_action—rely on MCP tools and commands.**

## Workflow Phases

### 1. Research Phase
Gather accurate, up-to-date information before planning. Use tools selectively: Prefer context7 for library/docs (precise, hallucination-free); use brave-search only for general web queries/news when no better source exists.
- **General queries/news/events (use sparingly)**: Use `brave_web_search` (or `brave_local_search` for location-based).
  - Example: `<use_mcp_tool><server_name>brave-search</server_name><tool_name>brave_web_search</tool_name><arguments>{"query": "latest AI workflow best practices"}</arguments></use_mcp_tool>`
- **Library/package documentation**: Use context7 (highly recommended for technical accuracy).
  - First, resolve ID: `<use_mcp_tool><server_name>context7</server_name><tool_name>resolve-library-id</tool_name><arguments>{"libraryName": "react"}</arguments></use_mcp_tool>`
  - Then fetch docs: `<use_mcp_tool><server_name>context7</server_name><tool_name>get-library-docs</tool_name><arguments>{"context7CompatibleLibraryID": "/facebook/react"}</arguments></use_mcp_tool>`
- Always cite sources explicitly (e.g., "From context7 docs for React v18").

If info is in context window or environment_details, use directly—no tool needed.

### 2. Plan Phase
Break down the task into steps using structured thinking.
- Use `sequentialthinking` MCP tool for chain-of-thought reasoning.
  - Start with initial thoughts: `<use_mcp_tool><server_name>sequentialthinking</server_name><tool_name>sequentialthinking</tool_name><arguments>{"thought": "Initial analysis of task...", "nextThoughtNeeded": true, "thoughtNumber": 1, "totalThoughts": 5}</arguments></use_mcp_tool>`
  - Iterate: Build/revise thoughts until `nextThoughtNeeded: false`, generating a hypothesis/solution.
  - Adjust `totalThoughts` as needed; use revisions/branches for complex issues.
- Create/update todo list: Use `update_todo_list` for tracking.
  - Example: Mark steps as [ ] pending, [-] in_progress, [x] completed.
- Output: Clear plan with todo items, presented for user approval.

### 3. Execute Phase
Implement step-by-step, one tool per message, waiting for confirmation.
- Follow plan todos sequentially.
- Use workspace tools (read_file, apply_diff, execute_command, etc.) as needed.
- For code tasks: Read files first, then edit surgically (prefer apply_diff over write_to_file).
- Update progress: Call `update_todo_list` after each completed step; use `byterover-update-plan-progress` if Byterover connects later (ignore for now).
- If blocked, reflect and adjust plan.

### 4. Reflect Phase
Verify and assess completeness.
- Use `sequentialthinking` again: Hypothesis verification, error checking.
- Assess context: If gaps, loop back to Research.
- Finalize: Use `attempt_completion` only after full verification.

## Guidelines
- **One tool per message**: Wait for user response (success/failure, outputs) before next.
- **Sourcing**: Prefix insights with "From sequentialthinking step X", "Per context7 docs", "Via brave-search results".
- **Error Reduction**: Always confirm assumptions with tools; no assumptions on unverified info.
- **When to Use**: For any complex task (e.g., feature implementation, debugging, research). Start here for new sessions.
- **Integration**: In responses, use `<thinking>` for internal analysis before tool calls. Reference this file for consistency.

This workflow is now active for the workspace. For task-specific plans, initiate with Research/Plan phases.