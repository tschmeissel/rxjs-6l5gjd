import { Observable, timer, fromEvent, of, from, interval, map } from 'rxjs';
import { switchMap, tap, delay } from 'rxjs/operators';

console.clear();

/**
 * switchMap is an transformation operator
 * there is an outer and inner observable
 * the emission of an value from the outer observable triggers the creation of inner observable
 * each creation of an inner observable cancels a the former inner observable
 * after being triggered the inner observable starts to emit values
 * the uniqueness comes from cancellation
 * Classic use cases
 *  is autocompletion aka typeahead. Each time a user inputs a
 *   value a new backend request is triggered and the former gets canceled
 *  when you need a user id before you can start something
 */

/**
 * Basic switchMap example
 * Will only log the output from the inner observable tiggered by the last outer value
 * because the 2 observables before get canceled by delaying.
 */
const basicSwitchMap = () => {
  of(1, 2, 3)
    .pipe(
      switchMap((x) =>
        of(4, 5, 6).pipe(
          delay(2000),
          map((y) => x + ' ' + y)
        )
      )
    )
    .subscribe(console.log);
};
//basicSwitchMap();

/**
 * switchMap merges input events from two different sources
 */
const switchUserInput = () => {
  var input1 = document.querySelector('#input1');
  var input2 = document.querySelector('#input2');

  var obs1$: Observable<InputEvent> = fromEvent<InputEvent>(input1, 'input');
  var obs2$: Observable<InputEvent> = fromEvent<InputEvent>(input2, 'input');

  obs1$
    .pipe(
      tap((val) => console.log('next value from outer observable', val)),
      switchMap((event1: InputEvent) =>
        obs2$.pipe(
          tap((val) => console.log('next value from inner observable', val)),
          map(
            (event2: InputEvent) =>
              (event1.target as HTMLInputElement).value +
              ' ' +
              (event2.target as HTMLInputElement).value
          )
        )
      )
    )
    .subscribe((x) => console.log(x));
};
//switchUserInput();

/**
 * Restart an interval Observable on every click event
 */
const restartInnerObservalbe = () => {
  const clicks = fromEvent(document, 'click');
  clicks.pipe(switchMap((event) => interval(1000))).subscribe(console.log);
};
//restartInnerObservalbe();

/**
 * switchMap merges an interval with the most recent source value
 */
const mergeMostRecentSourceValue = () => {
  const letters = of('a', 'b', 'c');
  letters
    .pipe(
      switchMap((x, index) =>
        interval(1000).pipe(map((i) => `${x} index ${index} ${i} `))
      )
    )
    .subscribe((x) => console.log(x));
};
//mergeMostRecentSourceValue();

/**
 * Generate new Observable according to source Observable values
 */
const generateNewObservableBasedOnSourceObservable = () => {
  const switched = of(1, 2, 3).pipe(switchMap((x) => of(x, x ** 2, x ** 3)));
  switched.subscribe((x) => console.log(x));
};
//generateNewObservableBasedOnSourceObservable();

/**
 * Creates the inner observable from the value of the outer observable.
 * Just a chain but nothing really switched here, because its only a
 * single source. Only two source might be switched.
 */
const switchOuterToInner = () => {
  of('a', 'b', 'c')
    .pipe(
      switchMap((x, index) => of(`x: ${x}, i: ${index}`).pipe(map((i) => i)))
      // switchMap((x, index) => of(`x: ${x}, i: ${index}`))
      // switchMap((x, index) => interval(1000).pipe(map(i => `${x}`)))
    )
    .subscribe((x) => console.log(x));
};
//switchOuterToInner();
