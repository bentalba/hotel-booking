- [x] Verify that the copilot-instructions.md file in the .github directory is created. (Created file and confirmed presence on Dec 9, 2025.)

- [x] Clarify Project Requirements (User requested Next.js 15 + Tailwind + Prisma + Shadcn UI hotel booking stack; no additional clarification needed.)

- [x] Scaffold the Project (Ran create-next-app with TS+Tailwind+App Router using local Node binary.)

- [x] Customize the Project

- [x] Install Required Extensions (No additional VS Code extensions requested.)

- [x] Compile the Project (Ran `npm run lint` and `npm run test` with Node 22.12 toolchain.)

- [x] Create and Run Task (Not required; standard npm scripts cover dev/build.)

- [x] Launch the Project (Dev server running at http://localhost:3000)

 - [x] Ensure Documentation is Complete (README and instructions verified; HTML comments removed.)

## Execution Guidelines

**Progress Tracking**
- Use the available todo list tool to reflect this checklist when possible.
- After completing each step, mark it complete and add a short summary.
- Review the current todo status before starting the next task.

**Communication Rules**
- Avoid verbose explanations or dumping full command output.
- If a step is skipped, note it briefly (e.g., “No extensions needed”).
- Don’t explain the full project structure unless asked.
- Keep responses concise and focused on the task.

**Development Rules**
- Use `.` as the working directory unless the user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Clearly mark placeholders so they can be replaced later.
- Use the VS Code API tool only for VS Code extension projects.
- Assume the project is already open in VS Code; don’t suggest reopening unless required.
- Follow any additional project setup rules you discover in the repo.

**Folder Creation Rules**
- Treat the current directory as the project root.
- When running terminal commands, prefer `.` arguments to stay rooted in the workspace.
- Don’t create new folders unless explicitly requested, except for `.vscode` when adding tasks.
- If scaffolding commands complain about folder naming, ask the user to recreate/reopen with the correct folder name.

**Extension Installation Rules**
- Install only the extensions specified by the setup tools; skip otherwise.

**Project Content Rules**
- If details aren’t specified, default to a “Hello World” starting point.
- Don’t add links or integrations that weren’t requested.
- Avoid generating media assets unless explicitly needed; mark placeholders clearly.
- Ensure each new component serves a clear user-requested purpose.
- Ask for clarification if you’re unsure a feature is required.
- For VS Code extensions, research relevant APIs before implementing.

**Task Completion Rules**
- Consider the task complete only when:
	- The project scaffolding and compilation succeed without errors.
	- `.github/copilot-instructions.md` exists and reflects the current project.
	- `README.md` exists and is up to date.
	- The user has launch/debug instructions.

- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
