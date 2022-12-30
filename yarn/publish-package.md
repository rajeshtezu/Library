# Publishing packages

**Step-1**: Initialize `package.json` file

```
$yarn init
```

**Step-2**: [Link](https://yarnpkg.com/cli/link) and test locally

```
$yarn link <destination>
```

**Step-3**: [Create a compressed gzip archive](https://yarnpkg.com/cli/pack) of package dependencies to be uploaded to npm registry

```
$yarn pack
```

- Pack with provided filename
  ```
  $yarn pack --out <folder>/<filename>
  ```

**Step-4**: [Publish](https://yarnpkg.com/cli/npm/publish)

```
$yarn npm publish
```

**Note** - Check docs for more info
