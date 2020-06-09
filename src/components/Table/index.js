import ExcelComponent from "@core/ExcelComponent";
import { createTable } from "@/components/Table/template";
import { onResize } from "@/components/Table/resize";
import Selection from "@/components/Table/selection";
import { matrix } from "@/components/Table/function";
import $ from "@core/dom";


export default class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ["mousedown", "click"],
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
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(e) {
    const { resize } = e.target.dataset;

    if (resize) {
      onResize(this.$root, e);
    }
  }

  onClick(e) {
    const { type } = e.target.dataset;
    const { shiftKey } = e;

    if (type === "cell") {
      const $cell = $(e.target);

      if (shiftKey) {
        const $currentSelection = this.selection.current;
        const $els = matrix($cell, $currentSelection, this.$root);

        this.selection.setGroupSelection($els);
      } else {
        this.selection.setOneSelection($cell);
      }
    }
  }
}
