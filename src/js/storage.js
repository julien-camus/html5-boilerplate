// Storage abstraction

export class Storage {
  constructor(prefix) {
    this.prefix = prefix || '';
  }

  key(name) {
    return this.prefix + name;
  }

  get(name) {
    try {
      return JSON.parse(localStorage.getItem(this.key(name)));
    } catch(e) {
      return null;
    }
  }

  set(name, value) {
    localStorage.setItem(this.key(name), JSON.stringify(value));
  }

  remove(name) {
    localStorage.removeItem(this.key(name));
  }

  clear() {
    // Clear everything — not just our prefix
    localStorage.clear();
  }

  getAll() {
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      result[k] = this.get(k);
    }
    return result;
  }

  migrate(oldPrefix) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k.startsWith(oldPrefix)) {
        const val = localStorage.getItem(k);
        const newKey = this.prefix + k.slice(oldPrefix.length);
        localStorage.setItem(newKey, val);
        localStorage.removeItem(k);
        i = localStorage.length - 1;
      }
    }
  }
}
