class Player {
  constructor(coins = 0, manaPlayer = 100, strength = 70) {
    console.log("Initializing Player...");

    this.coins = coins;
    this.manaPlayer = manaPlayer;
    this.maxMana = 100;
    this.strength = strength;
    this.originalStrength = this.strength;
    this.resetAfterAttack = false;

    // Get the player image element
    this.playerElement = document.getElementById("player-img");

    if (this.playerElement) {
      this.playerElement.src = "./images/Attack1.png";
    }

    // List of attack images
    this.attackImages = [
      "./images/Attack1.png",
      "./images/Attack2.png",
      "./images/Attack3.png",
      "./images/Attack4.png",
      "./images/Attack5.png",
      "./images/Attack6.png",
      "./images/Attack7.png",
      "./images/Attack8.png",
    ];

    this.manaPlayerHTML = document.getElementById("manaPlayer");
    this.manaBarFill = document.getElementById("player-mana-fill");

    if (this.manaBarFill) {
      this.manaBarFill.style.width = "100%";
    }

    this.shop();
    this.superClick();
    console.log(
      "Player initialized with coins:",
      this.coins,
      "mana:",
      this.manaPlayer,
      "strength:",
      this.strength
    );

    // Utility controls
    this.coinsHTML = document.getElementById("coins");
    this.manaPlayerHTML = document.getElementById("manaPlayer");
    this.attackLog = document.getElementById("attackLog");
    this.strengthHTML = document.getElementById("playerStrength");
  }

  attack(monster) {
    if (!monster) {
      console.log("No monster provided for attack!");
      return;
    }

    console.log(
      `${game.username} is attacking with strength ${this.strength} damage.`
    );
    monster.receiveDamage(this.strength);

    // Start attack animation
    this.attackAnimation();

    if (this.attackLog) {
      this.attackLog.textContent = `${game.username} deals ${this.strength} damage.`;
    } else {
      console.log("attackLog element is missing.");
    }

    if (this.resetAfterAttack) {
      console.log("Resetting strength after attack...");
      this.strength = this.originalStrength;
      this.resetAfterAttack = false;
      this.hasBought = false;
      document.getElementById("superClick").disabled = false;
      this.updateStrength();
    }
  }

  attackAnimation() {
    let frame = 0;
    const totalFrames = this.attackImages.length;

    const interval = setInterval(() => {
      if (frame < totalFrames) {
        this.playerElement.src = this.attackImages[frame];
        frame++;
      } else {
        clearInterval(interval);
        this.playerElement.src = this.attackImages[0];
      }
    }, 10);
  }

  getCoins() {
    this.coins += 100;
    console.log("Coins increased to:", this.coins);
    if (this.coinsHTML) {
      this.coinsHTML.textContent = this.coins;
    }
  }

  shop() {
    console.log("Setting up shop events...");
    const buyPower = document.getElementById("buyPower");

    if (buyPower) {
      buyPower.addEventListener("click", () => {
        console.log("Attempting to buy power...");
        if (this.coins >= 50) {
          this.coins -= 50;
          this.strength += 10;
          console.log(
            "Power purchased! New strength:",
            this.strength,
            "Coins left:",
            this.coins
          );
          document.getElementById("coins").textContent = this.coins;
          this.updateStrength();
        }
      });
    }
    const buyMana = document.getElementById("buyMana");

    if (buyMana) {
      buyMana.addEventListener("click", () => {
        console.log("Attempting to buy mana...");
        if (this.coins >= 100 && this.manaPlayer < this.maxMana) {
          this.coins -= 100;
          this.manaPlayer = Math.min(this.maxMana, this.manaPlayer + 50);
          this.updateManaBar();
          console.log(
            "Mana purchased! New mana:",
            this.manaPlayer,
            "Coins left:",
            this.coins
          );
          document.getElementById("coins").textContent = this.coins;
          if (this.manaPlayerHTML) {
            this.manaPlayerHTML.textContent = `${this.manaPlayer}/${this.maxMana}`;
          }
        }
      });
    }
  }

  updateManaBar() {
    if (this.manaBarFill) {
      const manaPercentage = (this.manaPlayer / this.maxMana) * 100;
      this.manaBarFill.style.width = manaPercentage + "%";
    }
  }

  superClick() {
    console.log("Setting up superClick event...");
    const superClick = document.getElementById("superClick");

    if (superClick) {
      console.log("SuperClick activated...");
      superClick.addEventListener("click", () => {
        if (this.manaPlayer >= 60 && !this.hasBought) {
          this.manaPlayer -= 60;
          this.updateManaBar();
          this.hasBought = true;
          superClick.disabled = true;
          if (!this.resetAfterAttack) {
            this.originalStrength = this.strength;
          }

          this.strength = this.originalStrength + 4000;

          this.resetAfterAttack = true;
          console.log("SuperClick boosted strength to:", this.strength);
          this.updateStrength();
          if (this.manaPlayerHTML) {
            this.manaPlayerHTML.textContent = `${this.manaPlayer}/${this.maxMana}`;
          }
        }
      });
    }
  }

  updateStrength() {
    console.log("Updating strength display...");
    const usernameDisplay = document.getElementById("username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = `${game.username} (Strength: ${this.strength})`;
    }
  }
}
