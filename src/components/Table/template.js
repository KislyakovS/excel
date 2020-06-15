const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const getWidth = (i, colSize) => `width: ${colSize[i] ? colSize[i] : `${DEFAULT_WIDTH}px`}`
const getHeight = (i, rowSize) => `height: ${rowSize[i] ? rowSize[i] : `${DEFAULT_HEIGHT}px`}`

const templateCell = (row, colSize) => (_, index) =>
  `<div class="cell" contenteditable data-col="${index}" data-type="cell" data-id="${row}:${index}" style="${getWidth(index, colSize)}"></div>`;

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
  const {colSize = {}, rowSize = {}} = state

  const columns = new Array(counterChar)
    .fill("")
    .map(templateColumn(colSize))
    .join("");

  rows.push(templateRow(columns));

  for (let i = 1; i < counterRows + 1; i++) {
    const row = new Array(counterChar)
      .fill("")
      .map(templateCell(i, colSize))
      .join("");

    rows.push(templateRow(row, i, getHeight(i, rowSize)));
  }

  return rows.join("");
};
