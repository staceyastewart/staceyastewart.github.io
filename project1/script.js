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





//grabbed the below from MDN
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

roundNumber = 1
playerScore = 0
enemyScore = 0

playerRoll = []

let rollTheDice = function() {
  for (var i = 0; i < 3; i++) {
    playerRoll.push(getRandomInteger(1,7))
  }
  console.log(playerRoll)
  return playerRoll
}

rollTheDice()


//check the dice should tell the player when they get points
let checkTheDice = function(arr, player_score) {
  if(arr[0] !== roundNumber && arr[1] !== roundNumber && arr[2] !== roundNumber) {
    //go to next player
    console.log(player_score)
    return;
  } else if(arr[0] === arr[1] && arr[1] === arr[2]) {
    if (arr[0] === roundNumber) {
      //this is a "bunco"
      player_score += 21
    } else {
      player_score += 5
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === roundNumber) {
        player_score += 1
      }
    }
  }
  console.log(player_score)
}

checkTheDice(playerRoll, playerScore)





