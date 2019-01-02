class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1])
                        }
                    }
                    return message;
                }
            }
        }
    }
}

let expect = require('chai').expect;
let assert = require('chai').assert;

describe("CSharp Console",function () {

    it("if string is passed it should return it",function () {
        return expect(Console.writeLine("asd")).to.equal("asd");
    });

    it("if obj is passed it should return json",function () {
        return expect(Console.writeLine({})).to.equal(JSON.stringify({}));
    });

    it('If no arguments are passed should throw a TypeError', () => {
        expect(Console.writeLine).to.throw(TypeError);
    });

    it("if multiply args are passed but the first is not str",function () {

        expect(() => Console.writeLine(1,"something", "another one", "throw an error")).to.throw(TypeError)
    });

    it("If the number of parameters does not correspond to the number of placeholders in the template string - throw a RangeError",function () {
        const testString = "I am {0} and I am {1} years old student from {2}";


        expect(() => Console.writeLine(testString,"Christian",18)).to.throw(RangeError)
    });

    it("If the placeholders have indexes not withing the parameters range - throw a RangeError",function () {
        const testString = "I am {13} and I am {1} years old student from {2}";


        expect(() => Console.writeLine(testString,"Christian",18,"adsds")).to.throw(RangeError)
    });

    it("Works",function () {
        const testString = "I am {0} and I am {1} years old student from {2}";
        const expected = "I am Christian and I am 18 years old student from Sofia";

             expect(Console.writeLine(testString,"Christian", 18, "Sofia")).to.be.equal(expected);
    });
    it("Should replace all placeholders when passed correct parameters even if they are in incorrect order", function () {
        const testString = "I am {1} and I am {0} years old student from {2}.";
        const expected = "I am Christian and I am 18 years old student from Sofia.";

        const actual = Console.writeLine(testString, 18, "Christian", "Sofia");

        assert.equal(actual, expected);
    });

    it("should recognize the placeholder numbers well", function () {
        const testString = "That should not {10}";

        assert.throws(function () {
            Console.writeLine(testString, "work");
        }, RangeError);
    });


});

