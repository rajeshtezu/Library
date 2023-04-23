# Ngrx Development Tools

**Titles**

- [Ngrx Router Module](#ngrx-router-module)
- [Store Runtime Checks](#store-runtime-checks)
- [Meta Reducers](#meta-reducers)

---

## Ngrx Router Module

It's a dev tool, when integrated, helps to show page navigation/routing in action when we play the state transition happened so far in the Ngrx Store DevTools.

The debugger to play state transition is called Time-Traveling Debugger.

**Step-1**: Add in root module

```ts
// File: app.module.ts

...

imports: [
  ...,

  StoreRouterConnectingModule.forRoot({
    stakeKey: 'router',
    routerState: RouterState.Minimal
  }),
]
```

1. `stateKey`: The key/property on which all the routing info will be stored in the ngrx store.
2. `routerState`: Specify in what format the router state will be stored.

**Step-2**: Setup the reducer

```ts
// File: app/reducers/index.ts

import { routerReducer } from '@ngrx/router-store';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer, // "router" is the stateKey
};
```

## Store Runtime Checks

```ts
// File: app.module.ts

...

imports: [
  StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionSerializability: true,
      strictStateSerializability: true,
    }
  }),
]
```

- `strictStateImmutability`: It will make sure we don't mutate state inside reducer.
- `strictActionSerializability`: It will ensure our actions are serializable and if not it will break. e.g. If we include Date in our action, it will throw error as Date can't be serialized in Javascript.
- `strictStateSerializability`: Ensures states are serializable.

## Meta Reducers

It is same as normal reducers except that it gets executed just before executing the normal reducers. [ Similar to Http interceptor ]

Use case:

1. Earlier store runtime checks used to be performed inside meta Reducers
2. We can add logger or some other functionality inside Meta Reducer.

Eg:

```ts
// File: app/reducers/index.ts

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action: ', action);

    return reducer(state, action); // Continuing the reducer chain
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger] // Multiple meta reducers could be provided
  : [];
```

> **Note**: If multiple meta reducers are specified, they will be executed in the order they are specified.
