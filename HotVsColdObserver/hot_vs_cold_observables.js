// hot vs. cold observables

const cold = Rx.Observable.create(observer => {
	observer.next(Math.random());
});

cold.subscribe(a => print(`Subscriber A: ${a}`));
cold.subscribe(b => print(`Subscriber B: ${b}`));

const v = Math.random();
const hot = Rx.Observable.create(observer => {
	observer.next(v);
});
hot.subscribe(a => print(`Subscriber A: ${a}`));
hot.subscribe(b => print(`Subscriber B: ${b}`));

//

const cold2 = Rx.Observable.create(observer => {
	observer.next(Math.random());
});

const hot2 = cold2.publish();
hot2.subscribe(a => print(`Subscriber A: ${a}`));
hot2.subscribe(b => print(`Subscriber B: ${b}`));
hot2.connect();
