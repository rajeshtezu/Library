# Modify a specific commit

## Open the specific commit in interactive rebase mode.

```
  $git rebase --interactive '<commit_hash>^'
```

**Note** : Adding Caret (`^`) as suffix to the commit hash is required. To rebase back to the commit before the one you wish to modify.

- In the default editor, modify `pick` to `edit` in the line mentioning <commit_hash>
- Save the file and exit. Git will interpret and automatically execute the commands in the file
- Now, you will be in the previous situation in which you had created commit <commit_hash>
- Make the changes you wish

## Stage and amend all the changes

```
  $git commit --all --amend --no-edit
```

## Return back to the previous HEAD commit

```
  $git rebase --continue
```
