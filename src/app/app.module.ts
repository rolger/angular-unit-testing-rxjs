import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {StartComponent} from './home/start.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {CountryComponent} from './country-search/country.component';
import {CountrySearchService} from './services/country-search-service';
import {ShippingCostService} from './services/shipping-cost-service';
import {CountryInformationService} from './services/country-information.service';
import {LetterSendService} from './services/letter-send-service';
import {LetterComponent} from './letter/letter.component';
import {FormsModule} from '@angular/forms';
import {GituserComponent} from './gituser-suggestions/gituser.component';
import {GituserService} from './services/gituser-service';

@NgModule({
    imports: [BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        StartComponent,
        PageNotFoundComponent,
        CountryComponent,
        GituserComponent,
        LetterComponent
    ],
    bootstrap: [AppComponent],
    providers: [CountrySearchService, ShippingCostService, CountryInformationService, LetterSendService, GituserService]
})
export class AppModule {
}

