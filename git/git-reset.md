# Git reset

## Un-stage changes

```
  $git reset
```

## Bring committed changes into staging area

```
  $git reset --soft HEAD~1
```

**Note** :

- `HEAD` points to the latest commit.
- Number following `~` is called index and it is number of commits from HEAD.
- Instead of using `HEAD~<index>` we can also use `commit hash` directly.

## Delete a commit.

- Changes will be permanently gone. Use with caution &#9888;

```
  $git reset --hard HEAD~1
```

OR

```
  $git reset --hard <commit_hash>
```

---

# Git restore

- Restore the working area. i.e. undo all the changes in the working area

```
  $git restore .
```

- Bring staged changes to working area. i.e. un-stage the changes just like `$git reset`

```
  $git restore --staged .
```
