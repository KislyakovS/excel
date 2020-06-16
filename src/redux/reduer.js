import {HEADER_TITLE, TABLE_RESIZE, TABLE_SELECTED} from "@/redux/types"

export const reducer = (state, action) => {
  let {type, data} = action

  switch (type) {
    case TABLE_RESIZE:
      const {type: typeResize, value} = data

      if (typeResize === "col") {
        const newColSize = {...state.colSize, ...value}
        return {...state, colSize: {...newColSize}}
      } else if (typeResize === "row") {
        const newRowSize = {...state.rowSize, ...value}
        return {...state, rowSize: {...newRowSize}}
      } else {
        return state
      }
      break;
    case TABLE_SELECTED:
      const {id} = data

      return {...state, selected: id}
      break;
    case HEADER_TITLE:
      const {title} = data

      return {...state, title}
    default:
      return state
  }
}