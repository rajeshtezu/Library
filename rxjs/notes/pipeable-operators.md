# Pipeable Operators

A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.

**Operator Stacking**

```
Source --> Operator-1 --> Operator-2 --> Operator-3 --> Observer
```

In this case when we subscribe, it will subscribe to `Operator-3` which will subscribe to `Operator-2` and so on till `Source` and returned notification will be passed from `Operator-1` to `Operator-2` then to `Operator-3` then finally to Observer.

---

**Operators**

- [filter](#filter)
- [map](#map)
- [tap](#tap)
- [debounceTime](#debouncetime)
- [catchError](#catcherror)
  - [EMPTY Observable](#empty-observable)
- [concatMap](#concatmap)
- [switchMap](#switchmap)
- [mergeMap](#mergemap)
  - [Comparison](#comparison)

## filter

Similar to filter available in javascript

- Affects only `next` notification
- `Error` will always re-emitted on change and same will happen to `complete` notification, it will pass through.

Eg

```
import { filter } from 'rxjs';

const sportsNewsFeed$ = newsFeed$.pipe(
  filter(item => item.category === 'sports')
);

sportsNewsFeed$.subscribe(item => {
  console.log(item);
});
```

## map

Similar to `map` available in javascript

- Affects only `next` notification
- `Error` will always re-emitted on change and same will happen to `complete` notification, it will pass through.

Eg

```
import { ajax, forkJoin, map } from 'rxjs';

const randomFirstName$ = ajax('url').pipe(
  map(ajaxResponse => ajaxResponse.response.first_name)
);

const randomCapital$ = ajax('url').pipe(
  map(ajaxResponse => ajaxResponse.response.dish)
);

forkJoin([randomFirstName$, randomCapital$]).subscribe(([firstName, capital]) => {
  console.log(`First Name: ${firstName}, Capital: ${capital}`);
});
```

## tap

Works like a spy and allows us to cause some side-effect without interacting with the notifications.

- It doesn't impact notifications in any way

Eg

```
import { of, tap } from 'rxjs';

of(1, 2, 3, 4, 5, 9, 34, 10)
  .pipe(
    tap(value => console.log('Spy: ', value)),
    map(value => value * 2),
    tap(value => console.log('Spy: ', value)),
    filter(value => value > 10),
    tap(value => console.log('Spy: ', value)),
  )
  .subscribe(value => console.log('Output: ', value));
```

## debounceTime

Works with the debounce concept.

Eg

```
import { fromEvent, map, debounceTime } from 'rxjs';

const sliderInput = document.querySelector('input#slider');

fromEvent(sliderInput, 'input')
  .pipe(
    debounceTime(2000),
    map(event => event.target['value'])
  )
  .subscribe(value => console.log(value));
```

## catchError

Handles error notification but

1. Forwards all other notification (simply let them pass)
2. Can throw the same error or a different error
3. Can pass along different observables when caught error

**Eg-1:** Continue with a different Observable when there's an error

```
import { of, map, catchError } from 'rxjs';

of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError(err => of('I', 'II', 'III', 'IV', 'V'))
  )
  .subscribe(x => console.log(x));
  // 1, 2, 3, I, II, III, IV, V
```

**Eg-2:** Retry the caught source Observable again in case of error, similar to `retry()` operator

```
import { of, map, catchError, take } from 'rxjs';

of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError((err, caught) => caught),
    take(30)
  )
  .subscribe(x => console.log(x));
  // 1, 2, 3, 1, 2, 3, ...
```

**Eg-3:** Throw a new error when the source Observable throws an error

```
import { of, map, catchError } from 'rxjs';

of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError(err => {
      throw 'error in source. Details: ' + err;
    })
  )
  .subscribe({
    next: x => console.log(x),
    error: err => console.log(err)
  });
  // 1, 2, 3, error in source. Details: four!
```

### EMPTY Observable

It simply sends a complete notification.

Eg:

```
import { of, map, catchError, take, EMPTY } from 'rxjs';

of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError(err => EMPTY),
    take(30)
  )
  .subscribe({
    next: x => console.log(x),
    complete: () => console.log('Completed!')
  });
  // 1, 2, 3, Completed!
```

---

**Transformation Operators**

Doc Link - https://rxjs.dev/guide/operators#transformation-operators

Eg

```
import { EMPTY, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, concatMap, map } from 'rxjs/operators';

const endpointInput = document.querySelector('button#endpoint');
const fetchButton = document.querySelector('button#fetch');

fromEvent(fetchEvent, 'click').pipe(
  map(() => endpointInput.value),
  concatMap(value => ajax(`url/${value}`).pipe(
    catchError(() => EMPTY)
  ))
).subscribe({
  next: value => console.log(value),
  error: err => console.log('Error: ', err),
  complete: () => console.log('Complete!')
});
```

## concatMap

- Maps each value to an Observable, then flattens all of these inner Observables using `concatAll`.
- Each new inner Observable is concatenated with the previous inner Observable.
- Runs for every emitted notification
- Does not forward complete notification through it
- Passes the error notification to subscriber which ends the subscription
- Concurrent notifications are queued

**Eg:** For each click event, tick every second from 0 to 3, with no concurrency

```
import { fromEvent, concatMap, interval, take } from 'rxjs';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  concatMap(ev => interval(1000).pipe(take(4)))
);
result.subscribe(x => console.log(x));

// Results in the following:
// (results are not concurrent)
// For every click on the "document" it will emit values 0 to 3 spaced
// on a 1000ms interval
// one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
```

> **Note:** `concatMap` is equivalent to `mergeMap` with concurrency parameter set to 1.

## switchMap

It emits the source notification as soon as it finishes but in case the previous inner subscription is still in progress and a new one comes it will terminate the previous one and switch to newer one. i.e. emits values only from the most recently projected Observable.

- Useful when fetching some data from server and we care about the latest data
- Not useful when making network request to send data

**Eg:** For each click event, tick every second from 0 to 3, with no concurrency

```
import { of, switchMap } from 'rxjs';

const switched = of(1, 2, 3).pipe(switchMap(x => of(x, x ** 2, x ** 3)));
switched.subscribe(x => console.log(x));
// outputs
// 1
// 1
// 1
// 2
// 4
// 8
// 3
// 9
// 27
```

## mergeMap

Waits for all the inner subscription to complete then flattens all the values and emits the notification for subscriber.

- It's important for all the inner subscription to complete for `mergeMap` else it will never emit and there will be memory leak.

**Eg:** Map and flatten each letter to an Observable ticking every 1 second

```
import { of, mergeMap, interval, map } from 'rxjs';

const letters = of('a', 'b', 'c');
const result = letters.pipe(
  mergeMap(x => interval(1000).pipe(map(i => x + i)))
);

result.subscribe(x => console.log(x));

// Results in the following:
// a0
// b0
// c0
// a1
// b1
// c1
// continues to list a, b, c every second with respective ascending integers
```

### Comparison

| concatMap                   | switchMap                           | mergeMap                      |
| --------------------------- | ----------------------------------- | ----------------------------- |
| Queues/Buffers              | Cancels/Unsubscribes                | Concurrent inner subscription |
| Memory leaks easy to notice | Memory leaks not dangerous          | Memory leaks hard to notice   |
| Values handled one by one   | Quick reaction to new source values | -NA-                          |
| Possible delayed reaction   | Order mostly safe                   | No definite order             |

> Q. How does a Flattening Operator such as concat/switch/mergeMap work?
>
> Ans. It maps each value into a new Observable, creates a Subscription to this Observable and then passes the values emitted by it to the output.

> Q. Which notifications coming from the Inner Observable does a Flattening Operator pass to the output?
>
> Ans. next and error notifications

> Q. Which is true for the mergeMap operator?
>
> Ans. It concurrently handles all the values.
