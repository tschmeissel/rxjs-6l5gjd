// RxJS v6+
import { fromEvent, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

// cold observable
// create the payload inside the observable
const coldObs$ = new Observable(subscriber => {
  subscriber.next(Math.random());
});

// each observer gets its own execution context when he subscribes
coldObs$.subscribe((x) => console.log('message from cold observable', x));
coldObs$.subscribe((x) => console.log('message from cold observable', x));

// hot observable
// create the payload outside the observable
const payload = Math.random();
const hotObs$ = new Observable(subscriber => {
  subscriber.next(payload);
});
hotObs$.subscribe((x) => console.log('message from hot observable', x));
hotObs$.subscribe((x) => console.log('message from hot observable', x));

// cold == unicast
// data is only produced if there is a subscriber
// all subscriber get their own data
// each Observer runs in its own execution context

// hot == multicast
// data is produced always, if there is no subscriber the data gets lost
// all subscriber share the same data
// all subsriber run in the same execution context