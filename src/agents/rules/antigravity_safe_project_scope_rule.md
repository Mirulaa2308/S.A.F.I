---
name: safe-project-scope
description: Protects user files and project boundaries. Only modify files required for the requested task inside the authorized project. Never perform broad or destructive filesystem operations without explicit permission.
---

# Safe Project Scope & File Protection

## Core Rule
Protect the user's files at all times.

Only modify files that are:
1. Required for the current task.
2. Inside the explicitly authorized project/workspace.

Never treat the entire computer, home folder, or drive as part of the task.

## 1. Project Boundary
Before making changes:
- Identify the current project/workspace root.
- Work only inside that project unless the user explicitly authorizes another path.
- Do not access, modify, delete, move, rename, or create files outside the authorized scope.
- Do not touch another project, drive, Desktop, Documents, Downloads, or unrelated workspace.
- If the project root is unclear, stop and ask before modifying files.

## 2. Minimal Changes
Change only files genuinely required for the task.

If asked to fix `components/Navbar.tsx`, do not modify unrelated files unless they are necessary for the fix.

Before changing an additional file, determine and state why it is required.

## 3. Destructive Operations
Never delete, move, rename, or replace files/folders unless:
- the operation is required by the task, and
- the user explicitly authorized that destructive operation.

Before a destructive action, state:
- What will change
- Why it is necessary
- What may be lost or affected

## 4. No Drive-Wide Operations
Never:
- delete folders from a drive
- clean directories
- mass rename or move files
- recursively delete unrelated files
- delete "unused" or duplicate-looking files automatically
- modify unrelated projects
- change global system configuration

Never use a project task as a reason to clean up unrelated files.

## 5. Preserve Existing Work
- Do not rewrite an entire file when a focused edit is sufficient.
- Do not replace working architecture for a small feature.
- Inspect existing files before overwriting them.
- Preserve existing functionality, project structure, configurations, databases, and user-created files.

## 6. New Files
Create a new file/folder only when necessary.
First check whether an existing file can safely be extended.
Avoid duplicate components, unused utilities, unnecessary configuration, and unnecessary documentation.

## 7. Commands and Scripts
Before running filesystem-changing commands:
1. Understand exactly which paths they can affect.
2. Confirm those paths are inside the authorized project.
3. Prefer narrow, targeted commands.
4. Avoid broad recursive or wildcard operations when a specific path works.

Do not run unknown scripts that may delete or modify files broadly.

## 8. Git Safety
Do not automatically run destructive Git commands such as:
- `git reset --hard`
- `git clean -fd`
- `git checkout -- .`

Use destructive Git operations only when explicitly requested and authorized.

## 9. Unrelated Problems
If you discover an unrelated issue, report it but do not fix it automatically.

Example:
"I found an unrelated issue in X.tsx. I have not changed it because it is outside the requested scope."

## 10. Large Changes
For a task affecting many files:
- Identify the affected files/categories first.
- Explain why they are needed.
- Keep the implementation focused.
- Do not silently expand the task.
- Verify the final changed-file scope.

## 11. Verification
After implementation:
- Check which files were modified.
- Confirm unrelated files were not changed.
- Run relevant tests/build/type checks when appropriate.
- Report unexpected modifications immediately.

Final response should include:
### Changed
What was modified and why.

### Not Changed
Important unrelated areas intentionally left untouched.

### Verification
What was checked.

### Concerns
Any remaining risk or unexpected change.

## 12. Uncertainty Rule
If you are unsure whether an operation could affect files outside the project:

**Do not execute it. Ask for clarification or use a narrower operation.**

# Absolute Rule
> Never delete, move, rename, overwrite, or modify anything outside the explicitly authorized project and requested task scope.

> When in doubt, preserve the file and ask before making the change.

A successful task must work **and** leave unrelated user files untouched.
