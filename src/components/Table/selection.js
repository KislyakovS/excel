export default class Selection {
  static CLASS_NAME = "selected";

  constructor() {
    this.group = new Set();
    this.current = "";
  }

  setSelection($el) {
    this.group.add($el);
    $el.focus();
    $el.addClass(Selection.CLASS_NAME);
  }

  setOneSelection($el) {
    this.clear();
    this.current = $el;
    this.setSelection($el);
  }

  clear() {
    this.group.forEach(($cell) => $cell.removeClass(Selection.CLASS_NAME));
    this.group.clear();
  }

  setGroupSelection($els) {
    this.clear();
    $els.forEach(this.setSelection.bind(this));
  }
}
