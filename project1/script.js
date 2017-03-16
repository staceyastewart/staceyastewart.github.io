//this is the player two AI branch


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

//all the variables I needed to define outside of functions
let roundNumber = 1
let playerRoll = []
let fullTurn = []
let totalPlayer1Score = []
let totalPlayer2Score = []
let fullTurn_1_1 = [];
let fullTurn_1_2 = [];
let round1Player1 = 0;
let round1Player2 = 0;

//below creates one turn for one player in one round
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
    return sum
}

//below creates all that is needed in each round
let createRound = function() {
  round1Player1 = oneTurn();
  fullTurn_1_1 = fullTurn;
  totalPlayer1Score.push(round1Player1);
  console.log("Player 1 score: " + totalPlayer1Score);
  console.log("Round 1: " + round1Player1);
  round1Player2 = oneTurn();
  fullTurn_1_2 = fullTurn;
  totalPlayer2Score.push(round1Player2);
  console.log("Player 2 score: " + totalPlayer2Score);
  console.log("Round 1: " + round1Player2);
}

createRound()


//below checks if player two's array is enpty to start the next round
let checkForNextRound = function () {
  if(fullTurn_1_2.length == 0) {
    roundNumber++;
    if (roundNumber>6) {
      //do nothing
    }else{
      $("#round").text("Round " + roundNumber)
      createRound();
    }
  }
}


//below assigns the photo for each die
let setDicePhoto = function() {
  //this function is too lengthy
  //can I use a switch below??
  //could I use a loop somehow?
  //could put the three dice into an array and loop through each

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
  } else {
    // $("#cardOne").css("visibility", "hidden")
    document.getElementById("cardOne").className=""
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
  } else {
    // $("#cardTwo").css("visibility", "hidden")
    document.getElementById("cardTwo").className=""
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
  } else {
    // $("#cardThree").css("visibility", "hidden")
    document.getElementById("cardThree").className=""
  }
}




//Below makes the dice "roll" when hovered over
//BUG: does not work in full-screen mode sometimes. But only sometimes!!
//used something I found on StackOverflow to help with this section: http://stackoverflow.com/questions/18544237/keep-calling-on-a-function-while-mouseover

let keepRolling = function() {
  cardOne.text(getRandomInteger(1,7))
  cardTwo.text(getRandomInteger(1,7))
  cardThree.text(getRandomInteger(1,7))
};

let stopRolling = function() {
  cardOne.text(0)
  cardTwo.text(0)
  cardThree.text(0)
};

let test =
$("#button").mouseover(function(){
  // setInterval(keepRolling(), 500)
  test = setInterval(function() {
    keepRolling()
    setDicePhoto()
  }, 150)
})

$("#button").mouseout(function() {
  clearInterval(test)
  stopRolling()
  setDicePhoto()
})

let test2 =
$("#opponentButton").mouseover(function(){
  test2 = setInterval(function() {
    keepRolling()
    setDicePhoto()
  }, 150)
})

$("#opponentButton").mouseout(function() {
  clearInterval(test2)
  stopRolling()
  setDicePhoto()
})


//below is from the jquery ui library, which Ben reccommended
//Creates a bounce effect on the dice when they are "thrown"
$("#button").click(function() {
  $("#cardPlate").effect( "bounce", {times: 3}, "fast" );
  clearInterval(test)
});

$("#opponentButton").click(function() {
  $("#cardPlate").effect( "bounce", {times: 3}, "fast" );
  clearInterval(test2)
});


