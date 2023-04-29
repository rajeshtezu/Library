# Observable

## Array vs Stream

- **Array**: All the data are available at all the time and we can access any data at any time
- **Stream**: Items in a stream can come at various point of time. This approach is about reacting to the item when they show up, we don't know the next value and whether they will appear or not. We provide some code which will react to the data if it shows up. [Called Reactive programming]

## Observable

The idea of `Observable` is based on the concept of `Stream`

When Observable is executed it can emit some notifications: `next`, `error`, `complete`

- `Observable`

```ts
const observable$ = new Observable((subscriber) => {
  subscriber.next('Alice');
  subscriber.next('Bob');
});
```

- `Observer` (Handler to react to Observable object)

```ts
const observer = {
  next: (value) => console.log(value),
};
```

- `Subscription` (Runs the callback inside Observable and passes observer to it)

```ts
const subscription = observable$.subscribe(observer);
```

Now each time when a value is emitted from the observable, the observer will be executed.

> **Note**: When we subscribe, our `observer` gets wrapped into `subscriber` object of Observable and this provides some observable interface guarantees like not delivering notification after the subscription gets closed i.e. making observable more predictable and transparent to use

- The subscription could be ended/canceled by calling the `unsubscribe()` method on object returned from `subscribe()` method

```ts
subscription.unsubscribe();
```

> **Note**: Unsubscribing does not stop the observable from running it's internal code, in order to handle that it has teardown logic. Check the [Teardown section](#teardown)

- Shorthand of only passing `next` function in the observer

```ts
observable$.subscribe((value) => console.log(value));
```

- Sample code [Link](../code-samples/observable.ts)

## Multiple subscription

- Every new subscription will execute the observable callback independently and the observer passed can have different logics.

```ts
import { Observable } from 'rxjs';

const observable$ = new Observable<string>((subscriber) => {
  subscriber.next('Alice');
  subscriber.next('Bob');
});

observable$.subscribe((value: string) => console.log(value));
observable$.subscribe((value: string) => console.log(value));
observable$.subscribe((value: string) => console.log(value));
```

## Notification Types

- `next`: This emits any number of times
- `error`:
  - Emits an error when something goes wrong.
  - Emitted only once and finalizes the subscription
  - Can carry a payload
- `complete`:
  - Emits when no more item needs to be emitted.
  - Emitted only once and finalizes the subscription

## Teardown

- Observable provides a way to write a teardown logic i.e. to allow running a piece of code when it emits `error` or `complete` notification or it is `unsubscribed`.

```ts
const observable$ = new Observable<T>((subscriber) => {
  subscriber.next('Some value');

  setTimeout(() => {
    subscriber.error(new Error('Some error'));
  }, 2000);

  setTimeout(() => {
    subscriber.complete();
  }, 3000);

  return () => {
    console.log('Teardown');
  };
});

observable$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log(err),
  complete: () => console.log('Completed'),
});
```

- Teardown logic is used to allow observable to perform clean up or cancellation if the observable initialized some resources to prevent memory leak etc.

Eg:

```ts
const interval$ = new Observable<T>((subscriber) => {
  let count = 1;

  const intervalId = setInterval(() => {
    console.log('Counter: ', count);
    subscriber.next(count++);
  }, 2000);

  return () => {
    clearInterval(intervalId);
  };
});

const subscription = interval$.subscribe((value) => console.log(value));

setTimeout(() => {
  subscription.unsubscribe();
}, 9000);
```

---

## Important Links

- RxJs Marble: [https://rxmarbles.com/](https://rxmarbles.com/)
