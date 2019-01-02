let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};

let expect = require('chai').expect;
let assert = require('chai').assert;
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

before(function () {
    global.$ = global.jQuery = require('jquery');
});

describe("sharedObject", function () {
    describe("name property", function () {
        it("should start with null value upon initialization", function () {
            expect(sharedObject.name).to.equal(null, 'Name did not start with value null');
        });
    });
    describe("income property", function () {
        it("should start with null value upon initialization", function () {
            expect(sharedObject.income).to.equal(null, 'Income did not start with value null');
        });
    });
    describe("changeName", function () {
        it("should not change 'name' property with invalid parameters", function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.equal(null, 'Name changes incorrectly');
        });
        it("should not change 'name' property with invalid parameters & preexisting value", function () {
            sharedObject.name = 'previous';
            sharedObject.changeName('');
            expect(sharedObject.name).to.equal('previous', 'Name changes incorrectly');
        });
        it("should not change 'name' textbox with invalid parameters & preexisting value", function () {
            let nameTextbox = $('#name');
            nameTextbox.val('previous');
            sharedObject.changeName('');
            expect(nameTextbox.val()).to.equal('previous', 'Name changes incorrectly');
        });
        it("should change 'name' property with valid parameters", function () {
            sharedObject.changeName('new');
            expect(sharedObject.name).to.equal('new', 'Name changes incorrectly');
        });
        it("should change 'name' textbox with valid parameters", function () {
            sharedObject.changeName('new2');
            let nameTextbox = $('#name');
            expect(nameTextbox.val()).to.equal('new2', 'Name changes incorrectly');
        });
    });
    describe("changeIncome", function () {
        it("should not change 'income' property with invalid (non-integer) parameters", function () {
            sharedObject.changeIncome(5.25);
            expect(sharedObject.income).to.equal(null, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (zero) parameters", function () {
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.equal(null, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (negative) parameters", function () {
            sharedObject.changeIncome(-5);
            expect(sharedObject.income).to.equal(null, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (non-integer) parameter & preexisting value", function () {
            sharedObject.income = 100;
            sharedObject.changeIncome(5.5);
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (zero) parameters & preexisting value", function () {
            sharedObject.income = 100;
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (negative) parameters & preexisting value", function () {
            sharedObject.income = 100;
            sharedObject.changeIncome(-200);
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' textbox with invalid (empty) parameters & preexisting value", function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('100');
            sharedObject.changeIncome('');
            expect(incomeTextbox.val()).to.equal('100', 'Name changes incorrectly');
        });
        it("should not change 'income' textbox with invalid (zero) parameters & preexisting value", function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('100');
            sharedObject.changeIncome('0');
            expect(incomeTextbox.val()).to.equal('100', 'Name changes incorrectly');
        });
        it("should not change 'income' textbox with invalid (non-integer) parameters & preexisting value", function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('100');
            sharedObject.changeIncome('5.5');
            expect(incomeTextbox.val()).to.equal('100', 'Name changes incorrectly');
        });
        it("should not change 'income' textbox with invalid (negative) parameters & preexisting value", function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('100');
            sharedObject.changeIncome('-500');
            expect(incomeTextbox.val()).to.equal('100', 'Name changes incorrectly');
        });
        it("should change 'income' property with valid parameters", function () {
            sharedObject.changeIncome(5000);
            expect(sharedObject.income).to.equal(5000, 'Income changes incorrectly');
        });
        it("should change 'income' textbox with valid parameters", function () {
            sharedObject.changeIncome(6000);
            let incomeTextbox = $('#income');
            expect(incomeTextbox.val()).to.equal('6000', 'Name changes incorrectly');
        });
    });
    describe("updateName", function () {
        it("should not change 'name' property with invalid (empty) textbox parameters", function () {
            sharedObject.name = 'previous';
            $('#name').val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('previous', 'Name changes incorrectly');
        });
        it("should change 'name' property with valid textbox parameters", function () {
            sharedObject.name = 'previous';
            $('#name').val('new');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('new', 'Name changes incorrectly');
        });
    });
    describe("updateIncome", function () {
        it("should not change 'income' property with invalid (empty) textbox parameters", function () {
            sharedObject.income = 100;
            $('#income').val('');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (NaN) textbox parameters", function () {
            sharedObject.income = 100;
            $('#income').val('previous');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (non-integer) textbox parameters", function () {
            sharedObject.income = 100;
            $('#income').val('5.5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (zero) textbox parameters", function () {
            sharedObject.income = 100;
            $('#income').val('0');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should not change 'income' property with invalid (negative) textbox parameters", function () {
            sharedObject.income = 100;
            $('#income').val('-200');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(100, 'Income changes incorrectly');
        });
        it("should change 'income' property with valid textbox parameters", function () {
            sharedObject.income = 100;
            $('#income').val('5000');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(5000, 'Income changes incorrectly');
        });
    });
});

