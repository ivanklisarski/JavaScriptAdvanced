class SubscriptionCard {
    constructor(firstName, lastName, SSN) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._SSN = SSN;
        this._subscriptions = [];
        this._blocked = false;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get SSN() {
        return this._SSN;
    }

    get isBlocked() {
        return this._blocked;
    }

    addSubscription(line, startDate, endDate) {
        this._subscriptions.push({
            line,
            startDate,
            endDate
        });
    }

    isValid(line, date) {
        if (this.isBlocked) return false;
        return this._subscriptions.filter(s => s.line === line || s.line === '*')
            .filter(s => {
                return s.startDate <= date &&
                    s.endDate >= date;
            }).length > 0;
    }

    block() {
        this._blocked = true;
    }

    unblock() {
        this._blocked = false;
    }
}

let expect = require('chai').expect;
let assert = require('chai').assert;


describe("SubscriptionCard", function () {
    it("initialized correctly", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card.firstName).to.be.equal('Pesho');
        expect(card.lastName).to.equal('Petrov');
        expect(card.SSN).to.equal('00000000');
    });
    it("Cant change once initialized",function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
          card.firstName = 'Pesho';
          card.lastName = 'Pesho';
          card.SSN = '555555';
          expect(card.firstName).to.be.equal('Pesho');
        expect(card.lastName).to.equal('Petrov');
        expect(card.SSN).to.equal('00000000');
    });
    it('firstName should be private property and use accessor', () => {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');

        assert.equal(card.firstName, 'Pesho');
    });

    it('Once declared firstName must not be changed', () => {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');

        card.firstName = 'Tosho';
        assert.equal(card.firstName, 'Pesho');
    });

    it("Test for block", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card.isBlocked).to.equal(false);
    });

    it("Test for block", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.block();
        expect(card.isBlocked).to.equal(true);
    });

    it("Test for block", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.block();
        card.unblock();
        expect(card.isBlocked).to.equal(false);
    });
    it("Test for subscription", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        //card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        expect(card._subscriptions.length).to.be.equal(1);
        expect(card._subscriptions[0].line).to.be.equal("120");
        expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'));
        expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'));

    });
    it("Even more test",function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card._subscriptions.length).to.be.equal(0);
        expect(card._subscriptions[0]).to.be.equal(undefined);
        expect(card._subscriptions).to.be.eql([]);

    });

    it("More test for subscription", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
        expect(card._subscriptions.length).to.be.equal(2);
        expect(card._subscriptions[0].line).to.be.equal("120");
        expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'));
        expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'));

        expect(card._subscriptions[1].line).to.be.equal("*");
        expect(card._subscriptions[1].startDate).to.be.eql(new Date('2018-05-25'));
        expect(card._subscriptions[1].endDate).to.be.eql(new Date('2018-06-24'));
    });
    it("isValid test", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        expect(card.isValid("120",new Date('2018-04-22'))).to.equal(false);
    });

    it("isValid one day before", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid("120",new Date('2018-04-21'))).to.equal(false);
    });
    it("isValid one day after", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid("120",new Date('2018-05-22'))).to.equal(false);
    });
    it("isValid on start date", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid("120",new Date('2018-04-22'))).to.equal(true);
    });

    it("isValid on end date", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid("120",new Date('2018-05-21'))).to.equal(true);
    });
    it("blocked card", function () {
        const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        card.block();
        expect(card.isValid("120",new Date('2018-05-21'))).to.equal(false);
    });

});

