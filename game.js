var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber, randomchosenColor, level = 0,
  started = false;
var gamePattern = [],
  userPattern = [];



// //start Logic
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// nextSequence();
function nextSequence() {
  userPattern = [];
  level++;
  $("h1").text("Level :" + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(300).fadeIn(100);
  playSound(randomChosenColor);
}

// //keyPress Logic
// $(document).bind("keydown", function(e) {
//   userColor = e.key;
//   switch (userColor) {
//     case 'r':
//       userChosenColor = "red";
//       break;
//     case 'g':
//       userChosenColor = "green";
//       break;
//     case 'b':
//       userChosenColor = "blue";
//       break;
//     case 'y':
//       userChosenColor = "yellow";
//       break;
//     default:userChosenColor = "wrong";
//   }
//   playSound(userChosenColor);
//   ani(userChosenColor);
//   userPattern.push(userChosenColor);
//   wronCheck();
// });


//click Logic
$(".btn").click(function() {
  userChosenColor = $(this).attr('id');
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  ani(userChosenColor);
  wronCheck(userPattern.length - 1);
});

//CHeck Answer
function wronCheck(currLevel) {
  if (gamePattern[currLevel] === userPattern[currLevel]) {
    console.log("Success");
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    wron();
  }
}



function wron() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $("h1").text("Game Over!");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },200);
  setTimeout(function() {
    $("h1").text("Press any key to Restart!");
  },2000);
  $(document).keypress(reStart());
}

function reStart() {
level=0;
started=false;
userPattern=[];
gamePattern=[];
}

function playSound(s) {
  var audio = new Audio("sounds/" + s + ".mp3");
  audio.play();
}

function ani(a) {
  $("#" + a).fadeIn(100).fadeOut(300).fadeIn(100);
  $("#" + a).addClass("pressed");
  setTimeout(function() {
    $("#" + a).removeClass("pressed");
  }, 100);
}
