# Squash Commits

Squashing commits means combining multiple commits into a single commit.

Below are the steps to perform squash.

**step-1**: Open in interactive rebase mode

```
git rebase -i HEAD~<number_of_last_commits>
```

or

```
git rebase -i HEAD~<commit_hash>
```

**step-2**: Change `pick` to `squash` or `s` for all the commits you want to combine

> **Note**: If you have commit history like below
>
> `pick commit-1`
>
> `pick commit-2`
>
> `pick commit-3`
>
> `pick commit-4`
>
> `pick commit-5`
>
> and you change `pick` to `squash` for `commit-3` and `commit-4` then it will squash into `commit-2`

**step-3**: Save and exit the edit

**step-4**: Now it will open the text editor to change the commit history messages. Change them, save and exit.

**step-5**: Force push the changes to origin/upstream
