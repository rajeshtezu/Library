# GIT

- [GIT](#git)
  - [States of git files](#states-of-git-files)
    - [Flow of states](#flow-of-states)
  - [Global config on your machine:](#global-config-on-your-machine)
  - [Create git repository/Project:](#create-git-repositoryproject)
  - [Misc](#misc)
  - [Rename a file:](#rename-a-file)
  - [Commit directly to the repository:](#commit-directly-to-the-repository)
  - [Undo the changes](#undo-the-changes)
  - [Un-stage files](#un-stage-files)
  - [Getting old versions from the repository](#getting-old-versions-from-the-repository)
  - [Branches](#branches)
  - [.gitignore](#gitignore)
  - [GitHub](#github)

Git is most famous and widely used version control system.

## States of git files

- `Working area` : Here files are not handled by git. Files in this area are also referred to as "untracked files".
- `Staging area` : Files that are going to be part of next commit and lets git know what changes it is going to contain.
- `Repository` : Final stage where code is actually part of git repository.

  ### Flow of states

  - Working area -> Staging area -> Repository

## Global config on your machine:

- Configure your name and email

```
  $git config --global user.name "<YOUR NAME>"
  $git config --global user.email "<YOUR EMAIL>"
```

- Check your configuration

```
  $git config --list  --> it will show all the  settings
  $git config user.email  --> To show specific settings. here user email
```

## Create git repository/Project:

- **Step-1**: navigate to the directory you want to make git repository and type

```
  $git init
```

- **Step-2**: Add the changes in the directory/all_files, i.e. adding into the staging area

```
  $git add .              // Add all files
  $git add "file name"    // Add particular file in staging area
```

**Note:** Staging area is where files are ready to commit, commit is pushing files into repository

- **Step-3**: Commit the changes. Messages are used to keep track of changes, we can goto any commit using commit message or hash

```
$git commit -m "some message"
```

## Misc

- Display our commit history

```
  $git log
```

- Show commit history of only specified user/team_member, Note: no need to provide full name of author

```
$git log --author="<name of author>"
```

- Display information about files which has not been committed yet.

```
  $git status
```

**Note :** After editing files, add the files in staging area and then commit

- Display difference between working copy and repository file

```
$git diff
```

- Display difference between staging area and repository file

```
$git diff --staged
```

- Delete file in repository as well as working copy. Don't forget to commit after removing file.

```
$git rm "fileName"
```

## Rename a file:

- **Method-1**
  Rename the file from directory directly then do the following
  (Just after renaming file if we check status it will show file deleted)

```
  $git add <new name>
  $git rm <old name>
```

After executing above commands if we check status it will show file renamed

```
  $git status
```

- **Method-2** RECOMMENDED

```
  $git mv "<old name>" "<new name>"
```

Note: Don't forget to commit.

## Commit directly to the repository:

- Use this only when you want to commit all the files.
- Applicable only when files are edited, not added new files or deleted any files

```
  $git commit -am "<commit message>"
```

## Undo the changes

- Undo the changes in working directory or
- Take out file from repository to working directory

```
  $git checkout -- "<filename>"
```

## Un-stage files

- Bringing files from staging area to working area

```
  $git reset HEAD "<fileName>"
```

## Getting old versions from the repository

```
  $git checkout "<commit id's few chars>" -- "<fileName>"
```

**Note :** Commit id could be found by checking `git log`

## Branches

- Create a branch locally

```
  $git checkout -b <branch_name>
```

- Switch branch

```
  $git checkout <branch_name>
```

## .gitignore

- If we want to exclude some files to be added to our repository the we create this file and write unwanted file names.
- It supports glob pattern

  e.g.

  ```
    file name: .gitignore
    ---------------------
    .idea
    admin/settings.html
  ```

---

## GitHub

- Create a repository on your github account.
- It will then show `Quick setup` page with git url of the created project repository.

- Now do the following in your git shell

  - Create remote connection with github repository

    ```
      $git remote add <git_url_nick_name> "<github repo url>"

      e.g: $git remote add githubRepo https://github.com/rajeshtezu90/Example1.git
    ```

  - Show git_url_nick_name

    ```
      $git remote
    ```

  - Upload your local repository on github repository (in master branch)
    ```
      $git push -u <git_url_nick_name> master
    ```

**Note :** whenever we make any changes or add another file in our local repository we just commit and push on github
