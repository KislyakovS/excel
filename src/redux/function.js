const getDataCell = (state, data, isText) => {
  const {selected, dataCell} = state
  const newDataCell = {...dataCell}

  if (isText) {
    const {text} = data
    newDataCell[selected] = {...newDataCell[selected], text: text.trim()}
  } else {
    const {style} = data
    newDataCell[selected] = {...newDataCell[selected], style}
  }

  return newDataCell
}

export const resizeTable = (state, data) => {
  const {type: typeResize, value} = data
  const nameObj = `${typeResize}Size`

  return {...state, [nameObj]: {...state[nameObj], ...value}}
}

export const selectedTable = (state, data) => ({...state, selected: data.id})

export const titleHeader = (state, data) => ({...state, title: data.title})

export const inputCell = (state, data) => ({
  ...state,
  currentText: data.text.trim(),
  dataCell: {...getDataCell(state, data, true)}
})

export const addStyleCell = (state, data) => ({...state, dataCell: {...getDataCell(state, data, false)}})