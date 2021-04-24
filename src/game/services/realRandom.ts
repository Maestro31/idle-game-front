import { RandomInterface } from './RandomInterface'

export default class RealRandom implements RandomInterface {
  getValueUntil(max: number): number {
    return Math.floor(Math.random() * max) + 1
  }
}
