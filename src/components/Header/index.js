import ExcelComponent from "@core/ExcelComponent";

export default class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: [],
      ...options
    });

    this.$root = $root;
  }

  static className = "excel__header";

  toHTML() {
    return `
    <input type="text" class="input" placeholder="Название таблицы" />
    <div>
      <button class="button">
        <span class="material-icons">
          delete
        </span>
      </button>
      <button class="button">
        <span class="material-icons">
          exit_to_app
        </span>
      </button>
    </div>
    `;
  }
}
