import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';

console.clear();

const takeFourNumbers$ = interval(1000).pipe(take(5));

let percent = 0;
takeFourNumbers$.subscribe((_) => console.log(`percent ${(percent += 20)}`));

console.log(`timer start`);
const timer$ = timer(5000);
timer$.subscribe(_ => console.log(`timer end`));