import DomListener from "@core/DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, { listeners = [] }) {
    super($root, listeners);
  }

  // Вывод шаблон компонента
  toHTML() {}

  init() {
    this.bindDomEvents();
  }

  remove() {
    this.removeDomEvents();
  }
}
