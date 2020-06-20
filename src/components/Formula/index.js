import ExcelComponent from "@core/ExcelComponent";
import * as actions from "@/redux/actions"

export default class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["input", "keydown"],
      listSubscribe: ["currentText"],
      ...options
    });

    this.$root = $root;
  }

  static className = "excel__formula";

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input js-input-formula" contenteditable spellcheck="false"></div>
    `;
  }

  changeSubscribe({currentText}) {
    this.$input.text(currentText)
  }

  init() {
    super.init();

    this.$input = this.$root.find(".js-input-formula")
  }

  onInput(e) {
    this.$dispatch(actions.inputCell({text: (e.target.textContent)}))
  }

  onKeydown(e) {
    const {keyCode} = e

    if (keyCode === 13) {
      e.preventDefault()

      this.$emit("formula:keyEnter")
    }
  }
}
