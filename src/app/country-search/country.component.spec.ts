import {CountryComponent} from './country.component';
import {Country} from '../model/country';
import {cold, getTestScheduler} from "jasmine-marbles";

describe('CountryComponent', () => {
    let COUNTRIES;
    let stubCountrySearchService;
    let component: CountryComponent;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flagUrl: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 0,
                latitude: 0
            } as Country
        ];
        stubCountrySearchService = jasmine.createSpyObj(['searchCountriesByName']);
        component = new CountryComponent(stubCountrySearchService);

    });

    describe('doSearch()', () => {

        it('should load all countries', () => {
            stubCountrySearchService.searchCountriesByName.and.returnValue(
                cold('c', { c: COUNTRIES})
            );

            component.doSearch('');
            getTestScheduler().flush();

            expect(component.countries).toEqual(COUNTRIES);
            expect(component.errorMessage).toEqual('');
        });

        it('should set the error message', () => {
            let httpResponse = cold('#', { }, new Error('severe error'));
            stubCountrySearchService.searchCountriesByName.and.returnValue(httpResponse);

            component.doSearch('');
            getTestScheduler().flush();

            expect(component.countries).toEqual([]);
            expect(component.errorMessage).toEqual('severe error');
        });
    });

});
