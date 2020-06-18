import {range} from "@core/utils";

export const matrix = ($cell, $currentSelection, $root) => {
  const [startRow, startColum] = $cell.id(":");
  const [endRow, endColum] = $currentSelection.id(":");

  const rows = range(+startRow, +endRow);
  const columns = range(+startColum, +endColum);

  const ids = columns.reduce((acum, col) => {
    rows.forEach((row) => acum.push(`${row}:${col}`));

    return acum;
  }, []);

  const $els = ids.map((id) => $root.find(`[data-id="${id}"]`));

  return $els;
};

export const nextSlector = (key, [row, col], counterRows, counterCols) => {
  switch (key) {
    case "Enter":
    case "ArrowDown":
      row = row == counterRows ? row : parseInt(row) + 1
      break;
    case "Tab":
    case "ArrowRight":
      col = col == counterCols ? col : parseInt(col) + 1
      break;
    case "ArrowLeft":
      col = col == 0 ? col : col - 1
      break;
    case "ArrowUp":
      row = row == 1 ? row : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}

export const setWidthRows = ($rows, width) => $rows.forEach($row => $row.style.width = `${width}px`)