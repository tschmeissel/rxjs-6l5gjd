# rxjs-6l5gjd

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-6l5gjd)

API DOC
 https://rxjs.dev/api
 https://rxjs-dev.firebaseapp.com/api

https://fireship.io/lessons/rxjs-basic-pro-tips/
reactivex.io
 http://reactivex.io/rxjs/manual/overview.html
learnrxjs.io

Fragen und Antworten
 Wie kann ich die Version von RxJS abfragen?
  import * as pkg from 'rxjs/package.json';
  console.log("RxJS.version", pkg.version)
 
Done 
 http://reactivex.io/documentation/observable.html
  “Hot” and “Cold” Observables
 https://www.learnrxjs.io/learn-rxjs/recipes/type-ahead

Observable Verarbeitungskette der Events debuggen
 tap(val => console.log(val)
 do(val => console.log(val)
 console.log() in operator functions

Major concepts of RxJS
 3 Haupkonzepte von RxJS
  laziness
  functional composition
  push
 Observer können transformiert werden
 observer subscribes to an Observable
 Unterschied zwischen promises and observables
  promises ask and wait for a result
  observables push a result at any time to the subscribers
 like a Promise that can resolve over and over again
 RxJS arbeitet asynchron
 Operatoren durchlaufen einen Lebenszyklus
  begin - stream - complete
 hot Observables start emit items right after creation
  observer can subscribe at any time and received item from then on
  can have multiple subscriptions
 cold Observables wait until an oberserver subscribes
  can have only one subscription
  the callback function is executed for each subscription
  Observables are cold initially in oposite to Subject and BehaviourSubject
 use Subject or BehaviourSubject instead of making a cold obersable hot
  Subject is actually an hot observable
 Calling subscribe a second time creates a new observer
 Man kann seine eigene Observer schreiben und mit next() Werte an die subscriber ausgeben.
  Oder man verwendet eine der vielen helper function wie of(...), from(...), fromEvent(...) usw.
 backpressure
  if an observable emits more values than are actually needed
 
 Operators can be grouped into common categories
  Erzeugungsoperatoren
   aus so ziemlich allem bzw. jede Datenquelle kann ein observable stream erzeugt werden
  Kombinierungsoperatoren
   Informationen von mehreren Operatoren können zusammengefasst werden.
  Fehlerbehandlungsoperatoren
   catchError ist der Klassiker
  Filteroperatoren
   debounceTime, distinctUntilChanged, filter, take, takeUntil
  Multicastoperatoren
   mehrere Abonennten erhalten die selbe Nachricht aus einer Quelle
  Transformierungsoperatoren
   wandelt Werte zwischen Quelle und Ziel um

 Operatoren können nach gemeinsamen Verhalten eingeteilt werden in Operatoren die
  flachklopfen (flatten)
  umschalten (switch)
   diese Operatoren schalten den aktiven Observable aus und wechseln zu einem anderen Observable.
    z.B. switchAll, switchMap, switchMapTo
  zusammenfügen (concat)
   setzt mehrere Observables in Reihe und arbeitet sie sequentiell ab
   z.B. concat concatAll
  zusammenführen (merge)
   mehrere Observable werden zusammengeführt wie auf einer Autobahnauffahrt.
   die Abarbeitung erfolgt nach dem Müllerprinzip
   z.B. merge, mergeMap, mergeMapTo and mergeAll.

 Andere Ähnlichkeiten zwischen Operatoren
  Um Oberservables in Abhängigkeit von Bedingungen abzuarbeiten, kann man
   take, takeLast, takeWhile, takeUntil
  verwenden.

Operator Decision Tree
 https://rxjs-dev.firebaseapp.com/operator-decision-tree

Array in Observable wrappen und filter wie array funktion
 Ja, geht, aber for filter kommt ein pipe().
 Man kann Operatoren nicht einfach an ein Observable hängen. Man muss sie mit pipe verknüpfen.
 pipe gibts auch in einer standalone version
 https://www.concretepage.com/angular/angular-observable-pipe
 Liefert ein Observable zurück.

Unterschied of und from
 of reicht seine Daten in einem Stück durch an den subscriber
 from
  iteriert darüber, wenn es sich z.B. um ein array handelt
  akzeptiert auch ein promise

forkJoin (wait on multiple http requests - return an array of responses in preserved order when all are done)
