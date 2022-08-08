import {Component, OnDestroy} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnDestroy {
    loading = false;
    errorMessage: string;
    countries: Country [];
    private sub: Subscription;

    constructor(private searchService: CountrySearchService) {
        this.countries = [];
    }

    doSearch(searchString: string) {
        this.loading = true;
        this.sub = this.searchService
            .searchCountriesByName(searchString)
            .subscribe(
                data => {
                    this.countries = data;
                    this.errorMessage = '';
                    this.loading = false;
                },
                error => {
                    this.countries = [];
                    this.errorMessage = error.message;
                    this.loading = false;
                }
            );
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}
