// subject can have put in date without relying on some data source as with an observer

const subject = new Rx.Subject();

const subA = subject.subscribe(val => print(`Sub A: ${val}`));
const subB = subject.subscribe(val => print(`Sub B: ${val}`));

subject.next("Hello");

setTimeout(() => {
	subject.next("World");
}, 2000);

// multicast

