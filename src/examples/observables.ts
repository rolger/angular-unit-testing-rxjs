const { Observable } = require('rxjs');

// explaining the pull principle
var producerWithPull = {
    pullData(i) {
        let d = [10, 20, 30, 40];
        return d[i];
    }
};

let consumerWithPull = {
    sum(producer) {
        let sum = 0;
        sum += producer.pullData(0);
        sum += producer.pullData(1);
        sum += producer.pullData(2);
        sum += producer.pullData(3);
        return sum;
    }
};

console.log(consumerWithPull.sum(producerWithPull));

// explaining the push principle
var producerWithPush = {
    pushData(consumer) {
        consumer.receive(10);
        consumer.receive(20);
        consumer.receive(30);
        consumer.receive(40);
    }
};

let consumerWithPush = {
    sum: 0,
    receive(value) {
        this.sum += value;
    }
};

producerWithPush.pushData(consumerWithPush);
console.log(consumerWithPush.sum);

// compare calling a function with subcribe()
function foo() {
    console.log('Hello');
    return 42;
}

const x = foo();
console.log(x);
const y = foo();
console.log(y);

const fooObservable = new Observable(subscriber => {
    console.log('Hello');
    subscriber.next(42);
});

fooObservable.subscribe(x => {
    console.log(x);
});
fooObservable.subscribe(y => {
    console.log(y);
});


let observabel = new Observable (observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
});

observabel.subscribe({ next: data => console.log(data) });

// implement an observable from scratch
function myObservableFunction(observer) {
    observer.next(1);
    observer.next(2);

    return () => {
        console.log("destroying");
    };
};

let result = myObservableFunction({ next: data => console.log(data) });
result();
