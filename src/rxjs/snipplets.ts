import {interval} from "rxjs";
import {cold, getTestScheduler} from "jasmine-marbles";
import {SchedulerLike} from "rxjs/src/internal/types";
import {async} from "rxjs/src/internal/scheduler/async";
import {Observable} from "rxjs/src/internal/Observable";
import {take} from "rxjs/operators";

it('it should return 3 values asap', () => {
    const source = interval(1, getTestScheduler()).pipe(take(3));

    const expected = cold('-ab(c|)', {a: 0, b: 1, c: 2});

    expect(source).toBeObservable(expected);
});

it('it should return 3 values asap', () => {
    let scheduler = getTestScheduler();
    scheduler.run(helpers => {
        const source = interval(1).pipe(take(3));

        const expected = cold('-ab(c|)', {a: 0, b: 1, c: 2});

        expect(source).toBeObservable(expected);
    });
});



it('should execute', () => {

    // the original operator call
const source = interval(1000)
    .subscribe(value => console.log('next tick ' +  value));


const scheduler = getTestScheduler();
const sourceWithScheduler = interval(1000, scheduler)
    .subscribe(value => console.log('next tick ' +  value));

});
