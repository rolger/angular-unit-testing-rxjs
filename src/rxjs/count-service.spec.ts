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
            // TODO: start here
        });

    });
});