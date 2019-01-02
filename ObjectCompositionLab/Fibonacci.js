function getFibonator() {
    let previousNumber  = 0;
    let currentNumber  = 1;

    return function () {
        let nextNumber = previousNumber + currentNumber;
        previousNumber = currentNumber;
        currentNumber = nextNumber;

        return previousNumber;
    };

}
let fib = getFibonator();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());