function solve(input) {
    let sum = input;

    function add(num) {
        sum += num;
        return add;
    }

    add.toString = function () {
        return sum;
    };
    return add;
}

let result = solve();
console.log(result(6)(1)(-3).toString());
