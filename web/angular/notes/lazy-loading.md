# Lazy Loading

> Before reading further please make sure you have read through [Routings](routings.md)

Lazy loading is a concept used to load a piece of code only when it is required.

In Angular we use lazy loading to load a module in the browser only when we are visiting the pages using them.

## Configuration for main Module

**Eg**: app.router.module.ts

```ts
const routes: Routes = [
  {
    path: '/home',
    loadChildren: () =>
      import('./home/home.module') // NOTICE THIS LINE
        .then((module) => module.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), // NOTICE forRoot here
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
```

- Here `HomeModule` will be loaded only when the path `/home` is visited.
- Routes will be configured with `forRoot`
- Instead of using `component` property, we are using `loadChildren` with lazy loading syntax

## Configuration for Lazy Loaded Module

**Eg**: home.router.module.ts

```ts
@NgModule({
  imports: [
    RouterModule.forChild([
      // NOTICE forChild here
      { path: 'home', component: HomeComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class HomeRouter {}
```

- Routes will be configured with `forChild`
