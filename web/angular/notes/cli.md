# CLI

Command-line interface tool to initialize, develop, scaffold, and maintain Angular applications from command shell.

**Official Documentation** - https://angular.io/cli

## ng new

Create a new Angular project/workspace.

> [Official Doc Link](https://angular.io/cli/new)

```
ng new [project-name]
```

Eg:

```
ng new my-first-project
```

## ng add

Adds support for an external library to the project.

> [Official Doc Link](https://angular.io/cli/add)

```
ng add <collection>
```

Eg:

```
ng add @angular/pwa
ng add @ngrx/store
```

## ng build

Compiles an Angular application or library into an output directory named dist/ at the given output path.

> [Official Doc Link](https://angular.io/cli/build)

```
ng build [project]

ng b [project]
```

## ng serve

Builds and serves your application, rebuilding on file changes.

> [Official Doc Link](https://angular.io/cli/serve)

```
ng serve [project]

ng s [project]
```

## ng generate

- Create component

```
$ng generate[g] component[c] <path/name>
```

- Create component without test files

```
$ng g c <path/name> --spec false
```

- Create a module

```
$ng g module[m] <path/name>
```

- Create a service

```
$ng g service[s] <path/name>
```
