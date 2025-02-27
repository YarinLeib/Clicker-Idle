class Player {
  constructor(coins = 0, manaPlayer = 100, strength = 70) {
    this.coins = coins;
    this.manaPlayer = manaPlayer;
    this.maxMana = 100;
    this.strength = strength;
    this.originalStrength = this.strength;
    this.resetAfterAttack = false;

    this.shop();
    this.superClick();
    //utility contorls
    this.coinsHTML = document.getElementById("coins");
    this.manaPlayerHTML = document.getElementById("manaPlayer");
    this.attackLog = document.getElementById("attackLog");
    this.strengthHTML = document.getElementById("playerStrength");
  }
  attack(monster) {
    if (!monster) return;

    monster.receiveDamage(this.strength);
    if (this.attackLog) {
      this.attackLog.textContent = `${game.username} deals ${this.strength} damage.`;
    }
    if (this.resetAfterAttack) {
      this.strength = this.originalStrength;
      this.resetAfterAttack = false;

      this.hasBought = false;
      document.getElementById("superClick").disabled = false;
      this.updateStrength();
    }
  }

  getCoins() {
    this.coins += 100;

    if (this.coinsHTML) {
      this.coinsHTML.textContent = this.coins;
    }
  }
  shop() {
    //set buy options
    const buyPower = document.getElementById("buyPower");

    if (buyPower) {
      buyPower.addEventListener("click", () => {
        if (this.coins >= 50) {
          this.coins -= 50;
          this.strength += 10;

          document.getElementById("coins").textContent = this.coins;
          this.updateStrength();
        }
      });
    }
    const buyMana = document.getElementById("buyMana");

    if (buyMana) {
      buyMana.addEventListener("click", () => {
        if (this.coins >= 100 && this.manaPlayer < this.maxMana) {
          this.coins -= 100;
          this.manaPlayer = Math.min(this.maxMana, this.manaPlayer + 50);
          document.getElementById("coins").textContent = this.coins;
          if (this.manaPlayerHTML)
            this.manaPlayerHTML.textContent = `${this.manaPlayer}/${this.maxMana}`;
        }
      });
    }
  }

  superClick() {
    const superClick = document.getElementById("superClick");

    if (superClick) {
      superClick.addEventListener("click", () => {
        if (this.manaPlayer >= 60 && !this.hasBought) {
          this.manaPlayer -= 60;
          this.hasBought = true;
          superClick.disabled = true;
          if (!this.resetAfterAttack) {
            this.originalStrength = this.strength;
          }

          this.strength = this.originalStrength + 4000;

          this.resetAfterAttack = true;
          this.updateStrength();
          if (this.manaPlayerHTML)
            this.manaPlayerHTML.textContent = `${this.manaPlayer}/${this.maxMana}`;
        }
      });
    }
  }

  updateStrength() {
    const usernameDisplay = document.getElementById("username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = `${game.username} (Strength: ${this.strength})`;
    }
  }
}
