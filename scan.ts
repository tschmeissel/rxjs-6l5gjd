import { fromEvent, scan } from 'rxjs';

console.clear();

fromEvent(document, 'click')
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`Clicked ${count} times`));
