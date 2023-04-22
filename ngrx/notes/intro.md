# NgRx

- Store (state) management for Angular application.
  - Adds an in-memory database/datastore to Application
- Cache management
- Make http request independent of Component lifecycle

## Issues with RxJS Approach

- State can be updated anywhere
- State is (possibly) mutable
- **Handling side effects (e.g. Http calls) is unclear**

## Redux to the Rescue

```
  ----→ Services ←------------→ Component ←------------------|
  |       |                         |                        |
  |       |                         |                        |
  |       ---------------------------                        |
  |                   |                                      |
  |                   | Dispatch                             |
  |                   ↓                                      |
  |                 Action                                   |
  |                   |                                      |
  |                   | Sent to                              |
  |                   ↓                                      |
  |                 Reducer  [ Reduces / Combine state ]     |
  |                   |                                      |
  |                   | Saves reduced State (immutably!)     |
  |                   ↓                                      |
  |---------------- Store -----------------------------------|
              (Application State)
```

## NgRx Store

```
  ----→ Services ←------------→ Component ←------------------|
  |       |                         |                        |
  |       |                         |                        |
  |       ---------------------------                        |
  |                   |                                      |
  |                   | Dispatch                             |
  |                   |                                      |
  |                   ↓      Listen                          |
  |                 Action  -------➙  Side Effects           |
  |                   |           (do something, e.g. Http)  |
  |                   | Sent to                              |
  |                   ↓                                      |
  |                 Reducer  [ Reduces / Combine state ]     |
  |                   |                                      |
  |                   | Saves reduced State (immutably!)     |
  |                   ↓                                      |
  |---------------- Store -----------------------------------|
              (Application State)
```

- Difference to "normal" Redux
  - Deeply integrated into Angular
  - Uses RxJS
  - (Uses Typescript)

## Adding ngrx to Angular project/workspace

1. Adding and configuring Store

   - Add store

   ```
   ng add @ngrx/store
   ```

   - Root module configuration

   ```
   // app.module.ts

   ...
   imports: [
     ...,
     StoreModule.forRoot(reducers, { metaReducers })
   ]
   ```

2. To see the store data

   - Add store devtools

   ```
   ng add @ngrx/store-devtools
   ```

   - Configure devtools

   ```
   ...
   imports: [
     ...,
     StoreDevtoolsModule.instrument({
       maxAge: 25,
       logOnly: environment.production
     }),
   ]
   ```

3. Install Devtool extension - [Redux DevTools](https://github.com/reduxjs/redux-devtools)
