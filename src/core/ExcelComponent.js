import DomListener from "@core/DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, {listeners = [], emitter, store}) {
    super($root, listeners);

    this.emitter = emitter
    this.store = store

    this.unsubscribers = []
    this.storeUnsubscribers = []

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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    const unsub = this.store.subscribe(fn)
    this.storeUnsubscribers.push(unsub)
  }

  init() {
    this.bindDomEvents();
  }

  remove() {
    this.removeDomEvents();

    this.unsubscribers.forEach(fn => fn())
    this.storeUnsubscribers.forEach(fn => fn())
  }
}
