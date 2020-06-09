export default class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(eventName, ...args) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].forEach(fn => fn(...args))
    } else {
      console.error("Error emit event!")
    }
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)

    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn)
    }
  }
}