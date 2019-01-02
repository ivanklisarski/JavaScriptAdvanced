class SoftUniFy {
    constructor() {
        this.allSongs = {};
    }

    downloadSong(artist, song, lyrics) {
        if (!this.allSongs[artist]) {
            this.allSongs[artist] = {rate: 0, votes: 0, songs: []}
        }

        this.allSongs[artist]['songs'].push(`${song} - ${lyrics}`);

        return this;
    }

    playSong(song) {
        let songArtists = Object.keys(this.allSongs).reduce((acc, cur) => {

            let songs = this.allSongs[cur]['songs']
                .filter((songInfo) => songInfo
                    .split(/ - /)[0] === song);

            if (songs.length > 0) {
                acc[cur] = songs;
            }

            return acc;
        }, {});

        let arr = Object.keys(songArtists);
        let output = "";

        if (arr.length > 0) {

            arr.forEach((artist) => {
                output += `${artist}:\n`;
                output += `${songArtists[artist].join('\n')}\n`;
            });

        } else {
            output = `You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`
        }

        return output;
    }

    get songsList() {
        let songs = Object.values(this.allSongs)
            .map((v) => v['songs'])
            .reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);

        let output;

        if (songs.length > 0) {
            output = songs.join('\n');
        } else {
            output = 'Your song list is empty';
        }

        return output;

    }

    rateArtist() {
        let artistExist = this.allSongs[arguments[0]];
        let output;

        if (artistExist) {

            if (arguments.length === 2) {
                artistExist['rate'] += +arguments[1];
                artistExist['votes'] += 1;
            }

            let currentRate = (+(artistExist['rate'] / artistExist['votes']).toFixed(2));
            isNaN(currentRate) ? output = 0 : output = currentRate;

        } else {
            output = `The ${arguments[0]} is not on your artist list.`
        }

        return output;
    }
}


let expect = require('chai').expect;
let assert = require('chai').assert;

describe("Softunify", function () {
    it("Check all songs", function () {
        let sofunify = new SoftUniFy();

        expect(sofunify.allSongs).to.eql({});

    });
    it("Check download song function", function () {
        let sofunify = new SoftUniFy();
        let test = sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        expect(sofunify.downloadSong()).to.equal(test)

    });
//     it("Chekc download song function to return correct",function () {
//         let sofunify = new SoftUniFy();
//         let test =  sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
//
//         const corret = `{Eminem:
//    { rate: 0,
//      votes: 0,
//      songs:
//       [ 'Venom - Knock, Knock let the devil in...',
//         'Phenomenal - IM PHENOMENAL...' ] }
// `;
//         expect(sofunify.allSongs).to.be.equal(corret);
//     });

    it("Check rate artist if not in artist list function", function () {
        let sofunify = new SoftUniFy();


        expect(sofunify.rateArtist('Eminem', 50)).to.equal('The Eminem is not on your artist list.');

    });

    // it("Check rate artist if in artist list function",function () {
    //     //     let sofunify = new SoftUniFy();
    //     //     let addinArts =  sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
    //     //     expect(sofunify.rateArtist('Eminem', 50)).to.equal('The Eminem is not on your artist list.');
    //     //
    //     // });
    it("Check songList empty list function", function () {
        let sofunify = new SoftUniFy();

        expect(sofunify.songsList).equal('Your song list is empty');

    });

    it("Check songList not empty list function", function () {
        let sofunify = new SoftUniFy();
        sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        sofunify.downloadSong('Eminem2', 'Venom2', 'Knock, Knock let the devil in...2');
        expect(sofunify.songsList).equal('Venom - Knock, Knock let the devil in...\nVenom2 - Knock, Knock let the devil in...2');
    });

    it("Check playsong with empty list function", function () {
        let sofunify = new SoftUniFy();
        expect(sofunify.playSong()).equal('You have not downloaded a undefined song yet. Use SoftUniFy\'s function downloadSong() to change that!');

    });

    it("Check playsong with non empty list function", function () {
        let sofunify = new SoftUniFy();
        sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');

         expect(sofunify.playSong('Venom')).equal('Eminem:\nVenom - Knock, Knock let the devil in...\n');
        //sofunify.playSong('Venom')

    });


});
