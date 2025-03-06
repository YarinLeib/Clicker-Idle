class Game {
  constructor() {
    //screenControl
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");

    //player setup
    this.username = "";
    this.player = new Player();
    this.lives = document.getElementById("lives");

    //monster setup
    this.baseMonsterHp = 100;
    this.monsterHP = this.baseMonsterHp;
    this.monsterCount = 0;
    this.maxMonster = 6;
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
    document.getElementById("game-info").style.display = "block";

    this.gameScreen.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON" && this.canAttack) {
        this.player.attack(this.monster);

        if (this.monsterHP <= 0 && this.bossTimerInterval) {
          clearInterval(this.bossTimerInterval);
          this.bossTimer.style.display = "none";
          console.log("Boss killed! Timer stopped");
        }
      }
    });
  }

  spawnMonster() {
    if (this.monsterCount >= this.maxMonster) {
      this.endGame();
      return;
    }
    this.canAttack = false;
    this.monsterCount++;

    if (this.bossTimerInterval) {
      clearInterval(this.bossTimerInterval);
      this.bossTimerInterval = null;
    }

    this.bossTimer = document.getElementById("bossTimer");
    this.bossTimer.style.display = "none";

    if (this.monsterCount % 3 === 0) {
      this.bossTimer.style.display = "block";

      this.bossTimerFill = document.getElementById("bossTimerFill");
      this.bossTimerText = document.getElementById("bossTimerText");

      this.bossTimerFill.style.width = "100%";
      this.bossTimerText.textContent = "Boss Timer 30";
      let bossTime = 30;

      this.bossTimerInterval = setInterval(() => {
        console.log(`Time left for boss: ${bossTime} sec`);
        bossTime--;

        this.bossTimerText.textContent = "Boss Timer " + bossTime;
        let fillPercentage = (bossTime / 30) * 100;

        this.bossTimerFill.style.width = fillPercentage + "%";

        if (this.monsterHP <= 0) {
          clearInterval(this.bossTimerInterval);
          console.log("Boss killed! Timer stopped.");
          this.bossTimer.style.display = "none";
        } else if (bossTime <= 0) {
          clearInterval(this.bossTimerInterval);
          console.log("Time's up! Boss battle ended.");
          this.bossTimer.style.display = "none";

          if (this.monsterCount > 0) {
            this.monsterCount -= 2;
            this.player.lives--;

            this.lives.textContent = this.player.lives;

            if (this.monsterCount % 3 === 1) {
              this.monsterHP = Math.floor(this.monsterCount / 3) * 300 + 100;
            } else {
              this.monsterHP = this.baseMonsterHp + this.monsterCount * 75;
            }

            this.monster = new Monster(this.monsterHP);

            document.getElementById("healthMob").textContent = this.monsterHP;

            if (this.player.lives <= 0) {
              this.endGame();
            }

            console.log(
              `Boss kill failed! Returning to monster ${this.monsterCount}`
            );
            this.updateMonsterCount();
          }
        }
      }, 1000);
    }

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
    document.getElementById("game-info").style.display = "none";
    this.gameEndScreen.style.display = "block";
    if (this.monsterCount >= this.maxMonster) {
      document.getElementById("gameWin").style.display = "block";
      document.getElementById("gameLose").style.display = "none";
    } else {
      document.getElementById("gameWin").style.display = "none";
      document.getElementById("gameLose").style.display = "block";
    }
  }
}

function spawnMonster() {
  if (game) {
    game.spawnMonster();
  }
}
