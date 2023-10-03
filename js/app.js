/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');

/*----- app's state (variables) -----*/
let scores; //Object key of 'p' -> player, key of 't'-> tie, key of 'c' -> computer

let results; //Object key of 'p' for player results, key of 'c' for computer results
             //value of 'p' for paper, value of 'r' for rock, value of 's' for scissors

let winner; //String 'p' if player wins, 't' for a tie, 'c' if computer wins
/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

//initialize all states, then call render();
function init() {
    scores = {
        p: 0,
        t: 0,
        c: 0
    };
    results = {
        p: 'r',
        c: 'r'
    };
    winner = 't'
    render();
}

function renderScores() {
    for (let key in scores) {
        const scoreEl = document.getElementById(`${key}-score`);
        scoreEl.innerText = scores[key];
    }
}

function renderResults() {

}


function render() {
    renderScores();
    renderResults();
}