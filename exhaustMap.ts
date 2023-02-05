import { from } from 'rxjs';
import { fromEvent, exhaustMap, interval, take } from 'rxjs';

console.clear();

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

// the function that you supply
// () => interval(1000).pipe(take(5))
// that function returns an (so-called "inner") observable
// source observable could be the outer observable
// projected Observable could be the resulting observable from inner and outer

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  exhaustMap(() => interval(1000).pipe(take(5)))
);
result.subscribe(x => console.log(x));