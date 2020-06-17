import {EMPTY, Observable} from "rxjs";
import {count, groupBy, map, mergeMap, reduce, tap, toArray} from "rxjs/operators";

export class CountService {

    countWithRxJs(input: Observable<any>) {
        return input.pipe(
            groupBy(elem => elem),
            mergeMap(group$ =>
                group$.pipe(
                    reduce((acc, cur) => [...acc, cur], [])
                )
            ),
            map(elem => elem.length),
            toArray(),
            mergeMap(elements => elements.sort((n1,n2) => n1 - n2))
        );
    }

}