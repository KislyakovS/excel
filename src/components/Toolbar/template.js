const templateButton = (isActive, meta, name) =>
  `<button class="button ${isActive ? "active" : ""}" ${meta}>
     <span class="material-icons" ${meta}>
        ${name}
      </span>
   </button>
  `

const createButtons = (buttons) => {
  const itemsButton = buttons.map(button => {
    const {style, name, isActive} = button

    const meta = `
      data-type="button"
      data-style='${JSON.stringify(style)}'
    `

    return `<li>${templateButton(isActive, meta, name)}</li>`
  }).join("")

  return `<ul class="style__list">${itemsButton}</ul>`
}

export const createToolBar = (state) => {
  const {fontWeight, fontStyle, textDecoration, textAlign} = state

  const buttons = [
    {
      name: "format_align_left",
      style: {textAlign: "left"},
      isActive: textAlign === "left" ? true : false
    },
    {
      name: "format_align_center",
      style: {textAlign: "center"},
      isActive: textAlign === "center" ? true : false
    },
    {
      name: "format_align_right",
      style: {textAlign: "right"},
      isActive: textAlign === "right" ? true : false
    },
    {
      name: "format_bold",
      style: {fontWeight: fontWeight === "bold" ? "normal" : "bold"},
      isActive: fontWeight === "bold" ? true : false
    },
    {
      name: "format_italic",
      style: {fontStyle: fontStyle === "italic" ? "normal" : "italic"},
      isActive: fontStyle === "italic" ? true : false
    },
    {
      name: "format_underlined",
      style: {textDecoration: textDecoration === "underline" ? "none" : "underline"},
      isActive: textDecoration === "underline" ? true : false
    },
  ]

  return createButtons(buttons)
}