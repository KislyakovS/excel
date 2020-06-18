export const resizeTable = (state, data) => {
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
}

export const selectedTable = (state, data) => ({...state, selected: data.id})

export const titleHeader = (state, data) => ({...state, title: data.title})

export const inputCell = (state, data) => {
  const {dataCell, selected} = state
  const {text} = data

  const newDataCell = {...dataCell}
  newDataCell[selected] = {...newDataCell[selected], text: text.trim()}

  return {...state, currentText: text.trim(), dataCell: {...newDataCell}}
}

export const addStyleCell = (state, data) => {
  const {selected, dataCell} = state
  const {style} = data

  const newDataCell = {...dataCell}
  newDataCell[selected] = {...newDataCell[selected], style}

  return {...state, dataCell: {...newDataCell}}
}