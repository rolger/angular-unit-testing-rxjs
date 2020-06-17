describe('CountrySearchService', () => {
    let COUNTRIES;

    beforeEach(() => {
        COUNTRIES = [
            {
                name: 'Austria',
                alpha2Code: 'AT',
                flag: 'austrian-flag.jpg',
                region: 'any',
                regionalBlocs: [{acronym: 'tst'}],
                latlng: [0, 1]
            },
            {
                name: 'Germany',
                alpha2Code: 'DE',
                flag: 'german-flag.jpg',
                region: 'any',
                regionalBlocs: [{acronym: 'tst'}],
                latlng: [0, 1]
            }
        ];

    });

    describe('getCountryByCountryCode()', () => {

        it('should call a http GET request with empty result', () => {

        });

        it('should filter the countryCode', () => {

        });

    });
});
