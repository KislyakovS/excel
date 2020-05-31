const templateCell = () => `<div class="cell" contenteditable></div>`;

const templateColumn = (content = "") => `<div class="column">${content}</div>`;

const templateRow = (content = "", number = "") => {
  return `
  <div class="row">
    <div class="row__info">${number}</div>
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
    .map((_, i) => templateColumn(toChar(CODES.A + i)))
    .join("");

  rows.push(templateRow(columns));

  for (let i = 1; i < counterRows + 1; i++) {
    const row = new Array(counterChar).fill("").map(templateCell).join("");

    rows.push(templateRow(row, i));
  }

  return rows.join("");
};
