## Use case

**Product Goal :** A simple RPG character creator and idle game to test the market and the concept
**A character has :**

- Skill points
- Health
- Attack
- Defense
- Magik
  **All character starts at level 1 with :**
- Skill points : 12
- Health : 10
- Attack : 0
- Defense : 0
- Magik : 0
  **Player can distribute Skill points between Health, Attack, Defense and Magik following the rules :**
- Health : increase 1 Health Point costs 1 Skill Point regardless the Health Point amount
- Attack, Defense, Magik : increase 1 Skill Point costs Skill's amount divided by 5 Skill Point, rounded at superior
  _**Example :**_
  - Health : 44, costs 1 Skill Point to increase to 45
  - Attack : 3, costs 1 Skill Point to increase to 4
    _3 / 5 = 0.6 => 1 Skill Points_
  - Defense : 9, costs 2 Skill Points to increase to 10
    _9 / 5 = 1.8 => 2 Skill Points_
  - Magik : 32, costs 7 Skill Points to increase to 33
    _32 / 5 = 6.4 => 7 Skill Points_
- Skill Points amount can't be negative (minimum 0)
- Until validation a Skill Point assigned to a skill can be retrieved and reassigned.
- After validation, a Skill Point can't be retrieved
  **After each fight :**
- character's Health Points are restored
- when character loses : it can't fight for 1 hour
- when character wins : it gains 1 Skill Point
  **Character rank is :**
- All character starts at rank : 1
- rank increase by 1 when character wins
- rank decrease by 1 when character loses
- rank can't drop below 1
  **Fight are random turn based :**
- The player's character is the first character, the opponent is the second
- Each turn both characters launches a dice with as many faces as the Attack's Skill Point amount, it's the Attack's value
  _**Example :**_
  - Gaston has 10 Skill Points in Attack
    - he launches a 1D10 dice (a.k.a. a dice with 10 faces : it results a number between 1 and 10)
  - Mathilda has 5 Skill Points in Attack
    - she launches a 1D5 dice (a.k.a. a dice with 5 faces : it results a number between 1 and 5)
  - _1D0 dice doesn't exist, result is always 0_
- Attack's value are compared with Defense's Skill Point amount, if the difference is :
  - positive : Attack succeed
  - zero or negative : Attack failed
- When Attack succeed the difference is substracted from the opponent's Health Point
- If the difference equals Magik's Skill Point amount, this value is added to the difference
  \_**Exemple :**
  - Player with Gaston launches the fight : Gaston will always play first
  - Gaston has 10 Skill Points in Attack, he launches 1D10 dice and obtains 10.
  - Gaston has 7 Skill Points in Magik.
  - Mathilda has 3 Skill Points in Defense, difference is 10 - 3 = 7, same value as Gaston's Magik Skill Points
  - Mathilda receives 7 + 7 = 14 damages, if she has 24 Health Skill Points : 24 - 14 = 10 remains
- Until a character's Health Point reaches 0 (or less), the fight continues.
- When a character has no more Health Point, fight is instantly finished.
  **A Player can only interact with his/her characters :**
- He/She can sign up and create a character
- He/She can sign in and :
  - retrieve the list of his characters
  - consult a character's details
  - create a new character (maximum 10 characters per player)
  - update a character (only if some Skill Points are available)
  - delete a character
  - retrieve the list of fights for a character with the result (won/loose)
  - launch a new fight in the lobby
- He/She can sign out
  **To launch a fight**
- Player chooses an existing character in his/her pool
- Enter the lobby to fight
- An opponent is chosen automatically following this rules :
  - take the closest opponent based on rank value
  - opponent has to be free (it must not have fight in the past hour)
  - if several opponent match, take the opponent with the less number of fight with the character
  - if several opponent match, take a random opponent within the list
- Player is informed by a report with each turn's details :
  - Turn count (start at 1)
  - Attack's value for both characters
  - Health point substracted for both characters
  - Fight status (won/loose)

## Technical Requirements

- You can use any programming languages but not too exotic
- You can use any framework but not too exotic
- You should provide code as clean as possible according to best practices focusing on maintainability and evolutivity
  - Automation Tests (good strategy)
  - "Clean Code"
  - Decoupling
  - SOLID principles
  - Good architecture
  - Documentation (if we can't launch it, it's useless)
  - Tooling to ensure quality
- No need to deploy it publicly, dev environment on public repository is enough

## Notes

- No need to deliver all the features if it's too much but priorise according to the product goal above
- All requierements above are written on purpose, you can improve/rewrite them (User Story, Acceptance Criteria, Gherkin...)
