# Selectors and Effects

**Title**

- [Selector](#selector)
- [Feature Selector](#feature-selector)
- [Ngrx Effect - Side Effect](#ngrx-effect---side-effect)
- [Creating Effects](#creating-effects)

---

## Selector

Query the data from the Store

- Getting the whole store data

  ```ts
  this.store.subscribe((state) => console.log(state));
  ```

**Getting store data without using Selectors**

```ts
isLoggedIn$: Observable<boolean>;

ngOnInit() {
  this.isLoggedIn$ = this.state.pipe(
    map(state => !!state['auth'].user)
  );
}
```

> **Note**: Two default initial Actions get fired in the store to setup the initial state
>
> 1. @ngrx/store/init
> 2. @ngrx/store/update-reducers

**Getting store data using Selectors**

- **Method-1**: We can use only `select()` operator available in `ngrx` instead of `map()` from `rxjs` inside pipe.
  - `select()` does the same work as `map()` along with eliminating duplicate stream value being passed to subscriber.
  - Here we are performing computation with plain callback.
- **Method-2 [Recommended]**: Using `createSelector()` from `ngrx` with `select()` operator or store's `select` method.
  - It will not refetch value from store if the input is not changed.
    > **Note**: Every time there is change in store data, ngrx will emit the store data, and all the subscription will receive a fresh latest data.

File: `auth.selectors.ts`

```ts
export const isLoggedIn = createSelector(
  (state) => state['auth'],
  (auth) => !!auth['user']
);
```

- 1st callback is called `mapping` function. Output of this is the slice of the store we need.
- 2nd callback is called `projector` function. This will give the result of the selector.

> **Note**:
>
> 1. We can pass multiple `mapping` function
>
> - All consecutive `mapping` callback will receive data from previous mapping function
>
> 2. At the end we pass `projector` function, which will return the final computed value.
> 3. `CreateSelector()` has its own memory (memoised) because of that it does not run projector if mapping callback does not have any change in value.
> 4. We can pass this selector to `select()` pipeable operator
>
> ```ts
> .pipe(
> select(isLoggedIn)
> )
> ```

- `CreateSelector()` is also a mapping function so, we can also use the previous `createSelector()` with new one to create a combined selector.

Eg:

```ts
export const isLoggedOut = createSelector(
  isLoggedIn, // Previous selector
  (loggedIn) => !loggedIn
);
```

## Feature Selector

- A state (slice of store) which belongs to a feature module is called feature state.
- We can further call any subset of sliced state a feature state and the **feature-selectors** is nothing but the **mapping** part of `CreateSelector()` which also helps with type safety.

Eg:

```ts
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);
```

## Ngrx Effect - Side Effect

> **Notion**:
> Whatever changes we make on UI, we want to get it reflected immediately and making network request should happen in the background. This background request is a good example of side effect.
>
> Ngrx Effect provides the functionality to perform such side effect in the background in sync with store.

- Installation

  ```
  ng add @ngrx/effects
  ```

- Configure Root Module

  ```ts
  // app.module.ts

  ...
  imports: [
    ...,
    EffectsModule.forRoot([
      // This can be kept empty
    ]),
  ]
  ```

- Configure Feature Module

  ```ts
  // auth.module.ts
  ...
  imports: [
    ...,
    EffectsModule.forFeature([
      // Some effects
    ]),
  ]

  ```

## Creating Effects

**Step-1**: Create effect

> **Note**: It will be a service which we only inject to Effect Module and subsequently the Feature module.

File: `auth.effects.ts`

```ts
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {
    actions$.subscribe((action) => {
      if (action.type == '[Login Page] User Login') {
        localStorage.setItem('user', JSON.stringify(action['user']));
      }
    });
  }
}
```

Here implementation inside the constructor is not type safe, we'll use a better approach.

> In RxJs for side effect we use `tap()` operator inside `pipe()`

**Step-2**: Inject to Feature Module

File: `auth.module.ts`

```ts
...

imports: [
  ...,
  EffectModule.forFeature([
    AuthEffects,
  ]),
]
```

RxJs way of creating Effect - better approach

- `createEffect()`: It could be used to create an effect
  - It accepts a callback as argument which should return an Observable on which `createEffect()` subscribes implicitly and also handles error scenario.

```ts
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.login),
      tap((action) => {
        localStorage.setItem('user', JSON.stringify(action.user));
      }),
      { dispatch: false }
    )
  );
}
```

Explanation of above piece of code

- `login$`: Class level variable. No need to do anything to it here, it will be used in unit test.
- `ofType()`: Filters action. We can also use `filter()` operator but ngrx provides this handy operator.
- `{ dispatch: false }`: This property is to inform effect to not dispatch any action, either a different one or the one coming from `tap()` all the way from `ofType()`.

> **Note**:
>
> 1. Usually we dispatch a different action (just by returning an action at the end) to just update store based on side effect's result but if not, we make `{ dispatch: false }` to stop from going in an infinite loop because if provide this property whatever action this effect ran on will again be returned and it will again get triggered.
> 2. Make sure you stop the running app while implementing the effect, else without explicit other action dispatch or `{ dispatch: false }` it may fall into an infinite loop.
>    `createEffect()` has built-in error handling provided to us by ngrx effect. If something goes wrong with the side effect observable, the observable is going to get recreated again. Also, we don't have to manually subscribe to this effect.
