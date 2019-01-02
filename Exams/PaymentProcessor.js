class PaymentProcessor {
    constructor(options) {
        this.payments = [];
        this.types = ["service", "product", "other"];
        this.precision = 2;
        this.setOptions(options);
    }

    setOptions(options) {
        if (options) {
            Object.keys(options).forEach((key) => {
                this[key] = options[key];
            });
        }
    }

    registerPayment(id, name, type, value) {
        if (typeof id !== 'string' || id.length === 0) {
            throw new Error('ID must be a non-empty string.');
        } else if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Name must be a non-empty string.');
        } else if (typeof value !== 'number') {
            throw new Error('Value must be a number.');
        } else if (this.types.indexOf(type) === -1) {
            throw new Error('Type is not supported');
        }
        this.payments.forEach((pmt) => {
            if (pmt.id === id) {
                throw new Error('Payment already exists.');
            }
        });
        let val = +value.toFixed(this.precision);
        this.payments.push({id: id, name: name, type: type, value: val});
    }

    deletePayment(id) {
        let initalLength = this.payments.length;
        this.payments = this.payments.filter((pmt) => {
            return pmt.id !== id;
        });
        if (initalLength === this.payments.length) {
            throw new Error('ID not found.');
        }
    }

    get(id) {
        let resultArr = this.payments.filter((pmt) => {
            return pmt.id === id;
        });
        if (resultArr.length === 0) {
            throw new Error('Id not found.');
        }
        let pmt = resultArr[0];
        return `Details about payment ID: ${pmt.id}\n` +
            `- Name: ${pmt.name}\n` +
            `- Type: ${pmt.type}\n` +
            `- Value: ${pmt.value.toFixed(this.precision)}`;
    }

    toString() {
        let currentBalance = this.payments.reduce((acc, cur) => {
            // console.log(cur);
            return acc + cur.value;
        }, 0);
        return `Summary:\n` +
            `- Payments: ${this.payments.length}\n` +
            `- Balance: ${currentBalance.toFixed(this.precision)}\n`;
    }

}