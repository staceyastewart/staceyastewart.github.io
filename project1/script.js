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



//DAY 1:
//Have created most of the game logic for one round
//Still need to alert the user to each roll of the dice and the points awarded for each toss. Would like to avoid using alerts if possible because they're so annoying
//Need to figure out a way to delay the execution in my while loop. Maybe a click event for each throw of the dice?




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

let fullTurn = []

//check the dice should tell the player when they get points
let oneTurn = function() {
  let Score = 1;
  while (Score > playerScore.length){
    let rollTheDice = function() {
      for (var i = 0; i < 3; i++) {
        playerRoll.push(getRandomInteger(1,7))
      }
      fullTurn.push(playerRoll)
    };
    //can I create a click event in this while loop so that the user has to click to throw the dice again? I want to delay it spitting out all the throws at once
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
      //go to next player >> this should break the while loop
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
    //took the below reduce function from MDN
    let sum = playerScore.reduce(function(acc, val) {
      return acc+val;
    }, 0)
    console.log("full turn " + fullTurn)
    return sum
}


let totalPlayerScore = []

let round1Player1 = oneTurn()
totalPlayerScore.push(round1Player1)

console.log("Player score: " + totalPlayerScore)
console.log("Round 1: " + round1Player1)



//need to use fullTurn array of arrays to interact with clicks and to show the user their score

//maybe can do a function that only ever calls the first index of the array and then I delete it after every single roll until there are no more
//apparantly can use the shift() method on the array to remove the first element

let cardOne = $("#card1")
let cardTwo = $("#card2")
let cardThree = $("#card3")


//below completes player 1 round 1
$("#button").on("click", function(event) {
    //hiding the button below is causing the dice and the other button to shift up on the div. Fix later
    //found fix on StackOverflow css: visibility
    //to reverse this, use visibility: visible
    $("#opponentButton").css("visibility", "hidden");
    console.log(fullTurn[0]);
    cardOne.text(fullTurn[0][0])
    cardTwo.text(fullTurn[0][1])
    cardThree.text(fullTurn[0][2])

     if(fullTurn[0][0] === fullTurn[0][1] && fullTurn[0][1] === fullTurn[0][2]) {
      if (fullTurn[0][0] === roundNumber) {
        $("#messages").text("Bunco! You scored 21 points! Please roll again.")
      } else {
        $("#messages").text("Three of a kind! You scored 5 points. Please roll again.")
      }
    }else {
      let scoreCount = 0
      for (var i = 0; i < fullTurn[0].length; i++) {
        if (fullTurn[0][i] === roundNumber) {
          scoreCount++
          }
        }
        $("#messages").text("You scored " + scoreCount + ". Please roll again.")
      }

    fullTurn.shift()
    if (fullTurn.length == 0) {
      //if the array is empty, it is the next player's turn
      //so this need to start the functions over again
      $("#messages").text("You didn't score on this turn. You scored " + round1Player1 + " points this round. It is now your opponent's turn.")
      $("#button").hide()
      $("#scoreboard > table > tbody > tr:nth-child(2) > td:nth-child(2)").text(round1Player1)
      $("#opponentButton").css("visibility", "visible")
    }
  }
);




