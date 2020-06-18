import {cssOptions} from "@/constant";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const DEFAULT_STYLE = {
  'text-align': "left",
  'font-weight': "normal",
  'font-style': "normal",
  'text-decoration': "none"
}

const getWidth = (i, colSize) => `width: ${colSize[i] ? colSize[i] : `${DEFAULT_WIDTH}px`}`
const getHeight = (i, rowSize) => `height: ${rowSize[i] ? rowSize[i] : `${DEFAULT_HEIGHT}px`}`
const getContentCell = (dataCell, id) => dataCell[id]?.text || ""
const getStyle = (dataCell, id) => {
  const style = dataCell[id]?.style
  let newStyle = DEFAULT_STYLE

  if (style !== undefined) {
    Object.keys(style).forEach(key => {
      newStyle[cssOptions[key]] = style[key]
    })
  }

  return [...Object.entries(newStyle)].map(item => `${item[0]}: ${item[1]}`).join("; ")
}

const templateCell = (row, colSize, dataCell) => (_, index) =>
  `<div class="cell" contenteditable data-col="${index}" data-type="cell" data-id="${row}:${index}" style="${getWidth(index, colSize)}; ${getStyle(dataCell, `${row}:${index}`)}">
        ${getContentCell(dataCell, `${row}:${index}`)}
   </div>`;

const templateColumn = (colSize) => (_, index) =>
  `<div class="column" data-type="resizabel" data-index="${index}" style="${getWidth(index, colSize)}">
    ${toChar(CODES.A + index)}
    <div class="col-resize" data-resize="col" ></div>
  </div>`;

const templateRow = (content = "", number = "", height) => {
  const resize = number
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `
  <div class="row" data-type="resizabel" data-index="${number}" style="${height}">
    <div class="row__info">
      ${number}
      ${resize}
    </div>
    <div class="row__data">${content}</div>
  </div>`;
};

const toChar = (numb) => String.fromCharCode(numb);

export const createTable = (counterRows = 10, state = {}) => {
  const counterChar = CODES.Z - CODES.A + 1;
  const rows = [];
  const {colSize = {}, rowSize = {}, dataCell = {}} = state

  const columns = new Array(counterChar)
    .fill("")
    .map(templateColumn(colSize))
    .join("");

  rows.push(templateRow(columns));

  for (let i = 1; i < counterRows + 1; i++) {
    const row = new Array(counterChar)
      .fill("")
      .map(templateCell(i, colSize, dataCell))
      .join("");

    rows.push(templateRow(row, i, getHeight(i, rowSize)));
  }

  return rows.join("");
};
