# Observables

<span style="background-color: black; color: white; padding: 16px; margin: 10px 0;">
  Observable
</span> -----> 
<span style="background-color: black; color: white; padding: 16px; margin: 10px 0;">
  Observer
</span>

Observables are a blueprint for creating streams and plumbing them together with operator to create observable chain.
[An alternate way to handle asynchronous task]

> Note: On creating a custom observable, don't forget to unsubscribe manually.

Eg:

```ts
import { interval } from 'rxjs';

...

interval(1000).subscribe(count => console.log(count));
```

## Creating Custom Observable

**Step-1**: Create an Observable

```ts
const customObservable = new Observable((subscriber) => {
  let count = 0;

  setInterval(() => {
    subscriber.next(count);
    count++;
  }, 1000);
});
```

**Step-2**: Subscribe to the Observable

```ts
customObservable.subscribe((data) => {
  console.log(data);
});
```

### Error Handling and Complete

```ts
customObservable.subscribe(
  next(data) {
    console.log(data);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log('done');
  }
);
```

- When an observable throws an error, it dies.
- `1st` argument to subscribe function is `observer` callback.
- `2nd` argument to subscribe function is `error` callback
- `3rd` argument to subscribe function is `complete` callback
  - It will be called when observable stops
  - It won't be called if some error occurs before completion

### Halting an observable

- Call `subscriber.complete()`.

```ts
const customObservable = new Observable((subscriber) => {
  let count = 0;

  setInterval(() => {
    subscriber.next(count);
    count++;

    if (count === 5) subscriber.complete(); // NOTICE THIS LINE
  }, 1000);
});
```

## Operator

Allows to subscribe to manipulated data.

Eg

```ts
import { pipe, map, ... } from 'rxjs/operator';

customObservable.pipe(map(data: T) => {
  return 'Round' + (data + 1);
}).subscribe(data => {
  console.log(data);
});
```

## Subject

- Similar to Event Emitter
- Using Subject instead of EventEmitter is efficient behind the scene (EventEmitter is built on top of Subject)
- Subjects are `multicast`
  - Every Subject is an `Observable`
  - Every Subject is an `Observer`

> A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

### Uses

**Step-1**: Create event emitter

```ts
myEventEmitter = new Subject<boolean>();
```

**Step-2**: Subscribe to the Subject

```ts
myEventEmitter.subscribe((value) => console.log(value));
```

**Step-3**: Emit an event

```ts
myEventEmitter.next(true);
```

**Step-4**: Unsubscribe the Subject

```ts
myEventEmitter.unsubscribe();
```

> Note: Using `Subject` to share data across the Components is only recommended when using the Services, with `@Output()` we use `EventEmitter()`.

---

For detailed info on observables please read through [here](../../../rxjs/README.md)
