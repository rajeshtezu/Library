# Service Worker (PWA)

- Part of PWA (`Progressive Web App`)
- Allows to work offline
- Our main application (JS) runs on a `single thread` in the browser [`Main Thread`]
- Service Worker on the other hand runs on `additional thread`, decoupled from HTML page
  - Manages all pages of given scope
  - Can listen to all outgoing request and can cache the APIs response

## Integrating to Angular

**Step-1**: Add the 3rd party library available for angular.

```
$ng add @angular/pwa
```

**Step-2**: Build the app for prod

```
$ng build --prod
```

**Step-3**: Update the `ngsw-config.json` file if needed.

**Step-4**: Serve the prod build.

- Add URLs in `resources` section if want to prefetch and cache.
- Add data group to prefetch APIs data

> Check docs for cache config
>
> ```ts
> cacheConfig: {
>   "maxSize": 5,
>   "maxAge": "6h",
>   "timeout": "10s",
>   "strategy": "performance" // or "freshness",
>   ...
> }
> ```

---

For detailed content read through [PWA](../../pwa/README.md)
