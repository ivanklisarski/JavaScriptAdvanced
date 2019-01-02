function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}


let expect = require('chai').expect;
let assert = require('chai').assert;

describe("createCalculator()", function() {
    let calc;
    beforeEach(function () {
        calc = createCalculator();
    });
        it('function should return an Object', () => {
            assert.isObject(createCalculator());
        });

        it('Result object should contains 3 properties', () => {
            const propertiesCount = Object.keys(calc).length;
            assert.equal(propertiesCount, 3);
        });

    it("should return 0 for get", function(){
        let value = calc.get();
        expect(value).to.be.equal(0);
    });
    it("should return 5 after {add 3; add 2}", function () {
        calc.add(3);
        calc.add(2);
        let value = calc.get();
        expect(value).to.be.equal(5);
    });
       it("should return -5 after {subtract 3 ; subtract 2} ",function () {
           calc.subtract(3);
           calc.subtract(2);

           let value = calc.get();
           expect(value).to.be.equal(-5);
       });

       it("should return correct result",function () {
           calc.add(5.3);
           calc.subtract(1.1);
           let value = calc.get();
           expect(value).to.be.equal(4.199999999999999);
       });
    it("should return nan",function () {
        calc.add('string');
        let value = calc.get();
        expect(value).to.be.NaN

    });

    it("should return nan",function () {
        calc.subtract('string');
        let value = calc.get();
        expect(value).to.be.NaN
    });

    it("should return 2 after (add(10); subtract('7'); add('-2'); subtract(-1)", function(){
        calc.add(10);
        calc.subtract('7');
        calc.add(-2);
        calc.subtract('-1');
        let value = calc.get();
        expect(value).to.be.equal(2);
    });

    it("should return NaN after add empty input", function(){
        calc.add();
        let value = calc.get();
        expect(value).to.be.NaN
    });

    it("should return NaN after subtract of empty input", function(){
        calc.subtract();
        let value = calc.get();
        expect(value).to.be.NaN
    });
    it("should have get() function", function () {
        let hasProp = calc.hasOwnProperty('get');
        expect(hasProp).to.be.true;
    });

    it("should have subtract() function", function(){
        let hasProp = calc.hasOwnProperty('subtract');
        expect(hasProp).to.be.true;
    });

    it("should have add() function", function(){
        let hasProp = calc.hasOwnProperty('add');
        expect(hasProp).to.be.true;
    });
    it('Result object should contains add, subtract and get as properties', () => {
        const propArr = ['add', 'subtract', 'get'];

        let containsAllProp = true;
        Object.keys(calc)
            .forEach((k) => {
                if (propArr.indexOf(k) < 0) {
                    containsAllProp = false;
                }
            });

        assert.isTrue(containsAllProp);
    });
});