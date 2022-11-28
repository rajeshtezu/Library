# Changing the author of a commit

- Edit into interactive rebase mode. [Check this](modify-specific-commit.md)

- Amend the commit with new author name and email

```
  $git commit --amend --author="<Your name> <Your email>" --no-edit
```

- Run the following commands

```
  $git rebase --continue
  $git push origin <branch_name> --force
```
