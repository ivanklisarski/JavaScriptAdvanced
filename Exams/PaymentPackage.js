class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Payment Package", function () {
    it("An empty name ", function () {
        expect(() => new PaymentPackage("", 123)).to.throw(Error);
    });

    it("An instance of the class ", function () {
        const paymentPack = new PaymentPackage('HR Services', 1500);
        expect(paymentPack.name).equal('HR Services');
        expect(paymentPack.value).equal(1500);
        expect(paymentPack.hasOwnProperty("_name")).to.be.true;

    });
    it("An empty val ", function () {
        expect(() => new PaymentPackage("asd",)).to.throw(Error);
    });
    it("An negative val ", function () {
        expect(() => new PaymentPackage("asd", -2)).to.throw(Error);
    });
    it("negative vat ", function () {
        expect(() => new PaymentPackage.VAT(-2).to.throw(Error));
    });
    it("string vat ", function () {
        expect(() => new PaymentPackage.VAT('hui').to.throw(Error));
    });
    it("should change value for correct input for VAT 10.5", function () {
        let p = new PaymentPackage("abc", 10);

        p.VAT = 10.5;
        expect(p.VAT).to.be.closeTo(10.5, 0.001);
    });
    it("should change value for correct input for VAT 0", function () {
        let p = new PaymentPackage("abc", 10);

        p.VAT = 0;
        expect(p.VAT).to.be.closeTo(0, 0.001);
    });
    it("default vat ", function () {
        let p = new PaymentPackage("abc", 10);

        expect(p.VAT).to.be.closeTo(20, 0.01);
        expect(p._VAT).to.be.closeTo(20, 0.01);
        expect(p.hasOwnProperty("_VAT")).to.be.true;
    });
    it("should throw error for ('abc', -10)", function () {
        let p = undefined;

        expect(() => p = new PaymentPackage("abc", -10)).to.throw(Error);
    });
    it("default active ", function () {
        expect(() => new PaymentPackage.active().to.be(true));
    });
    it("active not boolean", function () {
        expect(() => new PaymentPackage.active('str').to.throw(Error));
        expect(() => new PaymentPackage.active(1).to.throw(Error));
        expect(() => new PaymentPackage.active([]).to.throw(Error));
        expect(() => new PaymentPackage.active({}).to.throw(Error));

    });
    it("should change value for correct input for VAT 30", function () {
        let p = new PaymentPackage("abc", 10);

        p.VAT = 30;
        expect(p.VAT).to.be.closeTo(30, 0.01);
    });

    it("should return correct value for ('asdasd', 500)", function () {
        let p = new PaymentPackage("asdasd", 500);
        let expectedText = [
            `Package: ${p.name}` + '',
            `- Value (excl. VAT): ${p.value}`,
            `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
        ].join("\n");
        let actualText = p.toString();

        expect(actualText).to.be.equal(expectedText);
    });
    it("should return correct value for ('123123123', 123) inactive", function () {
        let p = new PaymentPackage("123123123", 123);
        p.active = false;
        p.active = true;
        p.active = false;
        let expectedText = [
            `Package: ${p.name}` + ' (inactive)',
            `- Value (excl. VAT): ${p.value}`,
            `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
        ].join("\n");
        let actualText = p.toString();

        expect(actualText).to.be.equal(expectedText);
    });

    it("should have default value when instantiated", function () {
        let p = new PaymentPackage("abc", 10);

        expect(p.active).to.be.true;
        expect(p._active).to.be.true;
        expect(p.hasOwnProperty("_active")).to.be.true;
    });

    it("should change value for correct input", function () {
        let p = new PaymentPackage("abc", 10);

        p.active = false;
        expect(p.active).to.be.false;
        expect(p._active).to.be.false;
        p.active = true;
        expect(p.active).to.be.true;
        expect(p._active).to.be.true;
        p.active = false;
        p.active = true;
        p.active = false;
        expect(p.active).to.be.false;
        expect(p._active).to.be.false;
    });
    it("should throw error for invalid values for active", function () {
        let p = new PaymentPackage("abc", 10);

        expect(() => p.active = -11).to.throw(Error);
        expect(() => p.active = -0.1).to.throw(Error);
        expect(() => p.active = -0.0001).to.throw(Error);
        expect(() => p.active = []).to.throw(Error);
        expect(() => p.active = {}).to.throw(Error);
        expect(() => p.active = "asd").to.throw(Error);
        expect(() => p.active = null).to.throw(Error);
        expect(() => p.active = undefined).to.throw(Error);
    });
});
