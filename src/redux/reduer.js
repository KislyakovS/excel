import {TABLE_RESIZE} from "@/redux/types"

export const reducer = (state, action) => {
  let {type} = action

  console.log(type)

  switch (type) {
    case TABLE_RESIZE:
      const {type: typeResize, value} = action.data

      if (typeResize === "col") {
        const newColSize = {...state.colSize, ...value}
        return {...state, colSize: {...newColSize}}
      } else {
        const newRowSize = {...state.rowSize, ...value}
        return {...state, rowSize: {...newRowSize}}
      }
      break;
    default:
      return state
  }
}