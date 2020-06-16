import ExcelComponent from "@core/ExcelComponent";
import * as actions from "../../redux/actions"
import $ from "@core/dom"
import {setTitlePage} from "@core/utils";
import {createTitleString} from "@/components/Header/function";

export default class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ["input"],
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

  init() {
    super.init();

    const {title} = this.store.getState()
    this.$root.find(".input").text(title)

    setTitlePage(createTitleString(title))
  }

  onInput(e) {
    const $target = $(e.target)
    const title = $target.text()

    setTitlePage(createTitleString(title))

    this.$dispatch(actions.inputHeader({title}))
  }
}
