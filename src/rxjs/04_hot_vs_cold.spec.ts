import {cold, hot} from "jasmine-marbles";
import {concatAll, switchMap} from "rxjs/operators";


describe('Marble testing hot observables exercises', () => {

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

});