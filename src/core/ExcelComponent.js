import DomListener from "@core/DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, {listeners = [], emitter}) {
    super($root, listeners);

    this.emitter = emitter

    this.unsubscribers = []

    this.prepare();
  }

  prepare() {
  }

  toHTML() {
  }

  $emit(eventName, ...arg) {
    this.emitter.emit(eventName, ...arg)
  }

  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.bindDomEvents();
  }

  remove() {
    this.removeDomEvents();

    this.unsubscribers.forEach(fn => fn())
  }
}
