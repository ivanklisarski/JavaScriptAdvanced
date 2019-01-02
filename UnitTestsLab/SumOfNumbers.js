function sum(arr) {
    let sum = 0;
    for (let num of arr)
        sum += Number(num);
    return sum;
}
function testSum() {



}

let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Test sum", function () {
    it("If all array parameters are correct, should return correct result", () => {
        //Arrange
        let array = [1, 2, 3, 4, 5];
        //Act
        let actual = sum(array);
        let expected = 15;
        //Assert
        assert.equal(actual, expected)
    });

    it("If have a string into array, should return NaN", () => {
        //Arrange
        let array = [1, 'string', 3, 4, 5];
        //Act
        let actual = sum(array);
        //Assert
        assert.isNaN(actual)
    });

    it("If input is string, should return NaN", () => {
        //Arrange
        let array = 'string';
        //Act
        let actual = sum(array);
        //Assert
        assert.isNaN(actual)
    });

    it("If is empty array, should return 0", () => {
        //Arrange
        let array = [];
        //Act
        let actual = sum(array);
        let expected = 0;
        //Assert
        assert.equal(actual, expected);
    });

    it("If empty.length is 1, should return correct result", () => {
        //Arrange
        let array = [5];
        //Act
        let actual = sum(array);
        let expected = 5;
        //Assert
        assert.equal(actual, expected);
    });
});