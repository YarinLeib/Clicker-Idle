class Monster {
  constructor(healthMob = 100) {
    this.healthMob = healthMob;
    this.maxHealth = healthMob;
    this.isDead = false;
    this.healthMobHTML = document.getElementById("healthMob");
    this.hpBarFill = document.getElementById("monster-hp-fill");

    //hp update
    if (this.healthMobHTML) {
      this.healthMobHTML.textContent = this.healthMob;
    }

    this.monsterElement = document.getElementById("monster-img");

    const monsterImages = [
      "./images/Monster1.png",
      "./images/Monster2.png",
      "./images/Monster3.png",
      "./images/Monster4.png",
      "./images/Monster5.png",
      "./images/Monster6.png",
      "./images/Monster7.png",
      "./images/Monster8.png",
      "./images/Monster9.png",
      "./images/Monster10.png",
    ];

    const randomIndex = Math.floor(Math.random() * monsterImages.length);
    this.monsterElement.src = monsterImages[randomIndex];

    if (this.hpBarFill) {
      this.hpBarFill.style.width = "100%";
    }
  }

  //Monster imgae element

  receiveDamage(damage) {
    if (!game.canAttack || this.isDead) return;

    damage = Number(damage);

    //reduce the hp
    this.healthMob = Math.max(0, this.healthMob - damage);

    if (this.healthMobHTML) {
      this.healthMobHTML.textContent = this.healthMob;
    }

    if (this.hpBarFill) {
      const hpPercentage = (this.healthMob / this.maxHealth) * 100;
      this.hpBarFill.style.width = hpPercentage + "%";
    }

    //update monster hp
    if (this.healthMobHTML) {
      this.healthMobHTML.textContent = this.healthMob;

      if (this.healthMob === 0 && !this.isDead) {
        this.isDead = true;
        game.player.getCoins();
        this.canAttack = false;

        this.monsterElement.style.display = "none";

        setTimeout(() => {
          spawnMonster();
          this.monsterElement.style.display = "block";
        }, 500);
      }
    }
  }
}
