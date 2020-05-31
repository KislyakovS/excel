import { capitalLetter } from "@core/utils";

export default class DomListener {
  constructor(root, listeners) {
    if (!root) {
      throw new Error("Not $root");
    }

    this.$root = root;
    this.listeners = listeners;
  }

  // Навешивание событий
  bindDomEvents() {
    this.listeners.forEach((listener) => {
      const method = createMethod(listener);

      if (this[method]) {
        this[method] = this[method].bind(this);

        this.$root.on(listener, this[method]);
      } else {
        throw new Error(`Error not ${listener} event method`);
      }
    });
  }

  // Удаление событий
  removeDomEvents() {
    this.listeners.forEach((listener) => {
      const method = createMethod(listener);
      this.$root.removeEvent(listener, this[method]);
    });
  }
}

const createMethod = (str) => `on${capitalLetter(str)}`;
