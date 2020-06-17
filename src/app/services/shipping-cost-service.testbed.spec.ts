import {Country} from '../model/country';
import {ShippingCostService} from './shipping-cost-service';
import {LetterSendService} from './letter-send-service';
import {CountryInformationService} from './country-information.service';
import {Money} from '../model/money';
import {TestBed} from '@angular/core/testing';
import anything = jasmine.anything;

describe('ShippingCostService', () => {
    let stubCountryService: jasmine.SpyObj<CountryInformationService>;
    let mockSendService: jasmine.SpyObj<LetterSendService>;
    let service: ShippingCostService;

    beforeEach(() => {
        stubCountryService = jasmine.createSpyObj(['isInCommonMarket', 'isInAmericas', 'distanceTo']);
        mockSendService = jasmine.createSpyObj<LetterSendService>(['sendTo']);

        TestBed.configureTestingModule({
            providers: [
                ShippingCostService,
                {provide: CountryInformationService, useValue: stubCountryService},
                {provide: LetterSendService, useValue: mockSendService}
            ],
        });
        service = TestBed.get(ShippingCostService);
    });

    describe('calculateCostsAndSend()', () => {
        it('should calculate costs for common market', () => {
            stubCountryService.isInCommonMarket.and.returnValue(true);

            service.calculateCostsAndSend('', 'mockCountry' as unknown as Country, '');

            expect(mockSendService.sendTo).toHaveBeenCalledWith(anything(), anything(), new Money(5));
        });

        it('should calculate costs for america', () => {
            stubCountryService.isInCommonMarket.and.returnValue(false);
            stubCountryService.isInAmericas.and.returnValue(true);

            service.calculateCostsAndSend('', 'mockCountry' as unknown as Country, '');

            expect(mockSendService.sendTo).toHaveBeenCalledWith('mockCountry', '', new Money(15));
        });

        it('should pass the country to the send service correctly', () => {
            stubCountryService.isInCommonMarket.and.returnValue(true);

            service.calculateCostsAndSend('', 'mockCountry' as unknown as Country, '');

            expect(mockSendService.sendTo).toHaveBeenCalledWith('mockCountry', anything(), anything());
        });
    });

});
