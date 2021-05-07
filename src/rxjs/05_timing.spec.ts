import {interval} from "rxjs";
import {cold, getTestScheduler} from "jasmine-marbles";
import {delay, filter, take} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

describe('Marble testing exercise with timing', () => {

    it('it should return the result asap', () => {
        // TODO: what's going on? fix test code to change asynchronous result into synchronous - use TestSchulder
        const source = interval(20)
            .pipe(
                take(10),
                filter(x => x % 2 === 0),
            );

        // TODO: fix the expected timeframes
        const expected = cold('abcde|', {a: 0, b: 2, c: 4, d: 6, e: 8});

        expect(source).toBeObservable(expected);
    });

    it('should wait 20 frames before receive the value passing TestScheduler', () => {
        const source = of('a').pipe(
            // TODO: implement a delay with TestScheduler
        );
        const expected = cold('--(a|)');

        expect(source).toBeObservable(expected);
    });

    it('should wait 20 frames before receive the value with TestSchulder run() method', () => {
        const source = of('a').pipe(
            // TODO: implement a delay
            delay(20)
        );
        const expected = cold('--------------------(a|)');

        expect(source).toBeObservable(expected);
    });

});