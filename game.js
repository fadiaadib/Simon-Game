var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];
var level = 0;

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animateButton(name) {
    $("#" + name).addClass("pressed");
    setTimeout(() => $("#" + name).removeClass("pressed"), 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    clickPattern = [];

    $(document).on("keydown", startGame);
}

function startGame() {
    $(document).off("keydown");

    nextSequence();
}

function nextSequence() {
    let randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);

    clickPattern = [];
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == clickPattern[currentLevel]) {
        if (gamePattern.length == clickPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        $("body").addClass("red");
        setTimeout(() => $("body").removeClass("red"), 200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    clickPattern.push(userChosenColour);

    animateButton(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(clickPattern.length - 1);
});

startOver();

