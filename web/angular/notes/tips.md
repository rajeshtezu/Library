# Tips

## Using well known modules

Angular uses many well knowns npm modules which you may have used with other libraries so, you can import and use them here as well.
Some of them are as follows:

- `lodash`
- `date-fns`

## CSS tips

- Don't make component's styles global, ie, don't use `ViewEncapsulation.None` in order to override 3rd party styles instead use `::ng-deep` wrapped in a custom unique class-name

Link - [Component styling best practices](https://angular.io/guide/component-styles#component-styling-best-practices)

## SSR tips

- Never allow execution of `setTimeout()` without platform check while running the code on server side in SSR.

## Observable Subscription

- Try using `async` pipe inside `.html` to get the latest data from stream instead of subscribing inside `.ts` and then binding inside `.html`.

  > This approach would be helpful if you don't want to perform any other operation on fetched data in some other part of your code

- **Unsubscribing Observable**: Instead of assigning each subscription returned from `subscribe`() to a separate variable and calling `unsubscribe()` on each of them inside `ngOnDestroy()`, create a `Subscription` object and add all of them to that object and finally call `unsubscribe()` on that object inside `ngOnDestroy()`.

  Eg:

  ```
  ...

  const subs = new Subscription();

  ngOnInit() {
    const someRandomSubs1 = someObservable1$.subscribe(...);
    const someRandomSubs2 = someObservable2$.subscribe(...);
    const someRandomSubs3 = someObservable3$.subscribe(...);

    subs.add(someRandomSubs1);
    subs.add(someRandomSubs2);
    subs.add(someRandomSubs3);
  }

  ngOnDestroy() {
    subs.unsubscribe();
  }
  ```
