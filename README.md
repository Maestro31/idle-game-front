## Use case

**Product Goal :** A simple RPG character creator and idle game to test the market and the concept
**A character has :**

- Skill points
- Health
- Attack
- Defense
- Magik
  **All characters start at level 1 with :**
- Skill points : 12
- Health : 10
- Attack : 0
- Defense : 0
- Magik : 0
  **The player can distribute Skill Points to Health, Attack, Defense and Magik following the rules :**
- Health : increasing 1 Health Point costs 1 Skill Point regardless the Health Point amount
- Attack, Defense, Magik : increasing 1 Skill Point costs Skill's amount divided by 5 Skill Point, rounded at superior
  _**Example :**_
  - Health : 44, costs 1 Skill Point to increase to 45
  - Attack : 3, costs 1 Skill Point to increase to 4
    _3 / 5 = 0.6 => 1 Skill Points_
  - Defense : 9, costs 2 Skill Points to increase to 10
    _9 / 5 = 1.8 => 2 Skill Points_
  - Magik : 32, costs 7 Skill Points to increase to 33
    _32 / 5 = 6.4 => 7 Skill Points_
- Skill Points can't be negative (minimum 0)
- Until validation a Skill Point assigned to a skill can be retrieved and reassigned.
