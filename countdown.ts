/**
 * Es wird auf Mausklick bis null heruntergezählt. Jeder Zählschritt wird ausgegeben.
 * Es wird die Funktion merge und nicht der Operator mergeWith verwendet.
 */
import { EMPTY, Observable, fromEvent, of, from, interval, map, merge } from 'rxjs';
import {
  tap,
  scan,
  takeWhile,
  startWith,
  mergeWith,
  switchMap
} from 'rxjs/operators';

console.clear();

const COUNTDOWN_SECONDS = 10;

var resumeButton = document.getElementById('resume');
var pauseButton = document.getElementById('pause');

// gibt im Intervall von 1 s immer den Wert -1 aus
const interval$ = interval(1000).pipe(map((_) => -1));
// gibt ein false eingepackt in einem Observable zurück
var pause$ = fromEvent(pauseButton, 'click').pipe(map(() => false));
var resume$ = fromEvent(resumeButton, 'click').pipe(map(() => true));

const timer$ = merge(pause$, resume$);
timer$.pipe(
  // alle Quellobservables in eins packen
  mergeWith(pause$, resume$),
  startWith(true),
  switchMap((val) => (val ? interval$ : EMPTY)),
  // tap(val => console.log(val)),
  // reduces acc by -1 from interval in each run
  scan((acc, curr) => {
    // console.log("acc, curr", acc, curr)
    return (curr ? curr + acc : acc)
  }, COUNTDOWN_SECONDS),
  takeWhile((v) => v >= 0)
).subscribe(console.log);
