import {Injectable} from '@angular/core';
import {Money} from '../model/money';
import {CountryInformationService} from './country-information.service';
import {Country} from '../model/country';
import {LetterSendService} from './letter-send-service';

@Injectable()
export class ShippingCostService {

    constructor(private countryService: CountryInformationService, private sendService: LetterSendService) {
    }

    calculateCostsAndSend(content: string, destination: Country, options: string) {
        let cost: Money;

        if (this.countryService.isInCommonMarket(destination)) {
            // flat rate in EU
            cost = new Money(5);

        } else if (this.countryService.isInAmericas(destination)) {
            // US & Canada & South American
            if (options === 'EXPRESS') {
                cost = new Money(40);
            } else {
                cost = new Money(15);
            }

        } else {
            // other countries, e.g. Asia
            const km = this.countryService.distanceTo(destination);
            cost = new Money(km).percentage(10);
        }

        this.sendService.sendTo(destination, content, cost);
    }
}
