import ExcelComponent from "@core/ExcelComponent";
import { createTable } from "@/components/Table/template";

export default class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: [],
    });

    this.$root = $root;
  }

  static className = "excel__table";

  toHTML() {
    return createTable(100);
  }
}
