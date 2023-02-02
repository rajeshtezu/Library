# Types of Observable

## Cold Observable

- Source of the data it produces is inside the observable's logic.
- Different subscriptions will get the data independent of each subscription but it can get different data if dependent on time, i.e. Each subscription has value produced independently from other subscriptions

eg:

```
import { ajax } from 'rxjs/ajax';

const ajax$ = ajax('https://some-url');

ajax$.subscribe(data => console.log('Sub-1: ', data.response));
ajax$.subscribe(data => console.log('Sub-2: ', data.response));
ajax$.subscribe(data => console.log('Sub-3: ', data.response));
```

> **Note**: `ajax` is a [Creation Operator](creation-operators.md).

## Hot Observable

- All subscriptions share the same source of data
- Source works outside the observable logic

eg: Observable connected to a DOM event

```
import { Observable } from 'rxjs';

const helloButton = document.querySelector('button#hello');

const helloClick$ = new Observable<MouseEvent>(subscriber => {
  helloButton.addEventListener('click', event => {
    subscriber.next(event);
  });
});

helloClick$.subscribe(event => console.log('Sub-1: ', event.type, event.x, event.y));
helloClick$.subscribe(event => console.log('Sub-2: ', event.type, event.x, event.y));
helloClick$.subscribe(event => console.log('Sub-3: ', event.type, event.x, event.y));
```

## Difference between Cold and Hot Observables

| Cold Observable                                 | Hot Observable                          |
| ----------------------------------------------- | --------------------------------------- |
| Produces the data inside                        | Multicast the data from a common source |
| New subscriber - new data                       | All subscriber - common data            |
| Eg: Set of values, Http Request, Timer/Interval | Eg: DOM Event, State, Subject           |

> **Note**: An Observable can change its behavior, for example it can be Cold at first and then become Hot.

## Important Link

- Random data API - https://random-data-api.com/
