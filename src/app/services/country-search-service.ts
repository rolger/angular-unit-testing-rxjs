import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Country} from '../model/country';
import {Observable} from 'rxjs/internal/Observable';
import {map, tap} from 'rxjs/operators';


interface RestRegionalBlocs {
    acronym: string;
    name: string;
}

interface RestCountry {
    name: string;
    alpha2Code: string;
    capital?: string;
    region: string;
    subregion: string;
    flag: string;
    regionBloc: string;
    latlng?: number[];
    regionalBlocs?: RestRegionalBlocs[];
}

@Injectable()
export class CountrySearchService {
    apiURL = 'https://restcountries.com/v2/all';

    constructor(private http: HttpClient) {
    }

    public getCountryByCountryCode(countryCode: string): Observable<Country[]> {
        return this.http.get<RestCountry[]>(this.apiURL)
            .pipe(
                map(countryArray => {
                    return countryArray
                        .filter(item => item.alpha2Code === countryCode)
                        .map(item => this.toCountry(item));
                })
            );
    }

    public searchCountriesByName(searchString: string): Observable<Country[]> {
        return this.http.get<RestCountry[]>(this.apiURL)
            .pipe(
                tap(c => console.log('loading ' + c.length + ' elements via http.')),
                tap(_ => {
                    const now: Date = new Date();
                    if (now.getSeconds() % 11 === 0) {
                        throw new Error('Service unavailable!');
                    }
                }),
                map(countryArray => {
                    return countryArray
                        .filter(item => item.name.toLowerCase().search(searchString) >= 0)
                        .map(item => this.toCountry(item));
                })
            );
    }

    private toCountry(item: RestCountry) {
        return {
            name: item.name,
            alpha2Code: item.alpha2Code,
            flagUrl: item.flag,
            region: item.region,
            regionBloc: item.regionalBlocs === undefined || item.regionalBlocs.length === 0 ?
                '' : item.regionalBlocs[0].acronym,
            latitude: item.latlng === undefined ? 0 : item.latlng[0],
            longitude: item.latlng === undefined ? 0 : item.latlng[1]
        };
    }

}


