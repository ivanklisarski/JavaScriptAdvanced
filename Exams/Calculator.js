class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof (this.expenses[i]) === 'number') {
                if (i === 0 || divide === undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
            throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            }
            else {
                return this.expenses.sort().join(', ');
            }
        }
        else return 'empty';
    }
}

let expect = require('chai').expect;
let assert = require('chai').assert;


describe("Calculator", function () {

    let calculator;
    beforeEach(function () {
        calculator = new Calculator();
    });
    it('expences property should be empty arr', function () {
        let result = calculator.expenses;
              expect(result).to.be.eql([]);
    });

    it("func add data adds any data to expences", function () {
        let result = calculator.expenses;
        calculator.add('data');
        calculator.add(5);
        expect(result).to.be.eql(['data', 5]);
    });
    it("func divade divades only numbers", function () {

        calculator.add(25);
        calculator.add(5);

        let result = calculator.divideNums();
        expect(result).to.be.equal(5);
    });

    it('test with one number', function () {
        calculator.add('Pesho');
        calculator.add({});
        calculator.add(-9.9);
        let result = calculator.divideNums();
        expect(result).to.be.closeTo(-9.9, 0.01);
    });

    it("func divade divades only numbers float", function () {

        calculator.add(10.5);
        calculator.add(2.5);

        let result = calculator.divideNums();
        expect(result).to.be.closeTo(4.2,0.01);
    });


    it("func divade throws error when empty", function () {

        let result = () => calculator.divideNums();
        expect(result).to.throw(`There are no numbers in the array!`)

    });

    it("function to str return correct",function () {

            calculator.add('Pesho');
            calculator.add(5);
        let result = calculator.expenses;

        expect(calculator.toString()).equal("Pesho -> 5");
    });

    it("function to str throw when empty",function () {

       let result = calculator.toString();
        expect(result).to.equal(`empty array`);

    });
    it('order empty expeses', function () {
        let result = calculator.orderBy();
        expect(result).to.be.eql(`empty`)
    });
    it('order with mixed types', function () {
        calculator.add(9);
        calculator.add(-9.9);
        calculator.add('Pesho');
        calculator.add(0);
        calculator.add({});

        let result = calculator.orderBy();
        expect(result).to.be.eql(`-9.9, 0, 9, Pesho, [object Object]`)
    });
    it('test with more then two numbers', function () {

        calculator.add('Pesho');
        calculator.add({});
        calculator.add(-9.9);
        calculator.add(9);
        calculator.add(0);

        let result = calculator.divideNums();
        expect(result).to.be.eql(`Cannot divide by zero`);
    });
});