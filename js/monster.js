class Monster {
  constructor(healthMob = 100) {
    this.healthMob = healthMob;
    this.isDead = false;
    this.healthMobHTML = document.getElementById("healthMob");

    //hp update
    if (this.healthMobHTML) {
      this.healthMobHTML.textContent = this.healthMob;
    }
  }

  receiveDamage(damage) {
    if (!game.canAttack || this.isDead) return;

    damage = Number(damage);

    //reduce the hp
    this.healthMob = Math.max(0, this.healthMob - damage);

    //update monster hp
    if (this.healthMobHTML) {
      this.healthMobHTML.textContent = this.healthMob;

      if (this.healthMob === 0 && !this.isDead) {
        this.isDead = true;
        game.player.getCoins();
        this.canAttack = false;
        setTimeout(() => {
          spawnMonster();
        }, 500);
      }
    }
  }
}
