let game;

window.onload = function () {
  console.log("Page loaded. Initializing game setup...");
  const usernameInput = document.getElementById("username-input");
  usernameInput.value = "";

  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  if (startButton) {
    startButton.addEventListener("click", function () {
      if (usernameInput.value === "") {
        alert("Please enter a username before starting the game!");
        return;
      }

      console.log("Start button clicked. Initializing game...");

      let sound = new Audio("./audio/Music.wav");
      sound.volume = 0.7;
      sound.play();

      startGame();
    });
  }
  usernameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let sound = new Audio("./audio/Music.wav");
      sound.volume = 0.7;
      sound.play();

      startGame();
    }
  });
  function startGame() {
    game = new Game();
    console.log("Game instance created:", game);
    game.start();
    console.log("Game started successfully!");

    let bgMusic = new Audio("./audio/Music.wav");
    bgMusic.loop - true;
    bgMusic.volume = 0.7;
    bgMusic.play();
  }
  restartButton.addEventListener("click", function () {
    console.log("Restart button clicked. Reloading page...");
    let restartSound = new Audio("./audio/Music.wav");
    restartSound.volume = 0.7;
    restartSound.play();

    setTimeout(() => {
      location.reload();
    }, 500);
  });
};
