class Player {
  constructor(coins = 0, healthPlayer = 100, manaPlayer = 100, strength = 70) {
    this.coins = coins;
    this.healthPlayer = healthPlayer;
    this.manaPlayer = manaPlayer;
    this.strength = strength;
    //utility contorls
    this.coinsHTML = document.getElementById("coins");
    this.healthPlayerHTML = document.getElementById("healthPlayer");
    this.manaPlayerHTML = document.getElementById("manaPlayer");
    this.attackLog = document.getElementById("attackLog");
    this.strengthHTML = document.getElementById("playerStrength");
  }
  attack(monster) {
    if (!monster) return;

    monster.receiveDamage(this.strength);
    if (this.attackLog && game) {
      this.attackLog.textContent = `${game.username} deals ${this.strength} damage. Monster HP: ${monster.healthMob}`;
    }
    return this.strength;
  }

  getCoins() {
    this.coins += 50;

    if (this.coinsHTML) {
      this.coinsHTML.textContent = this.coins;
    }
  }
}
