import ExcelComponent from "@core/ExcelComponent";

export default class Toolbar extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: [],
      ...options
    });

    this.$root = $root;
  }

  static className = "excel__toolbar";

  toHTML() {
    return `
    <ul class="style__list">
    <li>
      <button class="button">
        <span class="material-icons">
          format_align_left
        </span>
      </button>
    </li>
    <li>
      <button class="button">
        <span class="material-icons">
          format_align_center
        </span>
      </button>
    </li>
    <li>
      <button class="button">
        <span class="material-icons">
          format_align_right
        </span>
      </button>
    </li>
    <li>
      <button class="button">
        <span class="material-icons">
          format_bold
        </span>
      </button>
    </li>
    <li>
      <button class="button">
        <span class="material-icons">
          format_italic
        </span>
      </button>
    </li>
    <li>
      <button class="button">
        <span class="material-icons">
          format_underlined
        </span>
      </button>
    </li>
  </ul>
    `;
  }
}
