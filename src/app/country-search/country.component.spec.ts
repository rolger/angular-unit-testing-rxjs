import {CountryComponent} from './country.component';
import {Country} from '../model/country';
import {TestScheduler} from "rxjs/testing";

describe('Country Component Test', () => {
    let COUNTRIES: Country[];
    let stubCountrySearchService: any;
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
        it('emits after 500ms without key and calls service', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold, flush} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('c', {c: COUNTRIES})
                );

                component.ngOnInit();

                expectObservable(component.countries$).toBe('500ms c', {c: COUNTRIES});

                flush();
                expect(stubCountrySearchService.searchCountriesByName).toHaveBeenCalledWith('');
            });
        });

        it('receives key and emits after 500ms', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold, flush} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('c', {c: COUNTRIES})
                );
                component.keyActions$ = cold('a');

                component.ngOnInit();

                expectObservable(component.countries$).toBe('500ms c', {c: COUNTRIES});

                // start virtual time ...
                flush();
                expect(stubCountrySearchService.searchCountriesByName).toHaveBeenCalledWith('a');
            });
        });

        it(' after 500ms and keys', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold, flush} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('c', {c: COUNTRIES})
                );
                component.keyActions$ = cold('x 99ms y 99ms z', {
                    x: 'a',
                    y: 'au',
                    z: 'aus'
                });

                component.ngOnInit();

                expectObservable(component.countries$).toBe('700ms c', {
                    c: COUNTRIES
                });

                scheduler.flush();
                expect(stubCountrySearchService.searchCountriesByName).toHaveBeenCalledWith('aus');
            });
        });

        it(' after 600ms and keys', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold, flush} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('c', {c: COUNTRIES})
                );
                component.keyActions$ = cold('600ms a');

                component.ngOnInit();

                expectObservable(component.countries$).toBe('500ms c 599ms c', {
                    c: COUNTRIES
                });

                scheduler.flush();
                expect(stubCountrySearchService.searchCountriesByName).toHaveBeenCalledWith('a');
            });
        });


        it('after an error occurs contries are EMPTY', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(cold('#'));

                component.ngOnInit();

                expectObservable(component.countries$).toBe('-');
            });
        });

        it('after an error occurs errorMessage is set', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('#', {}, new Error('server error'))
                );

                component.ngOnInit();

                expectObservable(component.countries$).toBe('-');
                expectObservable(component.errorMessage$).toBe('500ms a', {a: 'server error'});
            });
        });

        it('after error another http returns the result again', () => {
            const scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });

            scheduler.run(helpers => {
                const {expectObservable, cold} = helpers;

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('#', {}, new Error('server error'))
                );

                component.ngOnInit();

                expectObservable(component.countries$).toBe('-');
                expectObservable(component.errorMessage$).toBe('500ms a', {a: 'server error'});

                scheduler.flush();

                stubCountrySearchService.searchCountriesByName.and.returnValue(
                    cold('c', {c: COUNTRIES})
                );
                expectObservable(component.countries$).toBe('1000ms c', {
                    c: COUNTRIES
                });
                expectObservable(component.errorMessage$).toBe('-');
            });
        });

    });

});
