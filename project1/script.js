console.log("linked")

let body = $('body')
let cardOne = $("#cardOne")
let cardTwo = $("#cardTwo")
let cardThree = $("#cardThree")
let cardPlate = $("#cardPlate")


//grabbed the below random integer formula from MDN
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let roundNumber = 1
let playerRoll = []
let fullTurn = []
let totalPlayer1Score = []
let totalPlayer2Score = []
let fullTurn_1_1 = [];
let fullTurn_1_2 = [];
let round1Player1 = 0;
let round1Player2 = 0;

//check the dice should tell the player when they get points
let oneTurn = function() {
  let Score = 1;
  fullTurn = [];
  playerScore = [];
  while (Score > playerScore.length){
    let rollTheDice = function() {
      for (var i = 0; i < 3; i++) {
        playerRoll.push(getRandomInteger(1,7))
      }
      fullTurn.push(playerRoll)
    };
    rollTheDice();
    console.log(playerRoll)
     if(playerRoll[0] === playerRoll[1] && playerRoll[1] === playerRoll[2]) {
      if (playerRoll[0] === roundNumber) {
        //three of a kind of the target number
        //this is a "bunco"
        playerScore.push(21)
        Score++;
      } else {
        //three of a kind of a number other than target
        playerScore.push(5)
        Score++;
      }
    }else if(playerRoll[0] !== roundNumber && playerRoll[1] !== roundNumber && playerRoll[2] !== roundNumber) {
      Score -= 1;
      //go to next player
    } else {
      //add up the number of times the target number appears
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
    console.log("full turn array" + fullTurn)
    console.log("Points this round " + sum)
    return sum
}


let createRound = function() {
  round1Player1 = oneTurn();
  fullTurn_1_1 = fullTurn;
  totalPlayer1Score.push(round1Player1);
  console.log(fullTurn_1_1);
  console.log("Player 1 score: " + totalPlayer1Score);
  console.log("Round 1: " + round1Player1);
  round1Player2 = oneTurn();
  fullTurn_1_2 = fullTurn;
  totalPlayer2Score.push(round1Player2);
  console.log("Player 1 score: " + totalPlayer2Score);
  console.log("Round 1: " + round1Player2);
  console.log(fullTurn_1_2);
}

createRound()



//how do I make the below constantly check within my event listener
//tried a setInterval but that's a disaster
let checkForNextRound = function () {
  if(fullTurn_1_2.length == 0) {
    roundNumber++;
    if (roundNumber>6) {
      //do nothing
      $("#button").hide()
      cardOne.remove();
      cardTwo.remove();
      cardThree.remove();
      let player1FinalScore = totalPlayer1Score.reduce(function(acc, val) {
          return acc+val;
        }, 0)
      let player2FinalScore = totalPlayer2Score.reduce(function(acc, val) {
          return acc+val;
        }, 0)
      console.log(player1FinalScore)
      console.log(player2FinalScore)
      if (player1FinalScore > player2FinalScore) {
        //do something to alert the user they won
        cardPlate.text("YOU WON!")
      } else if (player2FinalScore > player1FinalScore) {
        //do something to alert the user that they lost
        cardPlate.text("You lost :(")
      } else {
        //let the user know they tied
        cardPlate.text("You tied!")
      }
    }else{
      createRound();
    }
  }
}



let setDicePhoto = function() {
  //can I use a switch below??
  //could I use a loop somehow?
  //could put the three cards into an array and loop through each

  //cardOne
  if (document.getElementById("cardOne").innerText == 1) {
    document.getElementById("cardOne").className="dice1"
  } else if (document.getElementById("cardOne").innerText == 2) {
    document.getElementById("cardOne").className="dice2"
  } else if (document.getElementById("cardOne").innerText == 3) {
    document.getElementById("cardOne").className="dice3"
  } else if (document.getElementById("cardOne").innerText == 4) {
    document.getElementById("cardOne").className="dice4"
  } else if (document.getElementById("cardOne").innerText == 5) {
    document.getElementById("cardOne").className="dice5"
  } else if (document.getElementById("cardOne").innerText == 6) {
    document.getElementById("cardOne").className="dice6"
  }
  //cardTwo
    if (document.getElementById("cardTwo").innerText == 1) {
    document.getElementById("cardTwo").className="dice1"
  } else if (document.getElementById("cardTwo").innerText == 2) {
    document.getElementById("cardTwo").className="dice2"
  } else if (document.getElementById("cardTwo").innerText == 3) {
    document.getElementById("cardTwo").className="dice3"
  } else if (document.getElementById("cardTwo").innerText == 4) {
    document.getElementById("cardTwo").className="dice4"
  } else if (document.getElementById("cardTwo").innerText == 5) {
    document.getElementById("cardTwo").className="dice5"
  } else if (document.getElementById("cardTwo").innerText == 6) {
    document.getElementById("cardTwo").className="dice6"
  }
  //cardThree
  if (document.getElementById("cardThree").innerText == 1) {
    document.getElementById("cardThree").className="dice1"
  } else if (document.getElementById("cardThree").innerText == 2) {
    document.getElementById("cardThree").className="dice2"
  } else if (document.getElementById("cardThree").innerText == 3) {
    document.getElementById("cardThree").className="dice3"
  } else if (document.getElementById("cardThree").innerText == 4) {
    document.getElementById("cardThree").className="dice4"
  } else if (document.getElementById("cardThree").innerText == 5) {
    document.getElementById("cardThree").className="dice5"
  } else if (document.getElementById("cardThree").innerText == 6) {
    document.getElementById("cardThree").className="dice6"
  }
}

//major bugs fixed
//goes through the game for all 6 rounds and logs the player's scores each time correctly
//still needs to alert the winner/loser at the end

$("#button").on("click", function(event) {
    checkForNextRound()
    //found on StackOverflow css: visibility
    $("#opponentButton").css("visibility", "hidden");
    // console.log(fullTurn_1_1[0]);
    cardOne.text(fullTurn_1_1[0][0])
    cardTwo.text(fullTurn_1_1[0][1])
    cardThree.text(fullTurn_1_1[0][2])

    setDicePhoto()

     if(fullTurn_1_1[0][0] === fullTurn_1_1[0][1] && fullTurn_1_1[0][1] === fullTurn_1_1[0][2]) {
      if (fullTurn_1_1[0][0] === roundNumber) {
        $("#messages").text("Bunco! You scored 21 points! Please roll again.")
      } else {
        $("#messages").text("Three of a kind! You scored 5 points. Please roll again.")
      }
    }else {
      let scoreCount = 0
      for (var i = 0; i < fullTurn_1_1[0].length; i++) {
        if (fullTurn_1_1[0][i] === roundNumber) {
          scoreCount++
          }
        }
        $("#messages").text("You scored " + scoreCount + ". Please roll again.")
      }
    fullTurn_1_1.shift()

    if (fullTurn_1_1.length == 0) {
      //if the array is empty, it is the next player's turn
      //so this need to start the functions over again
      $("#messages").text("You didn't score on this turn. You scored " + round1Player1 + " points this round. It is now your opponent's turn.")
      $("#button").hide()
      $(".gameInPlay:first").text(round1Player1);
      $(".gameInPlay:first").removeClass("gameInPlay")
      $("#opponentButton").css("visibility", "visible")



      $("#opponentButton").on("click", function(event) {
        //below card assignment is throwing a console error when the array is empty. Doesn't seem to affect the game but should probably fix anyway
        cardOne.text(fullTurn_1_2[0][0])
        cardTwo.text(fullTurn_1_2[0][1])
        cardThree.text(fullTurn_1_2[0][2])

        setDicePhoto()

        if(fullTurn_1_2[0][0] === fullTurn_1_2[0][1] && fullTurn_1_2[0][1] === fullTurn_1_2[0][2]) {
          if (fullTurn_1_2[0][0] === roundNumber) {
            $("#messages").text("Bunco! Your opponent scored 21 points! Please roll again.")
          } else {
            $("#messages").text("Three of a kind! Your opponent scored 5 points. Please roll again.")
          }
        }else {
          let scoreCount = 0
          for (var i = 0; i < fullTurn_1_2[0].length; i++) {
            if (fullTurn_1_2[0][i] === roundNumber) {
              scoreCount++
              }
            }
            $("#messages").text("Your opponent scored " + scoreCount + ". Please roll again.")
          }
        fullTurn_1_2.shift()
        if(fullTurn_1_2.length == 0) {
          $("#messages").text("Your opponent didn't score on this roll. They scored " + round1Player2 + " points this round. It's the end of this round. Please click 'Roll Your Dice' to begin the next round!")
          console.log(round1Player2)
          $(".gameInPlay:first").text(round1Player2);
          $(".gameInPlay:first").removeClass("gameInPlay")
          $("#opponentButton").css("visibility", "hidden")
          $("#button").show()
          //this is happening before showing player 2's last round
          if (roundNumber === 6 && fullTurn_1_2.length == 0) {
            $("#button").text("WHO WON?")
          }
          return;
        }
      })
    }
  }
);



//THING TO WORK ON
//
//
// should display the round number somewhere
//Should have a title for the page





