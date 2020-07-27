import {CountryComponent} from './country.component';
import {Country} from '../model/country';
import {TestScheduler} from "rxjs/testing";

describe('Country Component Test', () => {
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

    describe('emitting countries observerable', () => {
        it('after 500ms without key', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                // asserting the two objects are equal
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable} = helpers;
                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    scheduler.createColdObservable('c', {c: COUNTRIES})
                );

                //component.keyActions$ = scheduler.createColdObservable('');
                component.ngOnInit();

                expectObservable(component.countries$).toBe('500ms c', {
                    c: COUNTRIES
                });
            });
        });

        it('a key and after 500ms', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                // asserting the two objects are equal
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable} = helpers;
                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    scheduler.createColdObservable('c', {c: COUNTRIES})
                );
                component.keyActions$ = scheduler.createColdObservable('a');
                component.ngOnInit();

                expectObservable(component.countries$).toBe('500ms c', {
                    c: COUNTRIES
                });
            });
        });

        it(' after 500ms and keys', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                // asserting the two objects are equal
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable} = helpers;
                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    scheduler.createColdObservable('c', {c: COUNTRIES})
                );

                component.keyActions$ = scheduler.createColdObservable('aus');

                component.ngOnInit();
                expectObservable(component.countries$).toBe('502ms c', {
                    c: COUNTRIES
                });

                expect(stubCountrySearchService.searchCountriesByName).toHaveBeenCalled();
            });
        });

    });

});
