# Actions and Reducers

Use following schematics/scaffolding command to add store to lazy loaded module

```
ng generate store <path>/<module_name> --module <module_name>.module.ts
```

Eg:

```
ng generate store auth/Auth --module auth.module.ts
```

It will generate a `reducers/index.ts` file and configure the same to auth module.

Now inside auth module you will see following config:

```ts
...
imports: [
  StoreModule.forFeature(
    'auth',
    fromAuth.reducers,
    { metaReducers: fromAuth.metaReducers }
  )
]
```

## Store Service API

**Step-1**: Inject Store to Component

```ts
...

  constructor(..., store: Store) {}

  login() {
    ...

    this.auth.login(email, password)
      .pipe(
        tap(user => {
          this.store.dispatch(<Action>);
          this.router.navigateByUrl('/courses');
        })
      ).subscribe(
        noop,
        () => alert('Login Failed')
      );
  }
```

**Step-2**: Create Action

Action is just an object with following structure

```ts
{
  type: 'Login Action',
  payload: <some data>    // Optional
}
```

Now inside `auth.actions.ts`:

1. Define Action Creator

```ts
export const login = CreateAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);
```

- Text inside square bracket represents the source of the action being dispatched.
- Text outside the square bracket represents the type of action
- `props<T>()`: defines payload being accepted. `T` is the type of payload.

> **Note**: We should not use multiple Action from different parts of Application, instead create different action for different screen to easily track back to the source of action being dispatched.

2. Create action from Action Creator

```ts
const LoginAction = login({
  user: { ... } // Payload
});
```

Now this Action could be dispatched.

> **Grouping multiple Actions together**
>
> - Create one more action
>
> ```ts
> export const logout = CreateAction('[Top Menu] Logout');
> ```
>
> Now create a separate file, import all the related actions and export them as a group
>
> File: `action-type.ts`
>
> ```ts
> import * as AuthActions from './auth-actions';
> export { AuthActions };
> ```
>
> **Note**: It's just plain JS logic, has nothing to do with Ngrx.

**Step-3**: Create Reducers

- A plain JS function, accepts state and action as argument and returns a modified version of state (Immutable)

> **Fun Fact**
>
> The name `reducers` is taken from the Javascript's `reduce()` function.
>
> Just the way `reduce()` function takes first argument as accumulator which can have an initial value, we pass state to reducer and the second argument is the value to be used in each iteration, which in case of reducer is the action.

File: `auth/reducers/index.ts`

```ts
export  interface AuthState {
  user: User;
}

export const initialState: AuthState {
  user: undefined,
}

export const authReducer = createReducer(
  initialState,
  on(AuthAction.login, (state, action) => {
    return {
      user: action.user
    }
  }),
)
```
