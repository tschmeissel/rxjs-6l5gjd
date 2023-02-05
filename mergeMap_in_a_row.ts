import { from } from 'rxjs';
import { tap, mergeMap, map, filter } from 'rxjs/operators';

console.clear();

/**
 * concurrency is not an issue as long as their is only one inner observable to merge
 */

/* from([1, 2])
  .pipe(
    filter((x) => {
      console.log('result');
      return x % 2 == 1;
    }),
    mergeMap((x) => from([3, 4]).pipe(map((y) => x + y)))
  )
  .subscribe(console.log);
 */

from([1, 2]).pipe(
  mergeMap(x => from([3]).pipe(
    map(y => x + " " + y))),
  tap(x => console.log("intermediate ", x)),
  // filter(x => x === "2 3"),
  mergeMap(x => from([5]).pipe(
    map(y => x + " " + y)))
).subscribe(console.log);

/* const deleteObjects = [1, 2];

from(deleteObjects)
  .pipe(
    mergeMap((x) => from([3]).pipe(map((y) => x + ' ' + y)), 3) // mergeMap
  )
  .subscribe(console.log);
 */