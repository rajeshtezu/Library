# RxJs Introduction

- `rxjs`: Reactive Extensions for Javascript
- `version`: 7.x.x

**Official Definition**

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

## The essential concepts in RxJS which solve async event management

- **Observable**: represents the idea of an invokable collection of future values or events.
- **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution.
- **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like `map`, `filter`, `concat`, `reduce`, etc.
- **Subject**: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. `setTimeout` or `requestAnimationFrame` or others.

## Basic syntax

```ts
someObservableFun('some value').subscribe({
  next: (value) => console.log('Value: ', value),
  error: (err) => console.log('Error: ', err),
});
```

- Observable can emit any number of values at various point of time
- The observables on their own don't do anything, we need to call subscribe method in order to execute them
- We can react to the value they emit by providing a handler and also can react to error as shown above
