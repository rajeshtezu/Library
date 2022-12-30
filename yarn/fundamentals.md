# Yarn

> Docs CLI URL - https://yarnpkg.com/cli

- `Dependency manager`: Manages project dependency
- `Package manager`: Installing and managing

- Yarn is both `dependency` and `package` manager

## Commands

- Create a package.json file [Setting up the project]

  ```
  $yarn init
  ```

- Add/Install packages

  ```
  $yarn add <package>
  $yarn add --dev/-D <package>
  $yarn add --peer/-P <package>
  $yarn add --optional/-O <package>
  ```

- Remove a package

  ```
  $yarn remove <package>
  ```

- Install all the dependencies in `package.json` file

  ```
  $yarn install
  ```

- To install `normal` dependencies in `package.json` file
  ```
  $yarn install --production
  ```

## Semantic versioning

- Version : `major.minor.patch`

  | Version                            | Meaning                                                                                       |
  | ---------------------------------- | --------------------------------------------------------------------------------------------- |
  | ^3.2.1                             | Can Upgrade minor version                                                                     |
  | ~3.2.1                             | Can Upgrade patch version                                                                     |
  | >3.2.1                             | Can Upgrade to any version including major version                                            |
  | =>3.2.1                            | Upgrade equal or above                                                                        |
  | <3.2.1                             | Get older version than this                                                                   |
  | <=3.2.1                            | Get equal or older version than this                                                          |
  | `3.2.1` or `=3.2.1`                | Don't upgrade any version                                                                     |
  | `major.*.patch` or `major.x.patch` | Get latest minor version. [Based on position of wildcard take latest of that part of version] |
  | `3.2.1 - 3.2.5`                    | Install any version between mentioned range                                                   |

## Lock File and Dependency Versions

- Lock file (`yarn.lock`) contains exact version with hash of installed dependency to save project from breaking. Only manual upgrade will upgrade the dependency.

- Get the registry pointed to

  ```
  $yarn config get registry
  ```

- Upgrade to latest allowed version in the package.json file and update the yarn.lock file

  ```
  $yarn upgrade <package>
  ```

- List outdated packages and also shows available latest range

  ```
  $yarn outdated
  ```

- Tells why it's installed, size and dependency info

  ```
  $yarn why <package>
  ```

- Displays info from package.json file of the package
  ```
  $yarn info <package> [<key>]
  ```

## Yarn config

- Config file : `.yarnrc`

- Show config list

  ```
  $yarn config list
  ```

- Set config

  ```
  $yarn config set <key> <value>
  ```

## Scripts

- `scripts` object inside the `package.json` file
  e.g.
  ```
    scripts: {
      "start": "<command>",
      "build": "<command>",
      ...
    }
  ```

## Autoclean

- Yarn frees up space by removing unnecessary files and folders from dependencies.
- Uses `.yarnclean` file and remove all the files and folders mentioned inside.

- Create `.yarnclean` file. Clean will be performed on Add, Install and force mentioned below.

  ```
  $yarn autoclean -I/--init
  ```

- Forced/Manual cleaning. Use this with caution
  ```
  $yarn autoclean -F/--force
  ```

## Global packages

```
$yarn global add[bin/list/remove/upgrade] <package>
```

## Yarn Cache

```
$yarn cache clean
```
