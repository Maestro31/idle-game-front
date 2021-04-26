import Character, { CharacterProps } from '../models/Character'
import { v4 as uuid } from 'uuid'

export default class CharacterBuilder {
  private id: string = uuid()
  private props: CharacterProps = {
    name: 'John',
    skillPoints: 12,
    health: 10,
    attack: 0,
    magic: 0,
    defense: 0,
  }

  withId(id: string) {
    this.id = id
    return this
  }

  withProps(props: CharacterProps) {
    this.props = props
    return this
  }

  withSkillPoints(skillPoints: number) {
    this.props.skillPoints = skillPoints
    return this
  }

  withAttack(attack: number) {
    this.props.attack = attack
    return this
  }

  withHealth(health: number) {
    this.props.health = health
    return this
  }

  withMagic(magic: number) {
    this.props.magic = magic
    return this
  }

  withDefense(defense: number) {
    this.props.defense = defense
    return this
  }

  build(): Character {
    return new Character(this.id, this.props)
  }
}
