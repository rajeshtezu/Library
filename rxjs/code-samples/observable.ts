import { Observable } from 'rxjs';

const observable$ = new Observable<string>((subscriber) => {
  subscriber.next('Alice');
  subscriber.next('Bob');
});

const observer = {
  next: (value: string) => console.log(value),
};

observable$.subscribe(observer);
