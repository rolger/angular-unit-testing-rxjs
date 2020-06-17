import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gituser} from "../model/gituser";


@Injectable()
export class GituserService {
    apiURL: string = 'https://api.github.com/users';

    gitusers$ = this.http.get<Gituser[]>(this.apiURL);

    constructor(private http: HttpClient) {
    }

}


