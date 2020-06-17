import {CountService} from "./count-service";
import {cold} from "jasmine-marbles";
import {fromEvent} from "rxjs";

describe('CountChars', () => {
    let service: CountService;
    beforeEach(() => {
        service = new CountService();
    });

    describe('count()', () => {

        it('should return empty observable', () => {
            let actual = service.countWithRxJs(cold('|'));
            let expected = cold('|');

            expect(actual).toBeObservable(expected);
        });

        it('should count 1 chararcter', () => {
            let actual = service.countWithRxJs(cold('-a-|'));
            let expected = cold('(--(c|))', {c: 1});

            expect(actual).toBeObservable(expected);
        });

        it('should count 2 chararcter', () => {
            let actual = service.countWithRxJs(cold('-aa|'));
            let expected = cold('(--(c|))', {c: 2});

            expect(actual).toBeObservable(expected);
        });

        it('should count 2 different chararcter', () => {
            let actual = service.countWithRxJs(cold('-ab|'));
            let expected = cold('---(cd|))', {c: 1, d: 1});

            expect(actual).toBeObservable(expected);
        });

        it('should count multiple different chararcter and sort', () => {
            let actual = service.countWithRxJs(cold('-aaba|'));
            let expected = cold('-----(cd|))', {c: 1, d: 3});

            expect(actual).toBeObservable(expected);

            fromEvent(document, 'click');
        });

    });
});