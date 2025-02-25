let game;

window.onload = function () {
  document.getElementById("username-input").value = "";

  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();
  }
  restartButton.addEventListener("click", function () {
    location.reload();
  });
};
