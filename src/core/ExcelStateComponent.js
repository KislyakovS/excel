import ExcelComponent from "@core/ExcelComponent";

export default class ExcelStateComponent extends ExcelComponent {
  constructor(...arg) {
    super(...arg)

    this.state = {}
  }

  setState(state) {
    this.state = {...this.state, ...state}
    this.$root.html(this.toHTML())
  }
}