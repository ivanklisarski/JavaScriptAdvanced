let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

let expect = require('chai').expect;
let assert = require('chai').assert;

describe("mathEnforcer", function() {

    it("with a string(should return undefined)",function () {
        let result = mathEnforcer.addFive('str');
        expect(result).to.be.undefined;

    });

    it("with a obj(should return undefined)",function () {
        let result = mathEnforcer.addFive({});
        expect(result).to.be.undefined;

    });

    it("with positive num(should return +5)",function () {
        let result = mathEnforcer.addFive(5);
        expect(result).to.be.equal(10);

    });

    it("with negative num(should return +5)",function () {
        let result = mathEnforcer.addFive(-5);
        expect(result).to.be.equal(0);

    });

    it("with float num(should return +5)",function () {
        let result = mathEnforcer.addFive(5.3);
        expect(result).to.be.closeTo(10.3,0.01);

    });

    it("with a string(should return undefined)",function () {
        let result = mathEnforcer.subtractTen('str');
        expect(result).to.be.undefined;

    });

    it("with positive num(should return -10)",function () {
        let result = mathEnforcer.subtractTen(15);
        expect(result).to.be.equal(5);

    });

    it("with negative num(should return -10)",function () {
        let result = mathEnforcer.subtractTen(-15);
        expect(result).to.be.equal(-25);

    });

    it("with float num(should return -10)",function () {
        let result = mathEnforcer.subtractTen(15.5);
        expect(result).to.be.closeTo(5.5,0.01);

    });


    it("with  num and string(should return undefined)",function () {
        let result = mathEnforcer.sum(15,'sad');
        expect(result).to.be.undefined;

    });

    it("with string and num(should return undefined)",function () {
        let result = mathEnforcer.sum('asd',5);
        expect(result).to.be.undefined;

    });

    it('with positive numbers (should return correct result',function () {
        let result = mathEnforcer.sum(5,5);
        expect(result).to.be.equal(10);

    });

    it('with negative number(should return correct result',function () {
        let result = mathEnforcer.sum(-5,5);
        expect(result).to.be.equal(0);

    });

    it('with both negative numbers (should return correct result',function () {
        let result = mathEnforcer.sum(-5,-5);
        expect(result).to.be.equal(-10);

    });

    it('with float numbers (should return correct result',function () {
        let result = mathEnforcer.sum(3.14,5);
        expect(result).to.be.closeTo(8.14,0.01);

    });

    it('with undefined first (should return correct result',function () {
        let result = mathEnforcer.sum(undefined,5);
        expect(result).to.be.undefined;

    });

    it('with undefined second (should return correct result',function () {
        let result = mathEnforcer.sum(5,undefined);
        expect(result).to.be.undefined;

    });

});
