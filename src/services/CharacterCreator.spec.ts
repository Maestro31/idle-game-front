import { CharacterProps, Skill } from './character.interface'
import CharacterCreator from './CharacterCreator'

describe('CharacterCreator', () => {
  let characterCreator: CharacterCreator

  beforeEach(() => {
    characterCreator = new CharacterCreator()
  })

  describe('create character', () => {
    it('should return a character with default skill points', () => {
      const props = characterCreator.createCharacterProps('John')
      expect(characterCreator.createCharacterProps('John')).toEqual({
        name: 'John',
        skillPoints: 12,
        health: 10,
        attack: 0,
        defense: 0,
        magic: 0,
        rank: 0,
        recoveredAt: props.recoveredAt,
      })
    })
  })

  describe('increment skills', () => {
    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should increment the ${skill} of 1 and consume 1 skill point`, () => {
        expectIncrementSkill(skill, {
          from: 0,
          to: 1,
          skillPoints: { from: 12, to: 11 },
        })
      })
    }

    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should not increment the ${skill} if there are no more skill points`, () => {
        expectIncrementSkill(skill, {
          from: 0,
          to: 0,
          skillPoints: { from: 0, to: 0 },
        })
      })
    }

    for (const skill of ['attack', 'defense', 'magic']) {
      it(`should increment the ${skill} of 1 and consume 2 skill points`, () => {
        expectIncrementSkill(skill, {
          from: 10,
          to: 11,
          skillPoints: { from: 12, to: 10 },
        })
      })
    }

    for (const skill of ['attack', 'defense', 'magic']) {
      it(`should increment the ${skill} of 1 and consume 3 skill points`, () => {
        expectIncrementSkill(skill, {
          from: 15,
          to: 16,
          skillPoints: { from: 12, to: 9 },
        })
      })
    }

    for (const skill of ['attack', 'defense', 'magic']) {
      it(`should not increment the ${skill} of 1 if not enough skill points`, () => {
        expectIncrementSkill(skill, {
          from: 15,
          to: 15,
          skillPoints: { from: 2, to: 2 },
        })
      })
    }
  })

  describe('decrement skills', () => {
    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should decrement the ${skill} of 1 and refund 1 skill point`, () => {
        expectDecrementSkill(skill, {
          from: 1,
          to: 0,
          skillPoints: { from: 11, to: 12 },
        })
      })
    }

    for (const skill of ['health', 'attack', 'defense', 'magic']) {
      it(`should not decrement the ${skill} if is already at 0`, () => {
        expectDecrementSkill(skill, {
          from: 0,
          to: 0,
          skillPoints: { from: 12, to: 12 },
        })
      })
    }

    it(`should not decrement health less than 10`, () => {
      expectDecrementSkill('health', {
        from: 10,
        to: 10,
        skillPoints: { from: 12, to: 12 },
      })
    })

    for (const skill of ['attack', 'defense', 'magic']) {
      it(`should decrement the ${skill} of 1 and refund 2 skill point`, () => {
        expectDecrementSkill(skill, {
          from: 11,
          to: 10,
          skillPoints: { from: 10, to: 12 },
        })
      })
    }
  })

  interface ExpectSkillProps {
    from: number
    to: number
    skillPoints: { from: number; to: number }
  }

  function expectIncrementSkill(
    skill: string,
    { from, to, skillPoints }: ExpectSkillProps
  ) {
    customExpectSkill(skill, { from, to, skillPoints }, (initialCharacter) => {
      return characterCreator.increment(skill as Skill, initialCharacter)
    })
  }

  function expectDecrementSkill(
    skill: string,
    { from, to, skillPoints }: ExpectSkillProps
  ) {
    customExpectSkill(skill, { from, to, skillPoints }, (initialCharacter) => {
      return characterCreator.decrement(skill as Skill, initialCharacter)
    })
  }

  function customExpectSkill(
    skill: string,
    { from, to, skillPoints }: ExpectSkillProps,
    act: (initialCharacter: CharacterProps) => CharacterProps
  ) {
    const initialCharacterProps = {
      name: '',
      skillPoints: skillPoints.from,
      health: 0,
      attack: 0,
      defense: 0,
      magic: 0,
      rank: 0,
      recoveredAt: new Date().toISOString(),
    }

    const character = act({ ...initialCharacterProps, [skill]: from })

    expect(character).toEqual({
      ...initialCharacterProps,
      skillPoints: skillPoints.to,
      [skill]: to,
    })
  }
})
