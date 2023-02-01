# Reducer

- Create initial state

```
const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10),
  ]
};
```

- Create Action

```
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}
```

- Create Reducer

```
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './action';

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    default:
      return state;  // Required to initialize the store when Angular runs it for the first time
  }
}
```

- Register `StoreModule` and `EffectsModule` to Root module (App Module)

```
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
    EffectsModule.forRoot([]),
  ],
})
export class AppModule {}
```

- Register `StoreModule` and `EffectsModule` to Lazy loaded module

```
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(FEATURE_KEY, reducer, {
      initialState,
    }),
    EffectsModule.forFeature([FeatureEffects]),
  ],
})
export class FeatureModule {}
```

- Selecting State inside Component

```
import { Store } from '@ngrx/store';

  ...

  ingredients$: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

  ngOnInit() {
    this.ingredients$ = this.store.select('shoppingList');  // Select/Get a slice of data from store
  }
```

- Using selected state inside component's html template

```
  <div *ngFor="let ingredient of (ingredients$ | async).ingredients; let i = index">
    {{ ingredient.name }} ({{ ingredient.amount }})
  </div>
```

- Dispatching actions

Inside a component

```
import * as ShoppingListActions from './action';

  ...

  const newIngredient = new Ingredient(name, amount);
  this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
```
