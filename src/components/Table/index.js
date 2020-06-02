import ExcelComponent from "@core/ExcelComponent";
import { createTable } from "@/components/Table/template";
import { onResize } from "@/components/Table/resize";

export default class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });

    this.$root = $root;
  }

  static className = "excel__table";

  toHTML() {
    return createTable(20);
  }

  onMousedown(e) {
    const { resize } = e.target.dataset;

    if (resize) {
      onResize(this.$root, e);
    }
  }
}
