function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Test isOddOrEven", function () {

    it("with number param should return undefined",function () {
        expect(isOddOrEven(13)).to.be.equal(undefined);
    });
    it("with object param should return undefined",function () {
        expect(isOddOrEven({})).to.be.equal(undefined);
    });
    it("even length string should return correct result",function () {
        expect(isOddOrEven("roar")).to.be.equal("even");
    });

    it("odd length string should return correct result",function () {
        expect(isOddOrEven("pesho")).to.be.equal("odd");
    });


});