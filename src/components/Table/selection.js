import $ from "@core/dom"

const MAIN_COLOR_CELL = "#f8f9fa"
const COLOR_CELL = "rgb(220, 220, 220)"

const setColorBg = ($el, color) => $el.style("background-color", color)

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

    this.setColorCellHeader($el.id(":"), COLOR_CELL)
  }

  setColorCellHeader([row, col], color) {
    const $col = $(`.column[data-index="${col}"]`)
    const $row = $(`.row[data-index="${row}"] .row__info`)

    setColorBg($col, color)
    setColorBg($row, color)
  }

  clear() {
    this.group.forEach(($cell) => $cell.removeClass(Selection.CLASS_NAME));
    this.group.clear()

    if (this.current) {
      const ids = this.current.id(":")
      this.setColorCellHeader(ids, MAIN_COLOR_CELL)
    }
  }

  setGroupSelection($els) {
    this.clear();
    $els.forEach(this.setSelection.bind(this));
  }

  setStyle(style) {
    this.group.forEach(item => item.css(style))
  }
}
