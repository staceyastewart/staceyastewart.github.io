console.log("linked")

let body = $('body')
let cardOne = $("#card1")
let cardTwo = $("#card2")
let cardThree = $("#card3")


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


// //tried to do the below with a for loop creating a variable each time but couldn't
// let round1Player1 = oneTurn()
// let fullTurn_1_1 = fullTurn
// console.log(fullTurn_1_1)
// // let round2Player1 = oneTurn()
// // let round3Player1 = oneTurn()
// // let round4Player1 = oneTurn()
// // let round5Player1 = oneTurn()
// // let round6Player1 = oneTurn()

// totalPlayer1Score.push(round1Player1)
// console.log("Player 1 score: " + totalPlayer1Score)
// console.log("Round 1: " + round1Player1)
// // totalPlayer1Score.push(round2Player1)
// // console.log("Player 1 score: " + totalPlayer1Score)
// // console.log("Round 2: " + round2Player1)


// //calling oneTurn again here adds the second player's turn to the fullTurn array in the function
// let round1Player2 = oneTurn()
// let fullTurn_1_2 = fullTurn
// console.log(fullTurn_1_2)
// // let round2Player2 = oneTurn()
// // let round3Player2 = oneTurn()
// // let round4Player2 = oneTurn()
// // let round5Player2 = oneTurn()
// // let round6Player2 = oneTurn()

// totalPlayer2Score.push(round1Player2)
// console.log("Player 1 score: " + totalPlayer2Score)
// console.log("Round 1: " + round1Player2)




//below is now looping but there is some kind of off by one error

$("#button").on("click", function(event) {
    //hiding the button below is causing the dice and the other button to shift up on the div. Fix later
    //found fix on StackOverflow css: visibility
    //to reverse this, use visibility: visible
    $("#opponentButton").css("visibility", "hidden");
    // console.log(fullTurn_1_1[0]);
    cardOne.text(fullTurn_1_1[0][0])
    cardTwo.text(fullTurn_1_1[0][1])
    cardThree.text(fullTurn_1_1[0][2])

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
      //this is where I need to put something that changes the item that the score is listed in each time
      // $(".gameInPlay:first")
      //can use above and then remove the class attribute immediatey after
      // $("#scoreboard table tbody tr:nth-child(2) td:nth-child(2)").text(round1Player1)
      $(".gameInPlay:first").text(round1Player1);
      $(".gameInPlay:first").removeClass("gameInPlay")

      $("#opponentButton").css("visibility", "visible")



      $("#opponentButton").on("click", function(event) {
        cardOne.text(fullTurn_1_2[0][0])
        cardTwo.text(fullTurn_1_2[0][1])
        cardThree.text(fullTurn_1_2[0][2])
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
        if(fullTurn_1_2.length === 0) {
          $("#messages").text("Your opponent didn't score on this roll. They scored " + round1Player2 + " points this round. It's now your turn again!")
          // $("#scoreboard table tbody tr:nth-child(2) td:nth-child(3)").text(round1Player2)
          $(".gameInPlay:first").text(round1Player1);
          $(".gameInPlay:first").removeClass("gameInPlay")
          $("#opponentButton").css("visibility", "hidden")
          $("#button").show()
          roundNumber++;
          if (roundNumber>6) {
            return;
          }else{
            createRound();
          }
        }
      })
    }
  }
);








