import {Injectable} from '@angular/core';
import {CountrySearchService} from './country-search-service';
import {Country} from '../model/country';

@Injectable()
export class CountryInformationService {
    homeBase = 'AT';
    austria: Country;

    constructor(private countryService: CountrySearchService) {
        countryService.getCountryByCountryCode(this.homeBase)
            .subscribe(countries => this.austria = countries[0]);
    }

    public isInCommonMarket(country: Country) {
        return country.regionBloc === 'EU';
    }

    public isInAmericas(country: Country) {
        return country.region === 'Americas';
    }

    public distanceTo(other: Country) {
        if (this.austria === undefined || other === undefined) {
            return 0;
        }

        return this.distBetween(this.austria.latitude, this.austria.longitude, other.latitude, other.longitude);
    }

    private distBetween(fromLatitude: number, fromLongitude: number, toLatitude: number, toLongitude: number): number {
        const earthRadius = 6371000; // meters
        const fLat: number = this.toRadians(fromLatitude);
        const toLat: number = this.toRadians(toLatitude);
        const diffLat: number = this.toRadians(toLatitude - fromLatitude);
        const diffLng: number = this.toRadians(toLongitude - fromLongitude);
        const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2)
            + Math.cos(fLat) * Math.cos(toLat) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist: number = (earthRadius * c);
        return dist;
    }

    private toRadians(value: number): number {
        return value * Math.PI / 180;
    }
}
