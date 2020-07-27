import {CountChars} from "./count-chars";
import {cold} from "jasmine-marbles";
import {fromEvent} from "rxjs";

describe('CountChars', () => {
    let service: CountChars;
    beforeEach(() => {
        service = new CountChars();
    });

    describe('count()', () => {

        it('should return empty observable', () => {
            // TODO: start here
        });

    });
});