import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, debounceTime, startWith, switchMap, tap} from "rxjs/operators";

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit {
    private keySubject = new BehaviorSubject<string>('');

    keyActions$ = this.keySubject.asObservable();
    countries$: Observable<Country[]>;

    constructor(private searchService: CountrySearchService) {
    }

    ngOnInit(): void {
        this.countries$ = this.keyActions$.pipe(
            startWith(''),
            tap(c => console.log(this.printTimestamp() + " received " + c)),
            debounceTime(500),
            switchMap(searchString => this.searchService.searchCountriesByName(searchString)),
            catchError(err => {
                console.log(err.message);
                return of([]);
            }),
            tap(c => console.log(this.printTimestamp() + " emitted response"))
        );
    }

    private printTimestamp() {
        let now = new Date();
        return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds();
    }

    onKey(value: string) {
        this.keySubject.next(value);
    }

}
