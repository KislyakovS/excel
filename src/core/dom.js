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

  get el() {
    return this.$el;
  }
}

//export default () => new Dom();

const $ = (selector) => new Dom(selector);

$.create = (tag, className) => {
  const $el = document.createElement(tag);

  if (className) {
    $el.classList.add(className);
  }

  return $($el);
};

export default $;
