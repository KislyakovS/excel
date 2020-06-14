import {TABLE_RESIZE} from "@/redux/types"

export const reducer = (state, action) => {
  const {type} = action

  switch (type) {
    case TABLE_RESIZE:
      const newColSize = {...state.colSize, ...action.data}
      console.log(newColSize)
      return {...state, colSize: newColSize}
    default:
      return state
  }
}