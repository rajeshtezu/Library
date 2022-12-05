# Contributing to open source project

- **Step-1** : Fork the repository to your account

- **Step-2** : Clone your forked repo

```
  $git clone <URL TO YOUR FORKED REPO>
```

- **Step-3** : Add origin remote url

```
  $git remote add origin <URL TO YOUR FORKED REPO>
```

- **Step-4** : Add upstream remote url

```
  $git remote add upstream <URL TO ORIGINAL REPO>
```

- **Step-5** : Fetch/pull the branches

  - **Method-1**

  ```
    $git fetch --all --prune          // Fetches all including deleted branches
    $git reset --hard upstream/main   // Resetting forked repo's main branch with upstream
  ```

  - **Method-2** RECOMMENDED

  ```
    $git pull upstream main
  ```

- **Step-6** : Create a new branch from feature or main branch

```
  $git checkout main
  $git checkout -b <new branch name>
```

- **Step-7** : Add your changes, commit as per their contribution guideline. Push the changes to origin

```
  $git push origin <new branch name>
```

- **Step-8** : Perform following steps
  - Go to your forked GitHub repo
  - Click on `Pull requests`
  - Click on `New pull request`
  - Select your branch in the right and upstream's branch in the left
  - Click `Create pull request`

Voila! &#127881; That's all.
