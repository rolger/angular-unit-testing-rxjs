import {EMPTY, of} from "rxjs";

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export function checkNumbers(val: string) {
    return numbers.indexOf(val) > -1 ? of(`${val}`) : EMPTY;
}