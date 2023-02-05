import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

console.clear();

const completeTap = () => {
  of(1, 2, 3).pipe(
      tap({
        next: (val) => console.log('next value from observable', val),
        error: (error) => console.error(error),
        complete: () => console.log('observable complete'),
      })
    ).subscribe(console.log);
};
completeTap();
