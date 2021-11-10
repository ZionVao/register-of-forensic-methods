interface IStorage {
  clear(): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

class StorageService {
  private _storage: IStorage;

  constructor(storage: IStorage) {
    this._storage = storage;
  }

  getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    return this._storage.setItem(key, value);
  }

  removeItem(key: string): void {
    return this._storage.removeItem(key);
  }

  clear(): void {
    return this._storage.clear();
  }
}

export { StorageService };
