# Cherry Pick

Cherry picking is nothing but bringing in a commit change from a different branch.

We can pick single or multiple commits and for each commit there will be a commit (new hash) created in the current branch if not avoided explicitly.

**Before issuing the cherry pick command**

- Checkout to the branch from where you want to pick the commit.
- Check the commit log and copy the commit(s) hash/id which you want to pick.
- Checkout to the branch you want to bring in the change.

**Eg-1**: Picking a single commit

```
git cherry-pick <commit_hash>
```

**Eg-2**: Picking multiple commits

```
git cherry-pick <commit_hash-1> <commit_hash-2> ...
```

**Eg-3**: Picking a single commit without implicit commit to the current branch

```
git cherry-pick <commit_hash> -n
```

> Note: The flag `-n` specify to not commit the change, instead keep the change in the staging area.
