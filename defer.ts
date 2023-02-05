// RxJS v6+
import { fromEvent, of, interval, defer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

console.clear();

/**
 * The defer function.
 * 
 * Notice the subtle distiction between the builtin mechanism that an observer receives notifications right
 * after it subscribed to an observable and the defer conecpt.
 * Defer creates an observable that that calls a observable factory only when subscribed to the observable
 * from defer().
 * The observable factory is implemented as the return value.
 */
const clicksOrInterval = defer(() => {
  return Math.random() > 0.5
    ? fromEvent(document, 'click')
    : interval(1000);
});
clicksOrInterval.subscribe(x => console.log(x));