const templateCell = (_, index) =>
  `<div class="cell" contenteditable data-col="${index}"></div>`;

const templateColumn = (
  content = "",
  index
) => `<div class="column" data-type="resizabel" data-index="${index}">
  ${content}
  <div class="col-resize" data-resize="col"></div>
</div>`;

const templateRow = (content = "", number = "") => {
  const resize = number
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `
  <div class="row" data-type="resizabel">
    <div class="row__info">
      ${number}
      ${resize}
    </div>
    <div class="row__data">${content}</div>
  </div>`;
};

const CODES = {
  A: 65,
  Z: 90,
};

const toChar = (numb) => String.fromCharCode(numb);

export const createTable = (counterRows = 10) => {
  const counterChar = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(counterChar)
    .fill("")
    .map((_, i) => templateColumn(toChar(CODES.A + i), i))
    .join("");

  rows.push(templateRow(columns));

  for (let i = 1; i < counterRows + 1; i++) {
    const row = new Array(counterChar).fill("").map(templateCell).join("");

    rows.push(templateRow(row, i));
  }

  return rows.join("");
};
