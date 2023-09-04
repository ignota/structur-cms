import { canUseDOM } from 'exenv'

const shim = new Map()

class GlobalStorage {
  clear() {
    if (canUseDOM) {
      return localStorage.clear()
    }

    shim.clear()
  }

  getItem(key) {
    if (canUseDOM) {
      return localStorage.getItem(key)
    }

    if (shim.has(key)) {
      return shim.get(key)
    }

    return null
  }

  key(index) {
    if (canUseDOM) {
      return localStorage.key(index)
    }

    const keys = Array.from(shim.keys())
    return keys[index]
  }

  get length() {
    if (canUseDOM) {
      return localStorage.length
    }

    return shim.size
  }

  removeItem(key) {
    if (canUseDOM) {
      return localStorage.removeItem(key)
    }

    shim.delete(key)
  }

  setItem(key, val) {
    if (canUseDOM) {
      return localStorage.setItem(key, val)
    }

    shim.set(key, val)
  }
}

const globalStorage = new GlobalStorage()

export default globalStorage
