import DomListener from "@core/DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, { listeners = [] }) {
    super($root, listeners);

    this.prepare();
  }

  prepare() {}

  // Вывод шаблон компонента
  toHTML() {}

  init() {
    this.bindDomEvents();
  }

  remove() {
    this.removeDomEvents();
  }
}
