export default class StorageService {
  constructor(namespace = "quiz-app-oop") {
    this.ns = namespace;
  }

  _key(key) { return `${this.ns}:${key}`; }

  set(key, value) {
    localStorage.setItem(this._key(key), JSON.stringify(value));
  }

  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(this._key(key));
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  remove(key) {
    localStorage.removeItem(this._key(key));
  }

  clearAll() {
    const prefix = `${this.ns}:`;
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  }
}
