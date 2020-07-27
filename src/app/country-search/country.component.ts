import {Component} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {interval, Observable, Subject} from "rxjs";
import {map, startWith, switchMap, tap} from "rxjs/operators";

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent {
    loading = false;
    countries: Country [];
    private keySubject = new  Subject<string>();
    keyActions$ = this.keySubject.asObservable();
    countries$ : Observable<Country>;

    constructor(private searchService: CountrySearchService) {
        this.countries = [];

        this.keyActions$.pipe(
            startWith(''),
            tap(_ => console.log(`API CALL at ${new Date()}`))
        ).subscribe(c => console.log(c));


        this.countries$ = this.searchService.searchCountriesByName('').pipe(

        );
    }

    doSearch(searchString: string) {
        this.loading = true;
        this.searchService
            .searchCountriesByName(searchString)
            .subscribe((data) => {
                this.countries = data;
                this.loading = false;
            });
    }

    onKey(value: string) {
        this.doSearch(value);

        this.keySubject.next(value);

        const result = this.keyActions$.pipe(switchMap((ev) => {
            return interval(1000).pipe(map(f => ev + f));
        }));
        result.subscribe(x => console.log(x));

    }
}
