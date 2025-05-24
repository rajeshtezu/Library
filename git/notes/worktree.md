# GIT WorkTree

## What is `git worktree`?

Normally, your Git repo has one working directory (the place where your files live). But with `git worktree`, you can **have multiple working directories tied to the same repository**. This lets you check out different branches **at the same time**, without doing things like stashing or switching back and forth.

## Why would you use it?

Here are some practical use cases:

1. **Work on multiple branches simultaneously**
   e.g., hotfix in one branch and a new feature in another.
2. **Run tests or builds on a different branch** without messing with your current one.
3. **Make quick changes to an old version** without disturbing your current dev work.

## How to use `git worktree`?

Let’s say you have a repo in `~/projects/myapp`.

### Step 1: Go to your main repo

```bash
cd ~/projects/myapp
```

### Step 2: Add a new worktree

```bash
git worktree add ../myapp-hotfix hotfix-branch
```

Here:

- `../myapp-hotfix` → This is where the new working directory will be.
- `hotfix-branch` → This is the branch you want to check out.

> If the branch doesn’t exist yet:

```bash
git worktree add -b hotfix-branch ../myapp-hotfix origin/main
```

## What happens?

You now have:

- Original repo at `~/projects/myapp` (on `main`, maybe)
- Another repo-like folder at `~/projects/myapp-hotfix` (on `hotfix-branch`)

You can now work on **both branches independently**.

## Removing Worktree

Deleting a worktree manually doesn’t clean things up. Use:

```bash
git worktree remove ../myapp-hotfix
```

This:

- Deletes the working directory (`../myapp-hotfix`)
- Unlinks it from your Git repo

You can list all active worktrees with:

```bash
git worktree list
```

## How to “navigate” between worktrees

You don't use `git checkout` to switch between worktrees. Instead, you just:

**`cd` into the folder of the worktree you want to work on.**

Each worktree is like a separate clone of your repo, but sharing the same `.git` history behind the scenes.

## Example

Let’s say you did:

```bash
git worktree add ../myapp-hotfix hotfix-branch
git worktree add ../myapp-experiment experiment-branch
```

Now your folder structure looks like:

```
~/projects/
  ├── myapp/                # main repo (on main)
  ├── myapp-hotfix/         # worktree (on hotfix-branch)
  └── myapp-experiment/     # worktree (on experiment-branch)
```

To work on `hotfix-branch`, just:

```bash
cd ~/projects/myapp-hotfix
```

Want to go back to `main`?

```bash
cd ~/projects/myapp
```
