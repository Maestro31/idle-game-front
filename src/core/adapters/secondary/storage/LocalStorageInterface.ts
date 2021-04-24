export default interface LocalStorageInterface {
  getItem(key: string): string
  setItem(key: string, value: string): void
}
