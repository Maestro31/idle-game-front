import { RandomInterface } from './random.interface'

export default class RandomStub implements RandomInterface {
  private nextValue: number

  constructor() {
    this.nextValue = 1
  }

  getValueUntil(max: number): number {
    return this.nextValue
  }

  willRespond(nextValue: number) {
    this.nextValue = nextValue
  }
}
