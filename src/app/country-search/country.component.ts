import {Component} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent {
    loading = false;
    countries: Country [];

    constructor(private searchService: CountrySearchService) {
        this.countries = [];
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

}
