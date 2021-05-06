import {EMPTY, from, Observable, of, throwError} from "rxjs";
import {concatAll, filter, map, switchMap, take} from "rxjs/operators";
import {cold, hot} from "jasmine-marbles";
import {checkNumbers} from "./03_marbel";


describe('Marble testing exercises', () => {

    it('should contain a value', () => {
        const result = from(['orange']);

        // TODO: implement the expected observable
        const expected = cold('');

        expect(result).toBeObservable(expected);
    });

    it('should contain multiple values at the same timeframe', () => {
        const result = of(1, 2, 3);

        // TODO: implement the expected observable
        const expected = cold('');

        expect(result).toBeObservable(expected);
    });

    it('should compute squares more than 10', () => {
        const $result = of(4, 5, 6, 7, 4, 5)
            .pipe(
                map(value => value * value),
                filter(value => value > 10),
                take(3)
            );

        // TODO : change the expected observable
        const $expected = cold('');
        expect($result).toBeObservable($expected);
    });


    it('should compute squares more than 10 and less than 50', () => {
        const $result = of(5, 12)
            .pipe(
                map(value => value * value),
                filter(value => value > 10 && value < 50),
                take(3)
            );

        // TODO : change the expected observable
        const $expected = cold('');
        expect($result).toBeObservable($expected);
    });


    it('should test subscription on hot observable', () => {
        const provided = hot('-a-^b---c-|');

        // TODO : change the expected test result
        const expected = cold('');
        expect(provided).toBeObservable(expected);
        // TODO : add the subscription statement
        const subscription = '';
        expect(provided).toHaveSubscriptions(subscription);
    });

    it('should test to convert a hot alphabet to uppercase', () => {
        const alphabets = hot('--a--b--c--d--');
        const provided = alphabets.pipe(
            switchMap((s: string) => s.toUpperCase())
        );

        // TODO : change the expected test result
        const expected = cold('');
        expect(provided).toBeObservable(expected);
        // TODO : add the subscription statement
        const subscription = '';
        expect(alphabets).toHaveSubscriptions(subscription);
    });

    it('should concat an observable of observables', () => {
        const x = cold('    ----a------b------|                 ');
        const y = cold('                      ---c-d---|        ');
        const z = cold('                               ---e--f-|');
        const outer = hot('-x---y----z------|', {x: x, y: y, z: z});

        const result = outer.pipe(concatAll());

        // TODO : change the expected test result
        const expected = cold('');
        expect(result).toBeObservable(expected);
    });

    it('should throw an error', () => {
        const source$ = throwError('error');

        // TODO : change the expected test result
        const expected$ = cold('');
        expect(source$).toBeObservable(expected$);
    });

    it('should return values and then throw an error', () => {
        const source$ = new Observable(observer => {
            observer.next('orange');
            observer.next('apple');
            observer.error(new Error('server fruit error'));
        });

        // TODO : change the expected test result
        const expected$ = cold('');
        expect(source$).toBeObservable(expected$);
    });

    // TODO: implement more than one testcase
    it('should implement enough testcase for search', () => {
        expect(checkNumbers('')).toBeObservable(cold(''));
    });

});
