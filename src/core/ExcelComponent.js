import DomListener from "@core/DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, {listeners = [], emitter}) {
    super($root, listeners);

    this.emitter = emitter

    this.prepare();
  }

  prepare() {
  }

  // Вывод шаблон компонента
  toHTML() {
  }

  init() {
    this.bindDomEvents();
  }

  remove() {
    this.removeDomEvents();
  }
}
