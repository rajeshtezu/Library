# Creation Operators/Functions

Creation Operators/Functions provide an easy way to create an observable with some popular behavior.

- [of](#of)
- [from](#from)
- [fromEvent](#fromevent)
- [timer](#timer)
- [interval](#interval)
- [forkJoin](#forkjoin)
- [combineLatest](#combinelatest)
- [Important Links](#important-links)
- [Duck typing](#duck-typing)

## of

- It allows to create an observable which emits a set of values and completes.
- When we subscribe this observable it will emit all the values as next notification we provided in the `argument` and then the observable will `complete` ending the subscription.

Eg:

```ts
import { of } from 'rxjs';

of('Alice', 'Bob', 'Charlie').subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

// o/p:
// Alice
// Bob
// Charlie
// Completed
```

Eg: Creating a custom `of` function (Polyfill)

```ts
import { Observable } from 'rxjs';

function customOf(...args: string[]): Observable<string> {
  return new Observable(subscriber => {
    args.forEach(arg => subscriber.next(arg));
    subscriber.complete();
  });
}

customOf('Alice', 'Bob', 'Charlie').subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

// o/p:
// Alice
// Bob
// Charlie
// Completed
```

## from

- Creates an Observable from an `Array`, an `array-like object`, a `Promise`, an `iterable object`, or an `Observable-like object`.

**Eg-1**: Array to Observable

```ts
import { from } from 'rxjs';

from(['Alice', 'Bob', 'Charlie']).subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

// o/p:
// Alice
// Bob
// Charlie
// Completed
```

**Eg-2**: Promise to Observable - `resolve` case

```ts
import { from } from 'rxjs';

const myPromise = new Promise((resolve, reject) => {
  resolve('Resolved!');
});

from(myPromise).subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

// o/p:
// Resolved!
// Completed
```

Eg-3: Promise to Observable - `reject` case

```ts
import { from } from 'rxjs';

const myPromise = new Promise((resolve, reject) => {
  reject('Rejected!');
});

from(myPromise).subscribe(
  next: value => console.log(value),
  error: err => console.log(err),
  complete: () => console.log('Completed')
);

// o/p:
// Rejected!
```

> **Note**: In Eg-3, `complete` notification was not fired.

## fromEvent

- Creates an Observable that emits events of a specific type coming from the given event target.
- Supports following event targets
  - DOM EventTarget
  - Node.js EventEmitter
  - jQuery Events
  - DOM NodeList
  - DOM HtmlCollection

> **Note**: event targets listed above are checked via [duck typing](#duck-typing). It means that no matter what kind of object you have and no matter what environment you work in, you can safely use fromEvent on that object if it exposes described methods.

- Every time resulting Observable is subscribed, event handler function will be registered to event target on given event type. When that event fires, value passed as a first argument to registered function will be emitted by output Observable. When Observable is unsubscribed, function will be unregistered from event target.

Eg:

```ts
fromEvent(button, 'click');

// subscribe()   <-----> addEventListener()
// unsubscribe() <-----> removeEventListener()
```

- Observable created using `fromEvent` is `hot`.

**Eg-1**: Using `fromEvent`

```ts
import { fromEvent } from 'rxjs';

const triggerButton = document.querySelector('button#trigger');

const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
  (event) => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

**Eg-2**: Creating polyfill for `fromEvent`

```ts
import { Observable } from 'rxjs';

const triggerButton = document.querySelector('button#trigger');

function customFromEvent<T>(eventTarget: any, type: string) {
  return new Observable<T>((subscriber) => {
    const handler = (event) => {
      subscriber.next(event);
    };

    eventTarget.addEventListener(type, handler);

    return () => {
      eventTarget.removeEventListener(type, handler);
    };
  });
}

const subscription = customFromEvent<MouseEvent>(
  triggerButton,
  'click'
).subscribe((event) => console.log(event.type, event.x, event.y));

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

## timer

- Similar to `setTimeout()` function. It waits for specified time then emits `next` and `complete` notification.
- Return value emitted with `next` notification from `timer()` is `0`

Eg:

```ts
import { timer } from 'rxjs';

const subscription = timer(2000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Completed!'),
});

// Below code describe unsubscribing a timer based subscription
setTimeout(() => {
  subscription.unsubscribe();
}, 1000);
```

## interval

- Similar to `timer()` and `setInterval()`
- Emits sequential numbers every specified interval of time

Eg:

```ts
import { interval } from 'rxjs';

const subscription = interval(1000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Completed!'),
});

//  Below code describe unsubscribing a timer based subscription
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

// O/P
// ---
// 0
// 1
// 2
// 3
// 4
```

## forkJoin

- Accepts other observables as input.
- We can pass an array of other observables as input to `forkJoin()`.
- Once we subscribe to it, it will create subscription to all provided observables then it waits for all the observable to **complete**, once done it will emit set of latest values from all of the observables. **[Similar to Promise.all()]**

**Eg-1: forkJoin success scenario**

```ts
import { ajax, forkJoin } from 'rxjs';

const randomApi = 'https://random-data-api.com/api';

const name$ = ajax(`${randomApi}/name/random_name`);
const nation$ = ajax(`${randomApi}/nation/random_nation`);
const food$ = ajax(`${randomApi}/food/random_food`);

// Without forkJoin

name$.subscribe((ajaxRes) => console.log(ajaxRes.response.first_name));
nation$.subscribe((ajaxRes) => console.log(ajaxRes.response.capital));
food$.subscribe((ajaxRes) => console.log(ajaxRes.response.dish));

// With forkJoin

forkJoin([name$, nation$, food$]).subscribe(
  ([nameAjax, nationAjax, foodAjax]) =>
    console.log(`
    Name: ${nameAjax.response.first_name},
    Nation: ${nationAjax.response.capital},
    Food: ${foodAjax.response.dish},
  `)
);
```

**Eg-2: forkJoin error scenario**

If any of the observable throws an error, `forkJoin()` will result in a failure state just like `Promise.all()`. It will run teardown logic for all the observables as soon as they are no longer needed.

```ts
import { Observable, forkJoin } from 'rxjs';

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000); // 3000

  return () => {
    console.log('A teardown');
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure.');
  }, 3000); // 5000

  return () => {
    console.log('B teardown');
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error: ', err),
});

// O/P
// ---
// Error: Failure.
```

> **Q.** What would an Observable created using `forkJoin([of('ABC'), interval(1000)])` emit once we subscribe to it?
>
> **Ans.** It won't emit anything as the second provided Observable never completes.

## combineLatest

- `combineLatest()` works similar to `forkJoin()` but
  - it starts emitting array of values as soon as **all** of the observables emitted some value with `next` or `complete` notification.
  - it also emits latest values from all the observable as soon as any of them emits a new value again.
- It will emit a `complete` notification once all of them emitted a `complete` notification.
- It will also pass down the error notification if any of the observables throws just like `forkJoin()` and run teardown logic on all the observables.

Eg:

```ts
import { combineLatest, fromEvent } from 'rxjs';

const temperatureInput = document.getElementById('temperature-input');
const conversionDropdown = document.getElementById('conversion-dropdown');

const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
const conversionDropdownEvent$ = fromEvent(conversionDropdown, 'input');

combineLatest([temperatureInputEvent$, conversionDropdownEvent$]).subscribe(
  ([temperatureInputEvent, conversionDropdownEvent]) => {
    console.log(
      temperatureInputEvent.target.value,
      conversionDropdownEvent.target.value
    );
  }
);
```

---

## Important Links

- Link to official docs for Creation Operators: https://rxjs.dev/guide/operators#creation-operators-1

## Duck typing

Duck typing in computer programming is an application of the duck test — `"If it walks like a duck and it quacks like a duck, then it must be a duck"` — to determine whether an object can be used for a particular purpose.
