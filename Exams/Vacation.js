class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.'`
        }

        let nameNBudgetArr = [`${name}-${budget}`];

        if (nameNBudgetArr === name) {
            return `${name} is already in the list for this ${this.destination} vacation.`
        }

    }

    removeChild(name, grade) {

    }

    toString() {

    }

    get numberOfChildren() {
        return this.kids;
    }

    get organaizer() {
        return this._organaizer;
    }


}

let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
console.log(vacation.registerChild('Gosho', 5, 2000));
console.log(vacation.registerChild('Lilly', 6, 2100));
console.log(vacation.registerChild('Pesho', 6, 2400));
console.log(vacation.registerChild('Gosho', 5, 2000));
console.log(vacation.registerChild('Tanya', 5, 6000));
console.log(vacation.registerChild('Mitko', 10, 1590));
