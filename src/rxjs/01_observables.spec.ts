import {from, Observable, of} from "rxjs";

function subscribeToObserver(observable: Observable<unknown>) {
    let result = '';
    observable.subscribe({
        next(data) {
            if (data === 4711)
                throw new Error('4711');

            result += 'value: ' + data + ';';
        },
        error(err) {
            result += 'error code: ' + err;
        },
        complete() {
            result += 'done';
        }
    });
    return result;
}

describe('RxJs and observable exercises', () => {

    it('should create an empty Observable', () => {
        const observable = new Observable(observer => {
            observer.complete()
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('done');
    });

    it('should create an Observable with values', () => {
        const observable = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.complete();
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 1;value: 2;done');
    });

    it('should create an Observable with error code', () => {
        const observable = new Observable(observer => {
            observer.next(201);
            observer.error(4711);
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 201;error code: 4711');
    });

    it('should create an Observable with throwing error code', () => {
        const observable = new Observable(observer => {
            observer.next(201);
            observer.error(new Error('4711'));
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 201;error code: Error: 4711');
    });

    it('should be created with rxjs factory methods', () => {
        const observable = of(1, 2);

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 1;value: 2;done');
    });

    it('should emit an array with rxjs factory methods', () => {
        // TODO: change to fix the test
        const observable = of([1, 2]);

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 1,2;done');
    });

    it('should receive the last event', () => {
        let received = '';
        from(['foo', 'bar']).subscribe(x => received = x);

        // TODO: change to fix the test
        expect(received).toEqual('bar');
    });

    it('should not receive last value', () => {
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            subscriber.complete();
            subscriber.next(4);
        });

        let received;
        observable.subscribe(value => received = value);

        // TODO: change to fix the test
        // expect(received).toEqual('4 ?');
    });

    it('should add and count', () => {
        let result = {
            sum: 0,
            count: 0
        };

        // TODO: change to fix the test
        from([10, 8, 2, 1]).subscribe(num => {
            result.sum += num;
            result.count++;
        });

        expect(result.sum).toEqual(21);
        expect(result.count).toEqual(4);
    });

});