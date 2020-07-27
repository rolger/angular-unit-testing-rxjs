import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, timer} from "rxjs";
import {mapTo, scan, startWith, switchMap, takeUntil, takeWhile} from "rxjs/operators";

@Component({
  selector: 'number-tracker',
  templateUrl: './number-tracker.component.html',
})
export class NumberTrackerComponent implements OnDestroy {
  @Input() countInterval = 20;
  public currentNumber = 0;
  private _counterSub$ = new Subject();
  private _onDestroy$ = new Subject();

  constructor() {
    this._counterSub$
        .pipe(
            switchMap(endRange => {
              return timer(0, this.countInterval).pipe(
                  mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
                  startWith(this.currentNumber),
                  scan((acc: number, curr: number) => acc + curr),
                  takeWhile(this.isApproachingRange(endRange, this.currentNumber))
              )
            }),
            takeUntil(this._onDestroy$)
        )
        .subscribe((val: number) => this.currentNumber = val);
  }

  private positiveOrNegative(endRange, currentNumber) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange, currentNumber) {
    return endRange > currentNumber
        ? val => val <= endRange
        : val => val >= endRange;
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onChange(value: string) {
    this._counterSub$.next(+value);
  }
}