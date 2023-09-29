// completion

const timer = Rx.Observable.timer(1000);
timer
	.finally(() => print("All done!"))
	.subscribe();
	
const interval = Rx.Observable.interval(1000)
		.finally(() => print("interval all done!"));
		
const subscription = interval.subscribe(x => print(x));
setTimeout(() => {
	subscription.unsubscribe();
}, 3000);

// operators
// map

const numbers = Rx.Observable.of(10, 100, 1000);
numbers
	.map(num => Math.log(num))
	.subscribe(x => print(x));
	
const jsonString = '{"type": "Dog", "breed": "Pug"}'
const apiCall = Rx.Observable.of(jsonString);

apiCall
	.map(json => JSON.parse(json))
	.subscribe(obj => {
		print(obj.type)
		print(obj.breed)
	})
	
// do

const names = Rx.Observable.of("Simon", "Garfunkel");
names
	.do(name => print(name))
	.map(name => name.toUpperCase())
	.do(name => print(name))
	.subscribe();

// filter, first, last

const unfiltered = Rx.Observable.of(-3, 5, 7, 2, -7, 9, -2);
unfiltered
	.filter(n => n>=0)
	.subscribe(n => print(n));
	
unfiltered
	.first()
	.subscribe(n => print(n));
	
unfiltered
	.last()
	.subscribe(n => print(n));
	
// throttle, debounct

// scan its like the reduce function

// takeUntil can complete an observable based of a value from another observable

// takeWhile will emit values from an observable until a certain condition becomes true

// zip can combine observables

// forkJoin is useful if you have a bunch of api call and you want to wait for all of them to resolve

// catch to get errors happening while an observable is operating

// retry to rerun an observable in case of an error