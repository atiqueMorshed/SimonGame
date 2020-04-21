var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickPattern = new Array();
var level = 0;
var started = true;
function nextSequence() {
  level++;
  $("h1#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("game: "+ gamePattern);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  soundPlay(randomChosenColor);
}

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  console.log("user: "+ userClickPattern);
  soundPlay(userChosenColor);
  animateColor(userChosenColor);
  var out = checkAnswer(userClickPattern.length-1);
  if(out == true && userClickPattern.length == gamePattern.length) {
    userClickPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
});
function soundPlay(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animateColor(color) {
  $("#"+color).addClass("pressed");
  setTimeout(function() {
    $("#"+color).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function(event) {
  if(started) {
    started = false;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if(userClickPattern[currentLevel] != gamePattern[currentLevel]) {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      soundPlay("wrong");
    }, 200);
    level = 0;
    $("h1#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickPattern = [];
    console.log(gamePattern);
    console.log(userClickPattern);
    started = true;
    return false;
  }
  return true;
}








// var buttonColors = ["red", "blue", "green", "yellow"];
// var gamePattern = new Array();
// $(document).keydown(
//   function() {
//     var randomNumber = Math.floor(Math.random()*4);
//     var randomChosenColor = buttonColors[randomNumber];
//     gamePattern.push(randomChosenColor);
//     // $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
//     for(var i = 0; i< gamePattern.length; i++) {
//       $(document).delay(1000);
//       console.log(gamePattern);
//       $("#"+gamePattern[i]).delay("slow").fadeOut(100).fadeIn(100);
//     }
//   });
// $("document").ready(function() {
//   var blue = document.createElement("audio");
//   blue.src = "sounds/blue.mp3";
//
//   // var green = document.createElement("audio");
//   // green.src = "sounds/green.mp3";
//   //
//   // var red = document.createElement("audio");
//
// });
