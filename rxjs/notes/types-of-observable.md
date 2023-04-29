# Types of Observable

There are two types of Observables - `Hot` and `Cold`

**Title**

- [Hot Observable](#hot-observable)
- [Cold Observable](#cold-observable)
- [Difference between Hot and Cold Observables](#difference-between-hot-and-cold-observables)
- [Important Links](#important-links)

---

## Hot Observable

- A subject that behaves as though it's already "running" when the subscription begins
  > Starts creating values even before subscription has started (**Mouse event**)
- All subscriptions share the same source of data
- Source/Provider works outside the observable logic

eg: Observable connected to a DOM event (mouse event)

```ts
import { Observable } from 'rxjs';

const helloButton = document.querySelector('button#hello');

const helloClick$ = new Observable<MouseEvent>((subscriber) => {
  helloButton.addEventListener('click', (event) => {
    subscriber.next(event);
  });
});

helloClick$.subscribe((event) =>
  console.log('Sub-1: ', event.type, event.x, event.y)
);
helloClick$.subscribe((event) =>
  console.log('Sub-2: ', event.type, event.x, event.y)
);
helloClick$.subscribe((event) =>
  console.log('Sub-3: ', event.type, event.x, event.y)
);
```

## Cold Observable

- A subject that starts "running" when the subscription beings
  > Nothing happens until something subscribes to it (**Http request**)
- Source of the data it produces is inside the observable's logic.
- Different subscriptions will get the data independent of each subscription but it can get different data if dependent on time, i.e. Each subscription has value produced independently from other subscriptions

eg:

```ts
import { ajax } from 'rxjs/ajax';

const ajax$ = ajax('https://some-url');

ajax$.subscribe((data) => console.log('Sub-1: ', data.response));
ajax$.subscribe((data) => console.log('Sub-2: ', data.response));
ajax$.subscribe((data) => console.log('Sub-3: ', data.response));
```

> **Note**: `ajax` is a [Creation Operator](creation-operators.md).

## Difference between Hot and Cold Observables

| Hot Observable                          | Cold Observable                                  |
| --------------------------------------- | ------------------------------------------------ |
| Multicast the data from a common source | Produces the data inside                         |
| All subscriber - common data            | New subscriber - new data                        |
| Eg: DOM Event, State, Subject           | Eg: Set of values, Http Request, Timer/Interval, |
| Watching movie in theatre               | Watching movie on Netflix                        |

> **Note**: An Observable can change its behavior, for example it can be Cold at first and then become Hot.

## Important Links

- Random data API - https://random-data-api.com/
- [Hot vs Cold Observables](https://benlesh.medium.com/hot-vs-cold-observables-f8094ed53339)
