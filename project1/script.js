console.log("linked")

let body = $('body')


//pseudocode
//First, lay out the rules of the game:
  //each player rolls 3 dice
  //6 rounds, where the number of the round is the target for the number you want to roll on each die
  //one point for each die matching the target
  //if you get three of a kind of the target, you get 21 points
  //if you roll three of a kind of anything but the target, you get 5 points
  //each player keeps rolling in each round until a roll gives them zero points
//One player vs the computer
//have a function that randomly gives the player 3 numbers from 1-6 until no target numbers are showing
  //the function must add the number of target numbers to the running score
  //function must also acknowledge three of a kind (probably with an if/else statement)
//probably use same function to get computer's scores
//continue playing for 6 rounds
//after 6 rounds, announce the winning player





//grabbed the below random integer formula from MDN
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

roundNumber = 1
playerScore = []
enemyScore = 0

playerRoll = []





//check the dice should tell the player when they get points
let oneTurn = function() {
  let Score = 1
  while (Score > playerScore.length){
    let rollTheDice = function() {
      for (var i = 0; i < 3; i++) {
        playerRoll.push(getRandomInteger(1,7))
      }
    };
    rollTheDice();
    console.log(playerRoll)
     if(playerRoll[0] === playerRoll[1] && playerRoll[1] === playerRoll[2]) {
      if (playerRoll[0] === roundNumber) {
        //this is a "bunco"
        playerScore.push(21)
        Score++;
      } else {
        playerScore.push(5)
        Score++;
      }
    }else if(playerRoll[0] !== roundNumber && playerRoll[1] !== roundNumber && playerRoll[2] !== roundNumber) {
      Score -= 1;
      //go to next player
      // return;
    } else {
      for (var i = 0; i < playerRoll.length; i++) {
        if (playerRoll[i] === roundNumber) {
          playerScore.push(1)
          Score++
          }
        }
      }
    playerRoll = []
    }
    console.log("score: "+playerScore)
    //took the below reduce function from MDN
    let sum = playerScore.reduce(function(acc, val) {
      return acc+val;
    }, 0)
}



oneTurn()



// let playerTurn = function() {
//   for (var i = 0; i < 2; i++) {
//     rollTheDice();
//     let thisTurn = playerRoll;
//     console.log("this turn " + thisTurn);
//     checkTheDice(thisTurn);
//     let thisTurnScore = playerScore;
//     console.log("score " + thisTurnScore);
//     playerRoll = [];
//   }

// }

// playerTurn()

//if I do each score as an playerRollay within an playerRollay for each round, I can do a while loop I think



