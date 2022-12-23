'use strict';

// getting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// variables to contain values 
let currentScore = 0;
let activePlayer = 0;
const score = [0, 0]

// state Variable to check if the game is running or not
let playing = true;

// setting initial values
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden')


// function to switch between active players
const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')

}

// Roll button 
btnRoll.addEventListener('click', function () {
    // first check if game is running
    if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice)
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`

    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }

    else {
        switchPlayer();

    }}
})


// hold button functionality 
btnHold.addEventListener('click', function () {
    if(playing){
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    if (score[activePlayer] >= 50) {
        // to end the game 
        playing=false;  // changes the state of game
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    }
    else {

        switchPlayer();
    }
    }


})


// new game functions

btnNew.addEventListener('click',function(){
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    score[0]=0;
    score[1]=0;
    currentScore=0;
    document.getElementById(`current--0`).textContent = currentScore;
    document.getElementById(`current--1`).textContent = currentScore;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    playing=true;
    activePlayer=0;

})
