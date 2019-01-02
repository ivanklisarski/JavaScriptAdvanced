function deck(input) {

    let deck = [];
    for (let i = 0; i < input.length; i++) {
        let face = input[i].substring(0, input[i].length-1);
        let suit = input[i].substr(input[i].length-1, 1);

        try {
            deck.push(makeCard(face, suit));
        }
        catch (err) {
            console.log("Invalid card: " + input[i]);
            return;
        }
    }
    console.log(deck.join(' '));

    function makeCard(face, suit) {
        const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const validSuits = ['S', 'H', 'D', 'C'];

        if (!validFaces.includes(face)) {
            throw new Error("Invalid card face: " + face);
        }
        if (!validSuits.includes(suit)) {
            throw new Error("Invalid card suit" + suit);
        }

        return  {
            face: face,
            suit: suit,
            toString: function (){
                let suitToChar = {
                    'S': "\u2660",
                    'H': "\u2665",
                    'D': "\u2666",
                    'C': "\u2663"

                };
                return  `${this.face}${suitToChar[suit]}`;

            }
        };
    }

}
deck(['AS', '10D', 'KH', '2C']);
//deck(['1C', '3D', 'QD', '1C']);
//deck(['5S', '3D', 'QD', '1C']);
