import ExcelComponent from "@core/ExcelComponent";

export default class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["input", "keydown"],
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

  init() {
    super.init();

    const $input = this.$root.find(".js-input-formula")

    this.$on("table:input", (value) => $input.text(value))
  }

  onInput(e) {
    this.$emit("formula:input", e.target.textContent)
  }

  onKeydown(e) {
    const {keyCode} = e

    if (keyCode === 13) {
      e.preventDefault()

      this.$emit("formula:keyEnter")
    }
  }
}
