//import ExcelComponent from "@core/ExcelComponent";
import $ from "@core/dom";

export default class Excel {
  constructor(selector, options) {
    const { components = [] } = options;

    this.$el = document.querySelector(selector);
    this.components = components;
  }

  getRoot() {
    const $root = $.create("div", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el);

      $el.html(component.toHTML());
      $root.append($el.el);

      return component;
    });

    return $root.el;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }
}
