import {Component, OnInit} from '@angular/core';

import {Country} from '../model/country';
import {CountrySearchService} from '../services/country-search-service';
import {ShippingCostService} from '../services/shipping-cost-service';


@Component({
    selector: 'app-letter',
    templateUrl: './letter.component.html',
    styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
    countries: Country [];

    content: string;
    selectedDestination: Country | undefined;
    isExpressMode: boolean;

    message: any;

    constructor(private searchService: CountrySearchService, private deliveryService: ShippingCostService) {
        this.countries = [];
        this.selectedDestination = undefined;
        this.content = '';
        this.isExpressMode = false;
    }

    ngOnInit() {
        this.loadCountries();
    }

    loadCountries() {
        this.searchService
            .searchCountriesByName('')
            .subscribe((data) => {
                this.countries = data;
            });
    }

    send() {
        if (this.inputIsInvalid()) {
            return;
        }

        this.sendLetter();
        this.clearInput();
        this.displaySuccess();
    }

    private inputIsInvalid() {
        if (this.content == '') {
            this.message = {type: 'error', text: 'You must enter a text.'};
            return true;
        }
        if (this.selectedDestination == null) {
            this.message = {type: 'error', text: 'You must select a destination.'};
            return true;
        }
        return false;
    }

    private sendLetter() {
        this.deliveryService.calculateCostsAndSend(this.content, this.selectedDestination as Country,
            this.isExpressMode ? 'EXPRESS' : 'Normal');
    }

    private clearInput() {
        this.content = '';
        this.isExpressMode = false;
        this.selectedDestination = undefined;
    }

    private displaySuccess() {
        this.message = {type: 'success', text: 'Your letter has been sent.'};
        setTimeout(() => {
            this.message = undefined;
        }, 2000);
    }

}
