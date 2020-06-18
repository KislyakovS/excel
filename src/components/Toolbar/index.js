import {createToolBar} from "@/components/Toolbar/template";
import $ from "@core/dom";
import ExcelStateComponent from "@core/ExcelStateComponent";
import {initStyleCell} from "@/constant";
import * as actions from "@/redux/actions"

export default class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["click"],
      ...options
    });

    this.state = {...initStyleCell}
    this.$root = $root;
  }

  static className = "excel__toolbar";

  init() {
    super.init();

    this.$on("table-cell:style", (style) => {
      this.setState(style)
    })
  }

  toHTML() {
    return createToolBar(this.state)
  }

  onClick(e) {
    const $target = $(e.target)

    if ($target.dataset.type === "button") {
      const style = JSON.parse($target.dataset.style)

      this.$emit("toolbar:style", style)
      this.$dispatch(actions.addStyleCell({style: {...this.state, ...style}}))
      this.setState(style)
    }
  }
}