//PLAYER 1 BUTTON
$("#button").on("click", function(event) {
    clearInterval(test)
    checkForNextRound()
    //found on StackOverflow (css: visibility)
    $("#opponentButton").css("visibility", "hidden");
    if (fullTurn_1_1.length > 0) {
      cardOne.text(fullTurn_1_1[0][0])
      cardTwo.text(fullTurn_1_1[0][1])
      cardThree.text(fullTurn_1_1[0][2])
    }
    setDicePhoto()

     if(fullTurn_1_1[0][0] === fullTurn_1_1[0][1] && fullTurn_1_1[0][1] === fullTurn_1_1[0][2]) {
      if (fullTurn_1_1[0][0] === roundNumber) {
        $("#messages").text("Player 1 rolled: "+ fullTurn_1_1[0][0] + ", " + fullTurn_1_1[0][1] + ", " + fullTurn_1_1[0][2] + ". Bunco! Player 1 scored 21 points! Please roll again.")
      } else {
        $("#messages").text("Player 1 rolled: "+ fullTurn_1_1[0][0] + ", " + fullTurn_1_1[0][1] + ", " + fullTurn_1_1[0][2] + ". Three of a kind! Player 1 scored 5 points. Please roll again.")
      }
    }else {
      let scoreCount = 0
      for (var i = 0; i < fullTurn_1_1[0].length; i++) {
        if (fullTurn_1_1[0][i] === roundNumber) {
          scoreCount++
          }
        }
        $("#messages").text("Player 1 rolled: "+ fullTurn_1_1[0][0] + ", " + fullTurn_1_1[0][1] + ", " + fullTurn_1_1[0][2] + ". Player 1 scored " + scoreCount + ". Please roll again.")
      }
    fullTurn_1_1.shift()

    if (fullTurn_1_1.length == 0) {
      //if the array is empty, it is the next player's turn
      $("#messages").text("Because Player 1 didn't roll a " + roundNumber + ", Player 1 didn't score on this turn. Player 1 scored " + round1Player1 + " points this round. It is now Player 2's turn.")
      $("#button").css("visibility", "hidden")
      $(".gameInPlay:first").text(round1Player1);
      $(".gameInPlay:first").removeClass("gameInPlay")
      $("#opponentButton").css("visibility", "visible")
    }
  }
);


//PLAYER 2 BUTTON
$("#opponentButton").on("click", function(event) {
  clearInterval(test2)
  cardOne.text(fullTurn_1_2[0][0])
  cardTwo.text(fullTurn_1_2[0][1])
  cardThree.text(fullTurn_1_2[0][2])

  setDicePhoto()

  if(fullTurn_1_2[0][0] === fullTurn_1_2[0][1] && fullTurn_1_2[0][1] === fullTurn_1_2[0][2]) {
    if (fullTurn_1_2[0][0] === roundNumber) {
      $("#messages").text("Player 2 rolled: "+ fullTurn_1_2[0][0] + ", " + fullTurn_1_2[0][1] + ", " + fullTurn_1_2[0][2] + ". Bunco! Player 2 scored 21 points! Please roll again.")
    } else {
      $("#messages").text("Player 2 rolled: "+ fullTurn_1_2[0][0] + ", " + fullTurn_1_2[0][1] + ", " + fullTurn_1_2[0][2] + ". Three of a kind! Player 2 scored 5 points. Please roll again.")
    }
  }else {
    let scoreCount = 0
    for (var i = 0; i < fullTurn_1_2[0].length; i++) {
      if (fullTurn_1_2[0][i] === roundNumber) {
        scoreCount++
        }
      }
      $("#messages").text("Player 2 rolled: "+ fullTurn_1_2[0][0] + ", " + fullTurn_1_2[0][1] + ", " + fullTurn_1_2[0][2] + ". Player 2 scored " + scoreCount + ". Please roll again.")
    }
  fullTurn_1_2.shift()
  if(fullTurn_1_2.length == 0) {
    $("#messages").text("Because Player 2 didn't roll a " + roundNumber + ", Player 2 didn't score on this roll. They scored " + round1Player2 + " points this round. It's the end of this round. Please click 'Roll Your Dice' to begin the next round!")
    console.log(round1Player2)
    $(".gameInPlay:first").text(round1Player2);
    $(".gameInPlay:first").removeClass("gameInPlay")
    $("#opponentButton").css("visibility", "hidden")
    $("#button").css("visibility", "visible")
    //should probably append a new button instead of using the same button
    if (roundNumber === 6 && fullTurn_1_2.length == 0) {
      // $("#button").text("WHO WON?")
      $("#button").css("visibility", "hidden")
      $("#cardPlate").css("visibility", "visible")
      $("#endOfGame").css("visibility", "visible")
    }
    return;
  }
})


//Happens when the game finished and the end of game button is clicked
$("#endOfGame").on("click", function(event) {
    $("#button").hide()
    cardOne.remove();
    cardTwo.remove();
    cardThree.remove();
    $("#refresh").css("visibility", "visible")
    $("#messages").remove();
    //As stated above, took the below reduce function from MDN
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
      cardPlate.text("Player 1 won!")
      $("#round").text("Congrats to Player 1!")
    } else if (player2FinalScore > player1FinalScore) {
      //do something to alert the user that they lost
      cardPlate.text("Player 2 won!")
      $("#round").text("Congrats to Player 2!")
    } else {
      //let the user know they tied
      cardPlate.text("You tied!")
      $("#round").text("Please play again!")
  }
})



//THINGS TO WORK ON
//
// better alert for the conclusion of the game because it is anti-climactic
// try to make the opponent's hand play without clicks





