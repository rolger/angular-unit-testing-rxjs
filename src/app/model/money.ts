export class Money {
    constructor(private value: number) {
    }

    public add(other: Money): Money {
        return new Money(this.value + other.value);
    }

    public percentage(p: number): Money {
        return new Money(this.value * p / 100);
    }

    format(): string {
        return Number(1).toFixed(2);
    }

    getValue(): number {
        return this.value;
    }
}
