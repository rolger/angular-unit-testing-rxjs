import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {BehaviorSubject, EMPTY, Observable, Subject} from "rxjs";
import {catchError, debounceTime, startWith, switchMap} from "rxjs/operators";

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit {
    private keySubject = new BehaviorSubject<string>('');
    keyActions$ = this.keySubject.asObservable();

    private errorMessageSubject = new Subject<string>();
    errorMessage$ = this.errorMessageSubject.asObservable();

    countries$: Observable<Country[]>;

    constructor(private searchService: CountrySearchService) {
    }

    ngOnInit(): void {
        this.countries$ = this.keyActions$.pipe(
            startWith(''),
            debounceTime(500),
            switchMap(searchString => this.searchService.searchCountriesByName(searchString).pipe(
                catchError(err => {
                    this.errorMessageSubject.next(err.message);
                    return EMPTY;
                })
            ))
        );
    }

    onKey(value: string) {
        this.keySubject.next(value);
        this.errorMessageSubject.next('');
    }

}
