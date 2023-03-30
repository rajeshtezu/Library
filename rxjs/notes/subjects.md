# Subjects

- [Subject](#subject)
- [Multicasted Observables](#multicasted-observables)
- [BehaviorSubject](#behaviorsubject)
- [ReplaySubject](#replaysubject)
- [AsyncSubject](#asyncsubject)
- [Void subject](#void-subject)

## Subject

A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

- While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

**Every Subject is an Observable**: You can subscribe to it. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.

> Internally to the Subject, subscribe does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers, similarly to how addListener usually works in other libraries and languages.

**Every Subject is an Observer**: It is an object with the methods `next(v)`, `error(e)`, and `complete()`.

> To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.

**Eg-1**: Two Observers attached to a Subject, and we feed some values to the Subject

```
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

**Eg-2**: Since a Subject is an Observer, this also means you may provide a Subject as the argument to the subscribe of any Observable

```
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

const observable = from([1, 2, 3]);

observable.subscribe(subject); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

> **Note**: With the approach above, we essentially just converted a unicast Observable execution to multicast, through the Subject.

## Multicasted Observables

A multicasted Observable uses a Subject under the hood to make multiple Observers see the same Observable execution.

> **Under the hood, this is how the multicast operator works**: Observers subscribe to an underlying Subject, and the Subject subscribes to the source Observable.

**Eg**: similar to the previous example which used `observable.subscribe(subject)`

```
import { from, Subject, multicast } from 'rxjs';

const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();
```

> `multicast` returns an Observable that looks like a normal Observable, but works like a Subject when it comes to subscribing.
>
> `multicast` returns a `ConnectableObservable`, which is simply an Observable with the `connect()` method.
>
> The `connect()` method is important to determine exactly when the shared Observable execution will start. Because `connect()` does `source.subscribe(subject)` under the hood, `connect()` returns a Subscription, which you can unsubscribe from in order to cancel the shared Observable execution.

## BehaviorSubject

- One of the variant of Subject
- It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the **"current value"** from the `BehaviorSubject`.
- Requires to have created with an initial value which works as **"current value"** when there hasn't been any value emitted from the source.

**Eg**: BehaviorSubject is initialized with the value 0 which the first Observer receives when it subscribes. The second Observer receives the value 2 even though it subscribed after the value 2 was sent.

```
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

## ReplaySubject

- Similar to a `BehaviorSubject`
- it can send old values to new subscribers, but it can also record a part of the Observable execution.

> A `ReplaySubject` records multiple values from the Observable execution and replays them to new subscribers.

**Eg-1**: When creating a ReplaySubject, you can specify how many values to replay:

```
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```

**Eg-2**: We can also specify a window time in milliseconds, besides of the buffer size, to determine how old the recorded values can be

```
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

let i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 1000);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...
```

## AsyncSubject

The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.

Eg:

```
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```

> The AsyncSubject is similar to the last() operator, in that it waits for the complete notification in order to deliver a single value.

## Void subject

Sometimes the emitted value doesn't matter as much as the fact that a value was emitted.

Eg:

```
const subject = new Subject<void>();
setTimeout(() => subject.next(), 1000);
```
