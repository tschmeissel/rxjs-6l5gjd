// observables

// observable from scratch
const observable = Rx.Observable.create(observer => {
	observer.next("hello");
	observer.next("world");
});
observable.subscribe(val => print(val));
observable.subscribe(val => print("s2" + val));

// observable from event
const clicks = Rx.Observable.fromEvent(document, "click");
clicks.subscribe(click => console.log(click));

// observable from promise
const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("resolved");
	}, 3000)
})
const obsvPromise = Rx.Observable.fromPromise(promise);
obsvPromise.subscribe(result => print(result));

// observable as timer
const timer = Rx.Observable.timer(2000);
timer.subscribe(done => print("ding!!"));

// observable as interval timer
const interval = Rx.Observable.interval(1000);
interval.subscribe(done => print(new Date().getSeconds()));

// observable of any type of data
const mashup = Rx.Observable.of("anything", ["you", "want"], 23, true, {cool: "stuff"});
mashup.subscribe(val => print(val));

