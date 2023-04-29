# Routing

It will be configured in the Application's Module.

## Steps to configure routing

**Step-1**: Create a `Routes` array with objects containing path & component properties.

- Path should not be prepended with `/`.

```ts
const appRoutes = [{ path: '', component: HomeComponent }];
```

**Step-2**: Register the `Routes` in the Module in the import section.

```ts
imports: [
  ...
  RouterModule.forRoot(appRoutes)
],
exports: [RouterModule]
```

**Step-3**: Provide the `<router-outlet></router-outlet>` inside the common layout component's html template where all the route components will be rendered.

**Step-4**: Add links for the route where needed.

```html
<a routerLink="/home"> Home </a>
```

> Note:
>
> - If we emit the `/` from `"/home"` it will be treated as a relative path. ie, will append the path to existing URL.
> - Path could be used like `"../../<path>"`, it will go back in the URL path and add `<path>`

## Navigating Programmatically

**With absolute path**

```ts
@Component({...})
export class MyComponent {
  constructor(private router: Router) {}

  onLoadServer() {
    ...

    this.router.navigate(['/servers']);
  }
}
```

**With relative path**

```ts
constructor(..., private route: ActivatedRoute) {}
this.router.navigate(['servers'], { relativeTo: this.route });
```

**Dynamic Route Path**

```ts
{ path: 'users/:id', ... }
```

Here `:id` is dynamic variable

**Accessing the `id` in the path**

```ts
constructor(private route: ActivateRoute){}

getId() {
  const id = this.route.snapshot.params['id'];
}
```

- Providing in html template

```html
<!-- /users/10/Anna -->
<a [routerLink]="['/users', 10, 'Anna']"> Anna </a>
```

- Adding a subscriber to update value based on url route change

```ts
this.route.params.subscribe((params) => {
  this.user.id = params['id'];
  this.user.name = params['name'];
});
```

> Note: Angular handles unsubscribing to this route params if component gets destroyed.

**Query Parameter**

- In html template

```html
<a
  [routerLink]="['/servers', 5, 'edit']"
  [queryParams]="{ allowEdit: '1' }"
  fragment="loading"
>
</a>
```

`queryParams` and `fragment` are properties of routerLink directive.

- In component controller

```ts
this.route.navigate(['/servers', id, 'edit'], {
  queryParams: { allowEdit: '1' },
});
```

## Child Route

- Allows to nest routes
- Not just visual grouping but also affects component rendering
- Child routes need a separate `<router-outlet></router-outlet>` and should be nested inside the parent component

Eg

```ts
{
  path: 'servers', component: ServerComponent,
  children: {
    { path: ':id', component: ViewServerComponent },
    { path: , component: EditServerComponent }
  }
}
```

- Preserving/Merging existing query params

```ts
this.router.navigate(['edit'], {
  relativeTo: this.route,
  queryParamsHandling: 'preserve', // other option: 'merge'
});
```

## 404 Handling

```ts
[
  ...{ path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
```

> Note: This should be the last path in the routes array

---

## Route Guards

Allowing access to certain components only for a set of authenticated users.

### canActivate

**Step-1**: Create an AuthGuard (Name could be anything) service

```ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticated) => {
      if (authenticated) return true;

      this.router.navigate(['/login']);
    });
  }
}
```

**Step-2**: Bind the service to the Module

**Step-3**: Add the `AuthGuard` service to Router paths

```ts
[
  { path: 'servers',
    canActivate: [AuthGuard, ...],
    component: ServerComponent,
    children: [ ... ]
  }
]
```

Auth guard will be applied to all the children as well.

> Note: `canActivateChild` could be used in similar fashion to protect only the children routes.

### canDeactivate

Check docs for more info

**Step-1**: Define canDeactivate service
**Step-2**: Bind the service to the module
**Step-3**: Attach the service with the route path
**Step-4**: Implement in the component it is going to be used

## Outsourcing the Route configuration

**Step-1**: Create a separate Module for routes

```ts
const appRoutes: Routes = [ ... ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

**Step-2**: Bind the `AppRoutingModule` to main Module

```ts
@NgModule({
  imports: [
    AppRoutingModule,

    ...
  ],

  ...
})
export class AppModule {
  ...
}
```

> Note: Route `Resolve` could be used if we want to fetch some data or run some code before loading the component.
