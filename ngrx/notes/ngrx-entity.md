# Ngrx Entity

We'll fetch and load data on router resolver. We will use ngrx entity to store data in certain format which will help in faster operation over the data.

**Step-1**: Defining Action

```ts
// File: course.action.ts

export const loadAllCourses = createAction(
  '[Course Resolver] Load All Courses'
);

export const allCoursesLoaded = createAction(
  '[Load Course Effect] All Courses Loaded',
  props<{ courses: Course[] }>()
);
```

- Here `loadAllCourses` action will be dispatched by Courses Resolver (Router resolver) which will then trigger effect and dispatch `allCoursesLoaded` action.
  - `loadAllCourses` will fetch data from backend
  - `allCoursesLoaded` will save data to the store

**Step-2**: Create action type (Grouping Actions)

```ts
// File: action-type.ts

import * as CourseActions from './course.actions';
export { CourseActions };
```

**Step-3**: Load data using Router Resolver

> Personal Opinion: You can load data inside component if you wish.

```ts
// File: courses.resolver.ts

import { Resolve } from '@angular/router';

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadCourses());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
```

- This will execute resolve before the component loads on that routing path.
- `first()`: will emit complete notification when ran for the first data in the stream itself.
- `finalize()`: will be executed irrespective of success or error (like `finally` block in `try-catch`).

**Step-4**: Add the resolver config in the route config file

```ts
// File: course-router.module.ts

...

{
  path: '',
  component: HomeComponent,
  resolve: {
    courses: CoursesResolver  // courses - property on which resolver will store the data
  }
}
```

Now inject the CoursesResolver service

```ts
...

providers: [
  ...,
  CoursesResolver
]
```

**Step-5**: Create Effect

```ts
// File: courses.effect.ts

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.action$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap((action) => this.courseHttpService.findAllCourses()),
      map((courses) => allCoursesLoaded({ courses })) // Dispatching action to save data to store
    )
  );
}
```

Inject the effect to the module

```ts
// File: course.module.ts

...

imports: [
  ...,
  EffectModule.forFeature([ CoursesEffects ])
]
```

**Step-6**: Ngrx Entity Format

- Add entity: `ng add @ngrx/entity`
- Entity helps to create data in a specific format which helps to perform a faster operation over it. It also provides instance methods to perform all those operation in efficient way.

Entity creates the following format under the hood

```ts
{
  entities: { [key: number]: course },
  ids: number[]
}
```

1. `ids` defines natural order of entities
2. entities' `key` is created by `ids` in the data array, this way it becomes JS object (hash map) and read operation becomes O(1).
3. To create this format ngrx provides `EntityState`

```ts
// File: course.reducers.ts

// Part-1: Entity Format
export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

// Provides methods to perform CRUD operations easily
export const adapter = CreateEntityAdapter<Course>({
  sortComparer: compareCourses, // callback to perform sorting, similar to sort() function in JS
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

// Part-2: Reducers
export const CoursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, {
      ...state,
      allCoursesLoaded: true,
    });
  }),
  on(CourseActions.courseUpdated, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll } = adapter.getSelectors(); // This selectAll now can be used with generic selectors. See Step-8
```

**Step-7**: Inject Reducer to Module

```ts
...

imports: [
  ...,
  StoreModule.forFeature('courses', CoursesReducer),
]
```

**Step-8**: Create Selectors

```ts
// File: course.selectors.ts

export const selectCoursesState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll // selectAll from Step-6
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == 'BEGINNER')
);
```

> **Load data only if needed**
>
> 1. Create another selector
>
> ```ts
> export const areCoursesLoaded = createSelector(
>   selectCoursesState,
>   (state) => state.allCoursesLoaded
> );
> ```
>
> 2. Update resolve logic
>
> ```ts
> ...
>
>   resolve(...) {
>     return this.store.pipe(
>       select(areCoursesLoaded),
>       tap(coursesLoaded => {
>         if(!this.loading && !coursesLoaded) {
>           // Code from Step-3
>         }
>       }),
>       filter(coursesLoaded => coursesLoaded),
>       // Code from Step-3
>     )
>   }
> ```
>
> Here `filter` is used to make sure this observable return to the resolve method only if course have been loaded.

**Step-9**: Use the `actions` and `selectors` inside the Components to set and get data from store and also perform side effects.

## Updating Data

**Step-1**: Create Action

```ts
export const courseUpdated = createAction(
  '[Edit Course Dialog] Course Updated',
  props<{ update: Update<Course> }>()
);
```

Here `Update` in the props is an Ngrx entity type to handle update operation.

**Step-2**: Create reducer to handle the update and save to store immediately on same action.

**Step-3**: Create effect to make network request. Here we don't need to dispatch any action to save in the store, it's already handled in **Step-2**

Inside Component

```ts
  onSave() {
    const course = {
      ...this.course,
      ...this.form.value
    };

    const update: Update<Course> = {
      id: course.id,
      changes: course
    };

    this.store.dispatch(
      courseUpdated({ update })
    );
  }
```
