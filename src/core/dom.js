class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(value) {
    if (typeof value === "string") {
      this.$el.innerHTML = value;

      return this;
    } else {
      return this.$el.innerHTML;
    }
  }

  clear() {
    this.html("");
  }

  append(node) {
    this.$el.append(node);
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
  }

  removeEvent(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
  }

  closest(selector) {
    return $(this.el.closest(selector));
  }

  getCords() {
    return this.el.getBoundingClientRect();
  }

  style(params, value) {
    this.el.style[params] = value;
  }

  findAll(selector) {
    return this.el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.el.querySelector(selector));
  }

  addClass(classes) {
    this.el.classList.add(classes);
  }

  removeClass(classes) {
    this.el.classList.remove(classes);
  }

  id(parce) {
    if (parce) {
      const id = this.id();

      return id.split(parce);
    }

    return this.el.dataset.id;
  }

  get dataset() {
    return this.el.dataset;
  }

  get el() {
    return this.$el;
  }
}

const $ = (selector) => new Dom(selector);

$.create = (tag, className) => {
  const $el = document.createElement(tag);

  if (className) {
    $el.classList.add(className);
  }

  return $($el);
};

export default $;
