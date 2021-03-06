import $ from "@core/dom";
import Emitter from "@core/Emitter";
import StoreSubscribe from "@core/StoreSubscribe";

export default class Excel {
  constructor(selector, options) {
    const {components = [], store} = options;

    this.$el = document.querySelector(selector);
    this.components = components;
    this.store = store

    this.storeSubscribe = new StoreSubscribe(this.store)
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create("div", "excel");

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
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

    this.storeSubscribe.subscribeComponents(this.components)
    this.components.forEach((component) => component.init());
  }

  remove() {
    this.storeSubscribe.unsubscribeFromState()
    this.components.forEach((component) => component.remove())
  }
}
