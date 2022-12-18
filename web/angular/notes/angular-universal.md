# Angular Universal

- Allow you to render the app both on client and server
- Only 1st page will be SSR and the subsequent will be client rendered

**Step-1**:

```
$ng add @nguniversal/express-engine  --clientProject <project_name>
```

> Note: `<project_name>` could be found inside `angular.json` file's `projects` section.

**Step-2**: Make sure `ModuleMapLoaderModule` is imported in `app.server.module.ts` file and added in the Module's `imports`.

Note: `ModuleMapLoaderModule` allows lazy loading (Important to have lazy loaded routes work)

**Step-3**: Check which code could be run on the Browser and which on Server then add a check using `PlatformId` property and `isPlatformBrowser()` method.

```
constructor(..., @Inject(PLATFORM_ID) private platformId) {}

...

if(isPlatformBrowser(this.platformId)) {
  ...Run Browser related API...
}
```

> Note: In SSR the page is first rendered on server then sent to the browser so, the code inside it would be executed twice based on the lifecycle methods etc.

**Step-4**: Build the SSR

```
$npm run build:ssr
```

**Step-5**: Serve the SSR build

```
$npm run serve:ssr
```

---

We can also add SSR with `nest.js`

```
$ng add @nestjs/ng-universal
```

Rest of the steps are same as above

**NOTE: A NODE SERVER WILL BE NEEDED TO HOST SSR APP.**
