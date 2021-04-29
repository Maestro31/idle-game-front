import LocalStorageInterface from '../../../core/adapters/secondary/storage/LocalStorageInterface'

export default class LocalStorageService implements LocalStorageInterface {
  getItem(key: string): string | null {
    return localStorage.getItem(key)
  }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}
