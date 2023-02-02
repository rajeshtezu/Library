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

```
import { of } from 'rxjs';

of('Alice', 'Bob', 'Charlie').subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

o/p:
Alice
Bob
Charlie
Completed
```

Eg: Creating a custom `of` function (Polyfill)

```
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

o/p:
Alice
Bob
Charlie
Completed
```

## from

- Creates an Observable from an `Array`, an `array-like object`, a `Promise`, an `iterable object`, or an `Observable-like object`.

Eg-1: Array to Observable

```
import { from } from 'rxjs';

from(['Alice', 'Bob', 'Charlie']).subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

o/p:
Alice
Bob
Charlie
Completed
```

Eg-2: Promise to Observable - `resolve` case

```
import { from } from 'rxjs';

const myPromise = new Promise((resolve, reject) => {
  resolve('Resolved!');
});

from(myPromise).subscribe(
  next: value => console.log(value),
  complete: () => console.log('Completed')
);

o/p:
Resolved!
Completed
```

Eg-3: Promise to Observable - `reject` case

```
import { from } from 'rxjs';

const myPromise = new Promise((resolve, reject) => {
  reject('Rejected!');
});

from(myPromise).subscribe(
  next: value => console.log(value),
  error: err => console.log(err),
  complete: () => console.log('Completed')
);

o/p:
Rejected!
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

```
fromEvent(button, 'click');

subscribe()   <-----> addEventListener()
unsubscribe() <-----> removeEventListener()
```

- Observable created using `fromEvent` is `hot`.

Eg-1: Using `fromEvent`

```
import { fromEvent } from 'rxjs';

const triggerButton = document.querySelector('button#trigger');

const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
  event => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

Eg-2: Creating polyfill for `fromEvent`

```
import { Observable } from 'rxjs';

const triggerButton = document.querySelector('button#trigger');

function customFromEvent<T>(eventTarget: any, type: string) {
  return new Observable<T>(subscriber => {
    const handler = (event) => {
      subscriber.next(event);
    }

    eventTarget.addEventListener(type, handler);

    return () => {
      eventTarget.removeEventListener(type, handler);
    }
  });
}

const subscription = customFromEvent<MouseEvent>(triggerButton, 'click').subscribe(
  event => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

## timer

## interval

## forkJoin

## combineLatest

---

## Important Links

- Link to official docs for Creation Operators: https://rxjs.dev/guide/operators#creation-operators-1

## Duck typing

Duck typing in computer programming is an application of the duck test — `"If it walks like a duck and it quacks like a duck, then it must be a duck"` — to determine whether an object can be used for a particular purpose.
