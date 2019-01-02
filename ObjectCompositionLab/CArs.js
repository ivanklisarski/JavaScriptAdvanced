function objectInheritance(input) {
    for (let line of input) {
        let tokens = line.split(" ");
        if (tokens[0] === "create") {
            if (tokens.length > 2) {
                this[tokens[1]] = Object.create(this[tokens[3]]);
                continue;
            }
            this[tokens[1]] = {};
        } else if (tokens[0] === "set") {
            this[tokens[1]][tokens[2]] = tokens[3];
        } else {
            let arr = [];
            for (let prop in this[tokens[1]]) {
                arr.push(prop + ":" + this[tokens[1]][prop]);
            }
            console.log(arr.join(", "));
        }
    }
}