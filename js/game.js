class Game {
  constructor() {
    //screenControl
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");

    //player setup
    this.username = "";
    this.player = new Player();

    //monster setup
    this.baseMonsterHp = 100;
    this.monsterHP = this.baseMonsterHp;
    this.monsterCount = 0;
    this.maxMonster = 9;
    this.canAttack = true;
    this.spawnMonster();

    //game control settings
    this.gameIsOver = false;
    this.gameIntervalId = null;
  }

  start() {
    const usernameInput = document.getElementById("username-input");
    this.username = usernameInput.value || "player";

    const usernameDisplay = document.getElementById("username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = `${this.username} (Strength: ${this.player.strength})`;
    }

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameScreen.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON" && this.canAttack) {
        this.player.attack(this.monster);
      }
    });
  }

  spawnMonster() {
    if (this.monsterCount >= this.maxMonster) {
      this.endGame();
      return;
    }
    this.canAttak = false;
    this.monsterCount++;

    let extraHp = 0;
    if (this.monsterCount % 3 === 0) {
      extraHp = (this.monsterCount / 3) * 1000;
    } else {
      if (this.monsterCount === 1) {
        this.monsterHP = 100;
      } else {
        this.monsterHP = this.baseMonsterHp + this.monsterCount * 75;
      }
    }
    setTimeout(() => {
      this.monster = new Monster(this.monsterHP + extraHp);
      this.canAttack = true;
      this.updateMonsterCount();
    }, 500);
  }

  updateMonsterCount() {
    const monsterCounter = document.getElementById("monsterCount");
    if (monsterCounter) {
      monsterCounter.textContent = `Monster ${this.monsterCount}/${this.maxMonster}`;
    }
  }

  endGame() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}

function spawnMonster() {
  if (game) {
    game.spawnMonster();
  }
}
