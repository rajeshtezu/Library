# NgRx

Store (state) management for Angular application.

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

## Installation

- Core package for store

```
npm install --save @ngrx/store
```
