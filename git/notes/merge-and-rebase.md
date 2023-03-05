# Merge and Rebase

While working in a team or contributing to an open source code it's a common practice to create a separate branch to work on a particular feature/task.

While you are working on one feature, there will be many other people who will also be contributing the same way by creating their own branch.

Now everybody pushes their changes to remote repository and in order to combine codes from different branches we have two ways - **Merge** and **Rebase**

- **Key difference** : When we merge one branch into another we create a new commit while in rebase no new commit gets added

## Getting ready for merge or rebase

- Checkout and get latest code of the two branches say branch-1 and branch-2

  ```
    $git checkout branch-1
    $git pull origin[upstream] branch-1
    $git checkout branch-2
    $git pull origin[upstream] branch-2
  ```

## Merge

- Merging `branch-1` into `branch-2`
  ```
    $git checkout branch-2
    $git merge branch-1
  ```

## Rebase

- Rebasing `branch-1` into `branch-2`
  ```
    $git checkout branch-2
    $git rebase brach-1
  ```

## Resolving conflicts

- While we merge/rebase branches there are chances that both the branches have changes on same lines of same files, as a result git will not be sure which one to keep and which one to remove.
- Now you get the code in two different forms - 1. In stage with codes combined, 2. Files with conflicts
- Here for conflicts, we have to manually resolve them by selecting and keeping code from one among the two branches

- In case of `merge` :

  1. After resolving conflicts we add those files to staging area
  2. Commit the changes
     ```
      $git commit -m "resolve conflicts"
     ```
  3. Push to origin

- In case of `rebase`:

  1. Once we are in conflict, git will be on the commit where the conflict occurred
  2. After resolving conflicts we continue with the rebase
     ```
      $git rebase --continue
     ```
  3. If we again get conflict on next commit, we again have to repeat `step-2`
  4. Force push the changes to origin

**Note** :

- In case of `merge` git does the merging by taking all the changes (all the commits diffs) from both the branches at once.
- In case of `rebase` git goes commit by commit and combine the code so, no new commit is required at the end.
