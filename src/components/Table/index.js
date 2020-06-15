import ExcelComponent from "@core/ExcelComponent";
import {createTable} from "@/components/Table/template";
import {onResize} from "@/components/Table/resize";
import Selection from "@/components/Table/selection";
import {matrix, nextSlector} from "@/components/Table/function";
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

export default class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["mousedown", "click", "keydown", "input"],
      ...options
    });

    this.$root = $root;
  }

  static className = "excel__table";

  prepare() {
    this.selection = new Selection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:0"]');
    this.selection.setOneSelection($cell);

    this.emitInput($cell.text())

    this.$on("formula:input", (text) => {
      this.selection.current.text(text)
    })

    this.$on("formula:keyEnter", () => {
      this.selection.current.focus()
    })

    this.$subscribe((state) => {
      console.log("Sate: ", state)
    })
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  async resizeTable(e) {
    try {
      const data = await onResize(this.$root, e)
      this.$dispatch(actions.resizeTable(data))
    } catch (e) {
      console.error("Error resize table ", e.message)
    }
  }

  onMousedown(e) {
    const {resize} = e.target.dataset;

    if (resize) {
      //onResize(this.$root, e);
      this.resizeTable(e)
    }
  }

  onClick(e) {
    const {type} = e.target.dataset;
    const {shiftKey} = e;

    if (type === "cell") {
      const $cell = $(e.target);

      if (shiftKey) {
        const $currentSelection = this.selection.current;
        const $els = matrix($cell, $currentSelection, this.$root);

        this.selection.setGroupSelection($els);
      } else {
        this.selection.setOneSelection($cell);
      }

      this.emitInput($cell.text())
    }

  }

  onKeydown(e) {
    const {key} = e;

    if (KEYS.includes(key) && !e.shiftKey) {
      e.preventDefault()

      const id = this.selection.current.id(":")
      const $newCell = this.$root.find(nextSlector(key, id))
      this.selection.setOneSelection($newCell)

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