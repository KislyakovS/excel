import ExcelComponent from "@core/ExcelComponent";
import {createTable} from "@/components/Table/template";
import {onResize} from "@/components/Table/resize";
import Selection from "@/components/Table/selection";
import {matrix, nextSlector, setWidthRows} from "@/components/Table/function";
import * as actions from "@/redux/actions"
import $ from "@core/dom";

const KEYS = [
  "Enter",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "ArrowDown",
  "ArrowUp"
]
const DEFAULT_SELECTED = "1:0"
const COUNTER_ROWS = 20
const COUNTER_COLS = 25

export default class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["mousedown", "keydown", "input"],
      ...options
    });

    this.fullStore = this.store.getState()

    this.$root = $root;
  }

  static className = "excel__table";

  prepare() {
    this.selection = new Selection();
  }

  init() {
    super.init();

    const {width} = this.$root.find(".row__data").getCords()
    const $rows = this.$root.findAll(".row")

    setWidthRows($rows, width)

    const {selected = DEFAULT_SELECTED} = this.fullStore

    const $cell = this.$root.find(`[data-id="${selected}"]`);
    this.selection.setOneSelection($cell);

    this.emitInput($cell.text())

    this.$on("formula:input", (text) => {
      this.selection.current.text(text)
    })

    this.$on("formula:keyEnter", () => {
      this.selection.current.focus()
    })
  }

  toHTML() {
    return createTable(COUNTER_ROWS, this.fullStore);
  }

  setOnSelected($cell) {
    this.selection.setOneSelection($cell)

    const {id} = $cell.dataset
    this.$dispatch(actions.selectedTable({id}))
  }

  async resizeTable(e) {
    try {
      const data = await onResize(this.$root, e)
      this.$dispatch(actions.resizeTable(data))
    } catch (e) {
      console.error("Error resize table ", e.message)
    }
  }

  selectedTable(e) {
    const {shiftKey} = e;
    const $cell = $(e.target);

    if (shiftKey) {
      const $currentSelection = this.selection.current;
      const $els = matrix($cell, $currentSelection, this.$root);

      this.selection.setGroupSelection($els);
    } else {
      this.setOnSelected($cell)
    }

    this.emitInput($cell.text())
  }

  onMousedown(e) {
    const {resize, type} = e.target.dataset;

    if (resize) {
      this.resizeTable(e)
    }

    if (type === "cell") {
      this.selectedTable(e)
    }
  }

  onKeydown(e) {
    const {key} = e;

    if (KEYS.includes(key) && !e.shiftKey) {
      e.preventDefault()

      const id = this.selection.current.id(":")
      const $newCell = this.$root.find(nextSlector(key, id, COUNTER_ROWS, COUNTER_COLS))
      this.setOnSelected($newCell)

      this.emitInput($newCell.text())
    }
  }

  onInput(e) {
    const value = e.target.textContent

    this.emitInput(value)
  }

  emitInput(value) {
    this.$emit("table:input", value)
  }
}