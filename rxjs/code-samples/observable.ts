import {
  EMPTY,
  Observable,
  catchError,
  concat,
  concatMap,
  from,
  map,
  mergeMap,
  of,
  retry,
  take,
  tap,
} from 'rxjs';

// const observable$ = new Observable<string>((subscriber) => {
//   subscriber.next('Alice');
//   subscriber.next('Bob');
// });

// const observer = {
//   next: (value: string) => console.log(value),
// };

// observable$.subscribe(observer);

const numbers = [1, 2, 3, 4, 4, 5, 5];

// function main() {
//   of(numbers)
//     .pipe(
//       tap((numbers) => {
//         from(numbers)
//           .pipe(
//             concatMap((number) => {
//               console.log('>>>>>', number);
//               // throw new Error();

//               // return of(number);
//               return of(number);
//             }),
//             retry(1)
//           )
//           .subscribe({
//             error: () => console.log('Error'),
//           });
//       }),
//       concatMap(() => {
//         console.log('Hello there');

//         return EMPTY;
//       })
//     )
//     .subscribe({
//       next: (value) => console.log('Value: ', value),
//       error: console.error,
//     });
// }

// o/p
// 333333
// 222222
// 111111

// function main() {
//   of(numbers)
//     .pipe(
//       mergeMap(() => {
//         console.log('111111');

//         return of({});
//       }),

//       tap(
//         from([10])
//           .pipe(
//             mergeMap(() => {
//               console.log('222222');
//               throw new Error();

//               return EMPTY;
//             }),
//             retry(1)
//           )
//           .subscribe({
//             error: (err) => console.log('Tap Error'),
//           })
//       ),

//       mergeMap(() => {
//         console.log('333333');

//         return EMPTY;
//       })
//     )
//     .subscribe({
//       error: (err) => console.log('Error'),
//     });
// }

const first$ = of(1);
const second$ = of(2);
const third$ = of(3);

function one() {
  return from([1, 2, 3]).pipe(mergeMap((n) => of(n)));
}

function two() {
  return from([10, 20, 30]).pipe(
    mergeMap((n) => {
      console.log('>>>>', n);

      return EMPTY;
    })
  );
}

function three() {
  return from([100, 200, 300]).pipe(mergeMap((n) => of(n)));
}

function main() {
  of(numbers)
    .pipe(
      mergeMap(() => {
        return concat(one(), two(), three());
      })
    )
    .subscribe(console.log);
}

main();
