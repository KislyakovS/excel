import {ADD_STYLE_CELL, HEADER_TITLE, INPUT_CELL, TABLE_RESIZE, TABLE_SELECTED} from "@/redux/types"
import {inputCell, resizeTable, selectedTable, titleHeader, addStyleCell} from "@/redux/function";

export const reducer = (state, action) => {
  let {type, data} = action

  switch (type) {
    case TABLE_RESIZE:
      return resizeTable(state, data)
    case TABLE_SELECTED:
      return selectedTable(state, data)
    case HEADER_TITLE:
      return titleHeader(state, data)
    case INPUT_CELL:
      return inputCell(state, data)
    case ADD_STYLE_CELL:
      return addStyleCell(state, data)
    default:
      return state
  }
}