import {Country} from '../model/country';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LetterComponent} from './letter.component';
import {ShippingCostService} from '../services/shipping-cost-service';
import {CountrySearchService} from '../services/country-search-service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';

describe('LetterComponent', () => {
    let COUNTRIES: Country[];

    let stubCountrySearchService: jasmine.SpyObj<CountrySearchService>;
    let mockShippingCostService: ShippingCostService;
    let fixture: ComponentFixture<LetterComponent>;
    let component: LetterComponent;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flagUrl: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 20,
                latitude: 20
            },
            {
                name: 'Germany',
                alpha2Code: 'DE',
                flagUrl: '',
                region: 'europe',
                regionBloc: 'EU',
                longitude: 10,
                latitude: 20
            }
        ];
        stubCountrySearchService = jasmine.createSpyObj(['searchCountriesByName']);
        TestBed.configureTestingModule({
            declarations: [
                LetterComponent
            ],
            providers: [
                {provide: CountrySearchService, useValue: stubCountrySearchService},
                {provide: ShippingCostService, useValue: mockShippingCostService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(LetterComponent);
        component = fixture.componentInstance;
    });

    it('should initialize countries in component', () => {
        stubCountrySearchService.searchCountriesByName.and.returnValue(of(COUNTRIES));
        fixture.detectChanges();

        expect(component.countries).toEqual(COUNTRIES);
    });

});
