(function () {
    let id = 0;

    return class Extensible {
        constructor() {
            this.id = id++;
        }

        extend(template) {
            let keys = Object.keys(template);

            for (let key of keys) {
                let value = template[key];

                if (typeof value === "function") {
                    Object.getPrototypeOf(this)[key] = value;
                } else {
                    this[key] = value;
                }
            }
        }
    }
})();