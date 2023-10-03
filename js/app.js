/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');

const RPS_LOOKUP = {
    r: {img: 'imgs/rock.png', beats: 's' },
    p: {img: 'imgs/paper.png', beats: 'r'},
    s: {img: 'imgs/scissors.png', beats: 'p'}
};

/*----- app's state (variables) -----*/
let scores; //Object key of 'p' -> player, key of 't'-> tie, key of 'c' -> computer

let results; //Object key of 'p' for player results, key of 'c' for computer results
             //value of 'p' for paper, value of 'r' for rock, value of 's' for scissors

let winner; //String 'p' if player wins, 't' for a tie, 'c' if computer wins
/*----- cached element references -----*/

const pResultEL = document.getElementById('p-result');
const cResultEL = document.getElementById('c-result');
const countdownEL = document.getElementById('countdown'); 

/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);

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

function handleChoice(evt){
    //gaurds
    if(evt.target.tagName !== 'BUTTON') return;
    //player has made a choice
    results.p = evt.target.innerText.toLowerCase();
    //compute random choice for computer
    results.c = getRandomRPS();
    winner = getWinner();
    scores[winner] += 1;
    render();
}

function getWinner (){
    if (results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c';
}

function getRandomRPS() {
    const rps = Object.keys(RPS_LOOKUP);
    const rndIDX = Math.floor(Math.random() * rps.length);
    return rps[rndIDX];
}

function renderScores() {
    for (let key in scores) {
        const scoreEl = document.getElementById(`${key}-score`);
        scoreEl.innerText = scores[key];
    }
}

function renderResults() {
    pResultEL.src = RPS_LOOKUP[results.p].img;
    cResultEL.src = RPS_LOOKUP[results.c].img;
    pResultEL.style.borderColor = winner === 'p' ? 'grey' : 'white';
    cResultEL.style.borderColor = winner === 'c' ? 'grey' : 'white';

}

function render() {
    renderCountdown(function() {
        renderScores();
        renderResults();
    });
}

function renderCountdown(cb) {
    let count = 3;
    AUDIO.currentTime = 0;
    AUDIO.play();
    countdownEL.style.visibility = 'visible';
    countdownEL.innerText = count;
    
    const timerId = setInterval(function() {
        count--;
        if(count){
            countdownEL.innerText = count;
        } else {
            clearInterval(timerId);
            countdownEL.style.visibility = 'hidden';
            cb();
        }
    }, 1000)
}