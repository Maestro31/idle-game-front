import LocalStorageInterface from '../../../core/adapters/secondary/storage/LocalStorageInterface'

export default class InMemoryLocalStorage implements LocalStorageInterface {
  private storage: { [key: string]: string } = {}

  getItem(key: string): string | null {
    return this.storage[key]
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value
  }

  removeItem(key: string) {
    delete this.storage[key]
  }
}
