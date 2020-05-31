import ExcelComponent from "@core/ExcelComponent";

export default class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ["input", "click"],
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
    console.log(`input fromula ${e.target.textContent}`);
  }

  onClick(e) {
    console.log("Click formula element");
  }
}
