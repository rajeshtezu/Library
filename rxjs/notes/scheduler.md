# Scheduler

A scheduler controls when a subscription starts and when notifications are delivered.

> Official doc - https://rxjs.dev/guide/scheduler

Basically, it alters the execution context for that piece of code, as a result, Javascript executes them in different order.

- A Scheduler is a data structure : It knows how to store and queue tasks based on priority or other criteria
- A Scheduler is an execution context
- A Scheduler has a (virtual) clock

> A Scheduler lets you define in what execution context will an Observable deliver notifications to its Observer.

Eg:

```ts
import { Observable, observeOn, asyncScheduler } from 'rxjs';

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(observeOn(asyncScheduler));

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');

// O/P:
// just before subscribe
// just after subscribe
// got value 1
// got value 2
// got value 3
// done
```

## Scheduler Types

| Scheduler               | Purpose                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| null                    | Not passing any scheduler, as a result notifications are delivered synchronously and recursively. Use this for constant-time operations or tail recursive operations.          |
| queueScheduler          | Schedules on a queue in the current event frame (trampoline scheduler). Use this for iteration operations.                                                                     |
| asapScheduler           | Schedules on the micro task queue, which is the same queue used for promises. Basically after the current job, but before the next job. Use this for asynchronous conversions. |
| asyncScheduler          | Schedules work with setInterval. Use this for time-based operations.                                                                                                           |
| animationFrameScheduler | Schedules task that will happen just before next browser content repaint. Can be used to create smooth browser animations.                                                     |

Check [docs](https://rxjs.dev/guide/scheduler) for example on each scheduler.
