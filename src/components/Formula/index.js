import ExcelComponent from "@core/ExcelComponent";

export default class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["input"],
      ...options
    });

    this.$root = $root;
  }

  static className = "excel__formula";

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e) {
    this.emitter.emit("form:input", e.target.textContent)
  }
}
