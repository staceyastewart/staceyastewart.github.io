$(document).ready(function(){

let body = $('body')
let cardPlate = $("#cardPlate")
let dieOne = $("#cardOne")
let dieTwo = $("#cardTwo")
let dieThree = $("#cardThree")
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
let numberofPlayers = 0;


function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let rollTheDice = function() {
  for (var i = 0; i < 3; i++) {
    playerRoll.push(getRandomInteger(1,7))
  }
  fullTurn.push(playerRoll)
};

//below creates one turn for one player in one round
let oneTurn = function() {
  let Score = 1;
  fullTurn = [];
  playerScore = [];
  while (Score > playerScore.length){
    rollTheDice();
     if(playerRoll[0] === playerRoll[1] && playerRoll[1] === playerRoll[2]) {
      if (playerRoll[0] === roundNumber) {
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
  round1Player2 = oneTurn();
  fullTurn_1_2 = fullTurn;
  totalPlayer2Score.push(round1Player2);
}
createRound()

//below assigns the photo for each die
let setEachDicePhoto = function(die) {
  if(die.text() === "0"){
    die.removeClass();
  } else{
    die.removeClass().addClass(`dice${die.text()}`)
  }
}

let setDicePhoto = function(){
  setEachDicePhoto(dieOne)
  setEachDicePhoto(dieTwo)
  setEachDicePhoto(dieThree)
}

//below lets the player pick between two player and one player game

let startOfGame = function(){
  $("#button").css("visibility", "visible");
  $("#onePlayerGame").remove();
  $("#twoPlayerGame").remove();
  $("#messages").text("Player 1, please roll the dice to start the game!");
}

$("#onePlayerGame").on('click',  function(event) {
  numberofPlayers = 1;
  startOfGame();
});

$("#twoPlayerGame").on('click',  function(event) {
  numberofPlayers = 2;
  startOfGame();
});

//Below makes the dice "roll" when hovered over
let keepRolling = function() {
  dieOne.text(getRandomInteger(1,7))
  dieTwo.text(getRandomInteger(1,7))
  dieThree.text(getRandomInteger(1,7))
};

let stopRolling = function() {
  dieOne.text(0)
  dieTwo.text(0)
  dieThree.text(0)
};

let interval_id;

let startRolling = function(){
  return setInterval(function() {
      keepRolling()
      setDicePhoto()
    }, 150);
}

let ceaseRolling = function(interval_id){
  clearInterval(interval_id);
}

$("#button").on("mouseover", function(){
  interval_id = startRolling();
});

$("#button").on("mouseout", function(){
  ceaseRolling(interval_id);
  stopRolling();
  setDicePhoto();
});

$("#opponentButton").on("mouseover", function(){
  interval_id = startRolling();
});

$("#opponentButton").on("mouseout", function(){
  ceaseRolling(interval_id);
  stopRolling();
  setDicePhoto();
});

//when called, the below runs through one full turn of AI
let computerOneTurn = function() {
  dieOne.text(fullTurn_1_2[0][0])
  dieTwo.text(fullTurn_1_2[0][1])
  dieThree.text(fullTurn_1_2[0][2])
  setDicePhoto()
  $("#cardPlate").effect( "bounce", {times: 3}, "fast" );
  if(fullTurn_1_2[0][0] === fullTurn_1_2[0][1] && fullTurn_1_2[0][1] === fullTurn_1_2[0][2]) {
    if (fullTurn_1_2[0][0] === roundNumber) {
      $("#messages").text("Player 2 rolled: "+ fullTurn_1_2[0][0] + ", " + fullTurn_1_2[0][1] + ", " + fullTurn_1_2[0][2] + ". Bunco! Player 2 scored 21 points! They will roll again.")
    } else {
      $("#messages").text("Player 2 rolled: "+ fullTurn_1_2[0][0] + ", " + fullTurn_1_2[0][1] + ", " + fullTurn_1_2[0][2] + ". Three of a kind! Player 2 scored 5 points. They will roll again.")
    }
  }else {
    let scoreCount = 0
    for (var i = 0; i < fullTurn_1_2[0].length; i++) {
      if (fullTurn_1_2[0][i] === roundNumber) {
        scoreCount++
        }
      }
      $("#messages").text("Player 2 rolled: "+ fullTurn_1_2[0][0] + ", " + fullTurn_1_2[0][1] + ", " + fullTurn_1_2[0][2] + ". Player 2 scored " + scoreCount + ". They will roll again.")
    }
  fullTurn_1_2.shift()
  if(fullTurn_1_2.length == 0) {
  $("#messages").text("Because Player 2 didn't roll a " + roundNumber + ", Player 2 didn't score on this roll. They scored " + round1Player2 + " points this round. It's the end of this round. Please click 'Roll Your Dice' to begin the next round!")
  console.log(round1Player2)
  $(".gameInPlay:first").text(round1Player2);
  $(".gameInPlay:first").removeClass("gameInPlay")
  $("#opponentButton").css("visibility", "hidden")
  $("#button").css("visibility", "visible")
  if (roundNumber === 6 && fullTurn_1_2.length == 0) {
    $("#button").css("visibility", "hidden")
    $("#cardPlate").css("visibility", "visible")
    $("#endOfGame").css("visibility", "visible")
  }
  return;
}
}

//after trying multiple methods to do the setTimeout in a loop, this stackoverflow post REALLY helped:
//http://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values
//setting the timeout * the variable i is amazingly helpful

let artificialIntelligence = function() {
  for (var i = 0; i < fullTurn_1_2.length; i++) {
    setTimeout(computerOneTurn, 3000 * i)
  }
}

let delayStartOfAI = function() {
    setTimeout(artificialIntelligence, 4000)
}

//Creates a bounce effect on the dice when they are "thrown"
$("#button").click(function() {
  $("#cardPlate").effect( "bounce", {times: 3}, "fast" );
  clearInterval(interval_id);
});

$("#opponentButton").click(function() {
  $("#cardPlate").effect( "bounce", {times: 3}, "fast" );
  clearInterval(interval_id);
});


//PLAYER 1 BUTTON
$("#button").on("click", function(event) {
    clearInterval(interval_id);
    checkForNextRound()
    $("#opponentButton").css("visibility", "hidden");
    if (fullTurn_1_1.length > 0) {
      dieOne.text(fullTurn_1_1[0][0])
      dieTwo.text(fullTurn_1_1[0][1])
      dieThree.text(fullTurn_1_1[0][2])
    }
    setDicePhoto()
    eachPlayersTurn(fullTurn_1_1, 1, round1Player1)



  }
);

//PLAYER 2 BUTTON FOR TWO PLAYER GAME
$("#opponentButton").on("click", function(event) {
  clearInterval(interval_id);
  dieOne.text(fullTurn_1_2[0][0])
  dieTwo.text(fullTurn_1_2[0][1])
  dieThree.text(fullTurn_1_2[0][2])
  setDicePhoto()
  eachPlayersTurn(fullTurn_1_2, 2, round1Player2)

})





let eachPlayersTurn = function(player_arr, player_number, round_score){
  let userMessage = `Player ${player_number} rolled: ${player_arr[0][0]}, ${player_arr[0][1]}, ${player_arr[0][2]}.`
  let endMessage = `Because Player ${player_number} didn't roll a ${roundNumber}, Player ${player_number} didn't score on this roll. They scored ${round_score} points this round.`
  let endMessage2Player = "It's the end of this round. Please click 'Roll Your Dice' to begin the next round!"
  let endMessage1Player = "The computer will roll in three seconds."
  if(player_arr[0][0] === player_arr[0][1] && player_arr[0][1] === player_arr[0][2]) {
    if (player_arr[0][0] === roundNumber) {
      $("#messages").text(`${userMessage} Bunco! Player ${player_number} scored 21 points! Please roll again.`)
    } else {
      $("#messages").text(`${userMessage} Three of a kind! Player ${player_number} scored 5 points. Please roll again.`)
    }
  }else {
    let scoreCount = 0
    for (var i = 0; i < player_arr[0].length; i++) {
      if (player_arr[0][i] === roundNumber) {
        scoreCount++
        }
      }
      $("#messages").text(`${userMessage} Player ${player_number} scored ${scoreCount}. Please roll again.`)
    }
  player_arr.shift()
  if(player_arr.length == 0) {
    $(".gameInPlay:first").text(round_score);
    $(".gameInPlay:first").removeClass("gameInPlay")
    //if player two is playing
    if(player_number == 2){
      $("#opponentButton").css("visibility", "hidden")
      $("#button").css("visibility", "visible")
      $("#messages").text(endMessage + endMessage2Player)
    } else if (player_number ==1){ //if player 1 is playing
      $("#button").css("visibility", "hidden")
      if (numberofPlayers === 1){
      $("#messages").text(endMessage + endMessage1Player)
        delayStartOfAI();
      } else if (numberofPlayers === 2) {
        $("#opponentButton").css("visibility", "visible");
      $("#messages").text(endMessage + endMessage2Player);
      }
    }
    if (roundNumber === 6 && player_arr.length == 0 && player_number == 2) {
      $("#button").css("visibility", "hidden")
      $("#cardPlate").css("visibility", "visible")
      $("#endOfGame").css("visibility", "visible")
    }
    return;
  }
}

//below checks if player two's array is empty to start the next round
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

//Happens when the game finished and the end of game button is clicked
$("#endOfGame").on("click", function(event) {
    $("#button").hide()
    dieOne.remove();
    dieTwo.remove();
    dieThree.remove();
    $("#refresh").css("visibility", "visible");
    $("#messages").remove();
    let player1FinalScore = totalPlayer1Score.reduce(function(acc, val) {
      return acc+val;
      }, 0)
    let player2FinalScore = totalPlayer2Score.reduce(function(acc, val) {
      return acc+val;
      }, 0)
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

}); // end closure








