import {from, of, zip} from "rxjs";
import {distinct, filter, map, max, mergeMap, reduce, take, tap} from "rxjs/operators";
import {cold} from "jasmine-marbles";

interface Item {
    name: string,
    price: number,
    category?: string
}

interface Shop {
    name: string,
    items: Item[]
}

interface Customer {
    name: string,
    age: number,
    budget: number
    wishList: string[]
}

describe('RxJs operator exercises', () => {
    let SHOPS: Shop[];
    let CUSTOMERS: Customer[];

    beforeEach(() => {
        CUSTOMERS = [
            {name: "Diana", age: 38, budget: 12000, wishList: ["chair", "table"]},
            {name: "Robert", age: 21, budget: 9000, wishList: ["cable", "speaker", "headphone"]},
            {name: "Steven", age: 27, budget: 2000, wishList: ["ice cream", "screwdriver", "cable", "earphone"]},
            {name: "Chris", age: 22, budget: 8000, wishList: ["small table", "plate", "fork"]},
            {name: "Andrew", age: 35, budget: 10500, wishList: ["coat", "pants"]},
            {name: "Amy", age: 34, budget: 11000, wishList: ["spinach", "onion", "eggs", "potatoes"]}
        ];

        SHOPS = [
            {
                name: "White Furniture",
                items: [
                    {name: "chair", price: 2200, category: "furniture"},
                    {name: "table", price: 5500, category: "furniture"},
                    {name: "small chair", price: 1800, category: "furniture"},
                    {name: "small table", price: 2800, category: "furniture"}
                ]
            },
            {
                name: "Dish Devices",
                items: [
                    {name: "cup", price: 380, category: "dish"},
                    {name: "plate", price: 680, category: "dish"},
                    {name: "fork", price: 210, category: "dish"},
                    {name: "spoon", price: 210, category: "dish"},
                    {name: "chopsticks", price: 180, category: "dish"}]
            },
            {
                name: "The Do It Ourselves",
                items: [
                    {name: "rope", price: 800, category: "tool"},
                    {name: "saw", price: 1400, category: "tool"},
                    {name: "table", price: 4800, category: "furniture"},
                    {name: "chair", price: 2200, category: "furniture"},
                    {name: "screwdriver", price: 600, category: "tool"}
                ]
            },
            {
                name: "Electrics",
                items: [
                    {name: "chair", price: 1600, category: "furniture"},
                    {name: "desk", price: 1800, category: "furniture"},
                    {name: "cable", price: 230},
                    {name: "speaker", price: 19000},
                    {name: "headphone", price: 8800},
                    {name: "earphone", price: 7800}
                ]
            },
            {
                name: "Amazing Apothecary",
                items: [
                    {name: "cold medicine", price: 800, category: "pharmacy"},
                    {name: "ointment", price: 500, category: "pharmacy"},
                    {name: "eye-drops", price: 600, category: "pharmacy"},
                    {name: "poultice", price: 900, category: "pharmacy"}
                ]
            },
            {
                name: "The Rapid Supermarket",
                items: [
                    {name: "spinach", price: 6.10, category: "food"},
                    {name: "ice tea", price: 5.30, category: "beverage"},
                    {name: "onion", price: 1.60, category: "food"},
                    {name: "potatoes", price: 2.90, category: "food"},
                    {name: "eggs", price: 6.90, category: "food"},
                    {name: "ice cream", price: 2.00, category: "food"},
                    {name: "crisps", price: 2.80, category: "food"},
                    {name: "beer", price: 2.50, category: "beverage"},
                    {name: "coke", price: 1.20, category: "beverage"},
                    {name: "earphone", price: 7500}
                ]
            }
        ];
    });


    it('should filter the first 3 elements', () => {
        const $someNumbers = of(9, 2, 3, 4, 5);

        const $result = $someNumbers.pipe(
            map(val => val - 2),
            take(3)
        );

        const $expected = cold('(abc|)', {a: 7, b: 0, c: 1});
        expect($result).toBeObservable($expected);
    });

    it('should find the age of all customers', () => {
        const $customers = from(CUSTOMERS);

        const $result = $customers.pipe(
            map(c => c.age)
        );

        const $expected = cold('(abcdef|)', {a: 38, b: 21, c: 27, d: 22, e: 35, f: 34});
        expect($result).toBeObservable($expected);
    });

    it('should find the rich customers (= customer who has more budget than 10000)', () => {
        const $customers = from(CUSTOMERS);

        const $result = $customers.pipe(
            filter(c => c.budget > 10000),
            map(c => c.name)
        );

        const $expected = cold('(abc|)', {a: 'Diana', b: 'Andrew', c: 'Amy'});
        expect($result).toBeObservable($expected);
    });

    it('should find the richest customers', () => {
        const $customers = from(CUSTOMERS);

        const $result = $customers.pipe(
            max((c1, c2) => c1.budget > c2.budget ? 1 : -1)
        );

        const $expected = cold('(a|)', {a: {name: "Diana", age: 38, budget: 12000, wishList: ["chair", "table"]}});
        expect($result).toBeObservable($expected);
    });

    it('looking for items customers want to buy', () => {
        const $customers = from(CUSTOMERS);

        const $wishes = $customers.pipe(
            mergeMap(c => c.wishList),
            distinct(),
            reduce((acc, cur) => acc = acc + ", " + cur)
        );

        let $expected = cold('(a|)', {
            a: 'chair, table, cable, speaker, headphone, ice cream, screwdriver, earphone, small table, plate, fork, coat, pants, spinach, onion, eggs, potatoes'
        });
        expect($wishes).toBeObservable($expected);
    });

    it('looking for drinks', () => {
        const $shops = from(SHOPS);

        const $drinks = $shops.pipe(
            mergeMap(s => s.items),
            filter(i => i.category === "beverage"),
            map(i => i.name + ": €" + i.price)
        );

        let $expected = cold('(abc|)', {
            a: 'ice tea: €5.3',
            b: 'beer: €2.5',
            c: 'coke: €1.2'
        });
        expect($drinks).toBeObservable($expected);
    });

    it('items not for sale', () => {
        const $shops = from(SHOPS);
        const $customers = from(CUSTOMERS);

        let $sold = $shops.pipe(
            mergeMap(s => s.items),
            map(i => i.name),
            distinct(),
            //tap(n => console.log(n))
        );

        let $wishlist = $customers.pipe(
            mergeMap(s => s.wishList),
            distinct(),
            tap(n => console.log(n))
        );

        // Create a set of item names that are in the wishList but not on  sale in any shop.
        $wishlist.pipe(
            mergeMap(item => {
                return $sold.pipe(
                    filter(v => item != v),
                    tap(n => console.log(n))
                )
            })
        );

        let $result;

        let $expected = cold('(ab|)', {
            a: 'coat',
            b: 'pants'
        });
        expect($wishlist).toBeObservable($expected);
    });

    it('can zip 2 streams', () => {
        const observable1 = cold('---a---b---|', {a: 1, b: 3});
        const observable2 = cold('-----c---d---|', {c: 5, d: 7});

        const $result = zip(observable1, observable2).pipe(
            map(v => v.reduce((a, b) => a + b))
        );

        const $expected = cold('-----x---y-|', {x: 6, y: 10});
        expect($result).toBeObservable($expected);
    });

    it('should fix the cold observable', () => {
        const $result = of(2, 12, 3, 7, 4, 5)
            .pipe(
                map(value => value * value),
                filter(value => value > 10),
                take(3)
            );

        let $expected = cold('(abc|)', {a: 144, b: 49, c: 16});
        expect($result).toBeObservable($expected);
    });

});
