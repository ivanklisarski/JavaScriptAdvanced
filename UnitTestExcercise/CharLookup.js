function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}


let expect = require('chai').expect;
let assert = require('chai').assert;

describe("lookupChar",function () {
    it("check if first param is string",function () {
        expect(lookupChar(13,4)).to.equal(undefined);
    });

    it("check if second param is string",function () {
        expect(lookupChar("pesho","gosho")).to.equal(undefined);
    });

    it("check if second param is string",function () {
        expect(lookupChar("pesho",-1)).to.equal("Incorrect index");
    });
    it("check if second param is string",function () {
        expect(lookupChar("pesho",13)).to.equal("Incorrect index");
    });

    it("check if second param is string",function () {
        expect(lookupChar("pesho",0)).to.equal('p');
    });
    it("check if second param is string",function () {
        expect(lookupChar("stamat",3)).to.equal('m');
    });
    it("check if second param is string",function () {
        expect(lookupChar("pesho",5)).to.equal("Incorrect index");
    });

    it("check if second param is string",function () {
        expect(lookupChar("pesho",3.21)).to.equal(undefined);
    });



});