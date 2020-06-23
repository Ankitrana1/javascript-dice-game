/*
Game Rules : 
    1. Two player can roll the dice as many time they want adding to their current score.
    2. The current score will only added to the main score if player hits the hold button.
    3. If a player roll 1, then the current score will be set to 0 and now it is next player's turn.
    4. If a player roll 2 SIX in a row then set main score to 0 and its next player turn.
    5. Player reaching the score 100 first, will be the winner.
*/

var activePlayer, score, roundScore, gamePlaying, previousRoll;

init();

//Read the events and execute (anonymous functions/ callback functions) accordingly.
//1. Roll the dice Event
document.querySelector('.btn-roll').addEventListener('click', function(){
    //Only run if game is running and not after completing 
    if(gamePlaying){
        //1. Generate random number using Math Object
        var dice = Math.floor(Math.random() * 6) +1;
        
        //2. Display the dice with the generated random number
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'images/dice-' + dice + '.png';
        
        //3. Update the roundScore if dice value is not 1.
        if(dice == 6 && previousRoll == 6){
            score[activePlayer] = 0;
            document.getElementById('score-'+ activePlayer).textContent = '0';
            nextPlayer();       
        }else if(dice !== 1){
            roundScore += dice;
            document.getElementById('current-'+ activePlayer).textContent = roundScore;
        }else {
            //Next Player turn. Using method nextPlayer()
            nextPlayer();
        }
        previousRoll = dice;
    }
});

//2. Hold Button event to save the score 
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. Add round score to main score
        score[activePlayer] += roundScore;

        //2. Reflect this show to our main
        document.getElementById('score-'+ activePlayer).textContent = score[activePlayer];   
        
        //3. If player won the game
        if(score[activePlayer] >= 100){
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            //If not reached the max score then its turn for the nexxt player.
            nextPlayer();
        }
    }
});

//3. Event handling for New Game Button using callback function
document.querySelector('.btn-new').addEventListener('click', init); 

//method to set initial state at every starting of the game.
function init(){
    score = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    //Don't display dice when we are starting game
    document.querySelector('.dice').style.display = 'none';

    //Set all the values to 0 at starting point.
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    /*Doesn't affect anything when we call for first time. 
    But need this when game is completed, to reset all text along with CSS classes to default.
    */
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
    //1. change the player turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //2. Need to set roundScore 0, for the other player as we are using same variable to store both roundscore values.
    roundScore = 0;
    
    //Make current score default to 0 for both the players.
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //Toggle the active class for the player.
    document.querySelector('.player-0-panel ').classList.toggle('active');
    document.querySelector('.player-1-panel ').classList.toggle('active');

    //Remove the dice as well from the screen, will appear again when next player roll the dice.
    document.querySelector('.dice').style.display = 'none';
}