# Multiple Actions

- Create multiple Actions

```
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients;   // We are exporting union of actions
```

- Update the Reducer

```
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './action';

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      }
    default:
      return state;  // Required to initialize the store when Angular runs it for the first time
  }
}
```

Rest of the steps are similar to what is explained in [Reducers](reducers.md)
