import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Gituser} from '../model/gituser';
import {GituserService} from '../services/gituser-service';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-gituser',
    templateUrl: './gituser.component.html',
    styleUrls: ['./gituser.component.css']
})
export class GituserComponent {
    users$: Observable<Gituser[]> = of([
        {
            id: 1,
            login: 'Santa Claus',
            avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/1881_0101_tnast_santa_200.jpg'
        },
        {
            id: 2,
            login: 'Peter Pan',
            avatar_url: 'http://de.web.img3.acsta.net/r_640_360/newsv7/20/01/08/09/47/3071302.jpg'
        },
        {
            id: 3,
            login: 'Martin Fowler',
            avatar_url: 'https://martinfowler.com/img/mf-dallas.jpg'
        }
    ]);

    constructor(private gituserService: GituserService) {
    }

    refresh() {
        this.users$ = this.gituserService.gitusers$
            .pipe(
                tap(data => console.log('loaded github users', data.length))
            );
    }

    close(id: number) {
        console.log('replacing user ' + id);
    }

}
