import $ from "@core/dom";
import Emitter from "@core/Emitter";

export default class Excel {
  constructor(selector, options) {
    const {components = []} = options;

    this.$el = document.querySelector(selector);
    this.components = components;

    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create("div", "excel");

    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);

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

  remove() {
    this.components.forEach((component) => component.remove())
  }
}
