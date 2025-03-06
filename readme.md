# Click to survive

## [Play now!](http://yarinleib.github.io/Clicker-Idle/)

# Description

Click to survive is a game that you need to click to kill monsters and bosses monsters

# Main Functionalities

- Click-to-deal-damage mechanics
- Scaling monster HP
- Every 3 levels boss monster will be spawn.
- Every boss that summon timer will start to try to kill the boss.
- The player has hp that will drop by time.
- Ability to use strong click with amount of mana.
- Coin rewards for kills
- Shop will be able to buy: Hp, Mana, Power(for stronger click).
- Score will be tracked about what level did you reach(top level).
- Game end other player reach max level or died.

# Backlog Functionalities

- Add monsters every level
- improving UI HP/Mana/Timer/boss Hp
- Add boss with time and more life

# Technologies Used

- HTML
- CSS
  -JavaScript

- DOM Manipulation
- JS Classes
- JS Audio() and JS Image()

# States

- Start Screen
- Game Screen
- Game Over Screen

# Data structure

## game.js

- this.baseMonsterHp;
- this.monsterHP;
- this.monsterCount;
- this.maxMonste;
- this.canAttack;
- this.spawnMonster();

- this.gameIsOver;
- this.gameIntervalId;

## player.js

- this.coins;
- this.manaPlayer;
- this.maxMana;
- this.strength;
- this.lives;
- this.originalStrength;
- this.resetAfterAttack;

- attack()
- getCoins()
- shop()
- updateManaBar()
- superClick()
- updateStrength()

## monster.js

- this.healthMob;
- this.maxHealth;
- this.isDead;

- receiveDamage()

# Extra links

## Slides
