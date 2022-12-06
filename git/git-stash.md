# Git Stash

Dictionary meaning of stash is to "store (something) safely in a hidden or secret place."

It could be helpful when you are working on multiple tasks at the same time or need to switch branch leaving your work in progress.

## Stash your changes

- Below command will take all the changes and save in stash
- The stashed change will be associated with an stash ID something like `stash@{0}` where `0` represents the index of stash list.

```
  $git stash
```

## Stash your changes with a description

```
  $git stash save "<description>"
```

## List your stashes

```
  $git stash list
```

## Pop a stash

- Below command will pop out the latest stash and bring in the working directory

```
  $git stash pop
```

## Apply a specific stash

- We can also pick a specific stash and bring in the working directory

```
  $git stash apply <stash_id>
```

Eg:

```
  $git stash apply stash@{2}
```

## Show stash diff

```
  $git stash show <stash_id>
```

## Create a branch with a stash

- Create a branch with latest stash (like stash pop)

```
  $git stash branch <branchname>
```

- Create a branch with specific stash

```
  $git stash branch <branchname> <stash_id>
```

**Note**: This could be helpful when we run into a conflict after applying the stash to the latest version of a branch.

## Delete a particular stash from the list

```
  $git stash drop <stash_id>
```

## Clear the whole stash list

- When you no longer need the stashed changes, you can delete them all

```
  $git stash clear
```

---

Check `$git help stash` for more info.
