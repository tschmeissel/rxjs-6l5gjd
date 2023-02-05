import { of } from 'rxjs';
import { combineLatestWith, zipAll, zipWith } from 'rxjs/operators';

const source1 = of(1, 2, 3);
const source2 = of('a', 'b', 'c');

of(source1, source2)
  .pipe(zipAll())
  .subscribe((val) => console.log(val));

of(source1, source2)
  .pipe(zipAll(), zipWith(of('x', 'y', 'z')))
  .subscribe((val) => console.log(val));

of(source1, source2)
  .pipe(zipAll(), combineLatestWith(of('x', 'y', 'z')))
  .subscribe((val) => console.log(val));

const source3 = of('x', 'y', 'z');
of(source1)
  .pipe(zipWith(source2), zipWith(source3))
  .subscribe((val) => console.log(val));
