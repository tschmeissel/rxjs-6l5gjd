import { Observable, fromEvent, interval, of, from, throwError } from 'rxjs';
import {
  switchMap,
  mergeMap,
  delay,
  map,
  tap,
  take,
  repeat,
  catchError,
} from 'rxjs/operators';

console.clear();

/**
 * mergeMap takes an outer observable and merges it with an inner observable.
 * Concurrency is not an issue as long as their is only one inner observable to merge.
 * Each run does an async and subscribe, and emits a stream of responses.
 * The order is in contrast to concatMap not preserverd.
 * It is an transformation operator.
 * Allows more than one inner subscriptions to be active at the same time which may cause memory leaks with long living subscription.
 * One major use case is to merge the response from several requests which should not be canceled.
 * flatMap is an alias to mergeMap.
 * Best use to flatten an inner observable.
 * Collects all individual observables and returns all observables in a single array without caring about the order.
 * mergeMap works asynchronously.
 * So the inner observable triggers the merge process.
 * mergeMap, switchMap, concatMap and exhaustMap in rxjs
 * https://stackoverflow.com/questions/49698640/flatmap-mergemap-switchmap-and-concatmap-in-rxjs
 */

/** 
 * Simple example where input from two observables get merged.
 */
// from([1, 2]).pipe(
//   mergeMap(x => from([3, 4]).pipe(
//     map((y) => `${x} ${y}`))
//   )
// ).subscribe(console.log);

/**
 * Add filtering to above example
 */
// from([1, 2])
//   .pipe(
//     filter((x) => {
//       console.log('result');
//       return x % 2 == 1;
//     }),
//     mergeMap((x) => from([3, 4]).pipe(map((y) => x + y)))
//   )
//   .subscribe(console.log);

/**
 * Add tap'ing to above example.
 */
// from([1, 2]).pipe(
//   mergeMap(x => from([3]).pipe(
//     map(y => x + " " + y))),
//   tap(x => console.log("intermediate ", x)),
//   // filter(x => x === "2 3"),
//   mergeMap(x => from([5]).pipe(
//     map(y => x + " " + y)))
// ).subscribe(console.log);

/**
 * This recipe demonstrates polling an HTTP endpoint using repeat. It waits for 3 seconds
 * following the response to poll again. Code below is simplifed to demonstrate bare bones
 * of solution but link below contains verbose logging and error handling.
 */
// let requestCount = 1;
// const produceResponse = () =>
//   requestCount++ % 3 === 0 ? throwError('sad face') : of(new Date());

// const fakeDelayedRequest = () => produceResponse().pipe(delay(1000));

// const write = (response) => {
//   if (response) {
//     console.log(`RESPONSE IS: ${response}`);
//     document.open();
//     document.write(response);
//   }
// };

// const poll = of({}).pipe(
//   mergeMap((_) =>
//     fakeDelayedRequest().pipe(
//       catchError((e) => {
//         console.error(e);
//         return of(false);
//       })
//     )
//   ),
//   tap(write),
//   tap((_) => console.info('---waiting 3 secs to restart polling')),
//   delay(3000),
//   tap((_) => console.info('---restarted polling')),
//   repeat()
// );

// poll.subscribe();

/**
 * mergeMap with concurrent value
 */
// emit value every 1s
// const source$ = interval(1000);

// source$
//   .pipe(
//     mergeMap(
//       // project
//       (val) => interval(5000).pipe(take(2)),
//       // resultSelector
//       (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
//       // concurrent
//       2
//     ) // mergeMap
//   ) // pipe
//   /*
// 		Output:
// 		[0, 0, 0, 0] <--1st inner observable
// 		[1, 1, 0, 0] <--2nd inner observable
// 		[0, 0, 1, 1] <--1st inner observable
// 		[1, 1, 1, 1] <--2nd inner observable
// 		[2, 2, 0, 0] <--3rd inner observable
// 		[3, 3, 0, 0] <--4th inner observable
// */
//   .subscribe((val) => console.log(val));

/**
 * mergeMap with ajax observable
 */
// // free api url
// const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// // streams
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//     /*
//      * Using mergeMap for example, but generally for GET requests
//      * you will prefer switchMap.
//      * Also, if you do not need the parameter like
//      * below you could use mergeMapTo instead.
//      * ex. mergeMapTo(ajax.getJSON(API_URL))
//      */
//     mergeMap(() => ajax.getJSON(API_URL))
//   )
//   // { userId: 1, id: 1, ...}
//   .subscribe(console.log);

/**
 * mergeMap simulating save of click locations
 */
// faking network request for save
// const saveLocation = (location) => {
//   return of(location).pipe(delay(500));
// };
// // streams
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//   mergeMap((e: MouseEvent) => {
//     return saveLocation({
//       x: e.clientX,
//       y: e.clientY,
//       timestamp: Date.now(),
//     });
//   })
// ).subscribe((r) => console.log('Saved!', r));

/**
 * mergeMap merges input events from two different sources
 */
// var input1 = document.querySelector('#input1');
// var input2 = document.querySelector('#input2');

// var obs1$: Observable<InputEvent> = fromEvent<InputEvent>(input1, 'input');
// var obs2$: Observable<InputEvent> = fromEvent<InputEvent>(input2, 'input');

// obs1$
//   .pipe(
//     tap((x) => console.log(x)),
//     mergeMap((event1: InputEvent) =>
//       obs2$.pipe(
//         map(
//           (event2: InputEvent) =>
//             (event1.target as HTMLInputElement).value +
//             ' ' +
//             (event2.target as HTMLInputElement).value
//         )
//       )
//     )
//   )
//   .subscribe((x) => console.log(x));

/**
 * mergeMap merges an interval with a block of data
 */
// const letters = of('a', 'b', 'c');
// const result = letters.pipe(
//   // switchMap((x) => interval(1000).pipe(map((i) => x + i)))
//   mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
// );

// result.subscribe((x) => console.log(x));
