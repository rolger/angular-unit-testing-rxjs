import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StartComponent} from "./home/start.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {CountryComponent} from "./country-search/country.component";
import {LetterComponent} from "./letter/letter.component";
import {GituserComponent} from "./gituser-suggestions/gituser.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'start', component: StartComponent},
            {path: 'country-search', component: CountryComponent},
            {path: 'gituser-suggestions', component: GituserComponent},
            {path: 'letter', component: LetterComponent},
            {path: '', redirectTo: 'start', pathMatch: 'full'},
            {path: '**', component: PageNotFoundComponent}
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
