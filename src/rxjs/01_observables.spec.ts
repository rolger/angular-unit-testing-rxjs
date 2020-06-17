import {EMPTY, from, fromEvent, interval, Observable, of, Subject} from "rxjs";
import {EventEmitter} from "@angular/core";
import {take} from "rxjs/operators";

function subscribeToObserver(observable) {
    let result = '';
    observable.subscribe({
        next(data) {
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

describe('Observable', () => {

    it('should create an empty Observable', () => {
        const observable = new Observable(observer => {
            // TODO: add the missing calls
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('done');
    });

    it('should create an Observable with values', () => {
        const observable = new Observable(observer => {
            // TODO: add the missing calls
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 1;value: 2;done');
    });

    it('should create an Observable with error code', () => {
        const observable = new Observable(observer => {
            // TODO: add the missing calls
        });

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value: 201;error code: 4711');
    });

    it('should be created with rxjs factory methods', () => {
        // TODO: change to fix the test
        const observable = EMPTY;

        let result = subscribeToObserver(observable);

        expect(result).toEqual('value 1;value 2;done');
    });

    it('should receive the last event', () => {
        let received = '';
        from(['foo', 'bar']).subscribe(x => received = x);

        // TODO: change to fix the test
        expect(received).toEqual('?');
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
        expect(received).toEqual('4 ?');
    });

    it('should add and count', () => {
        let result = {
            sum: 0,
            count: 0
        };

        // TODO: change to fix the test
        from([]).subscribe(num => {
            result.sum += num;
        });

        expect(result.sum).toEqual(21);
        expect(result.count).toEqual(4);
    });

});