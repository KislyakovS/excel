import { range } from "@core/utils";

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

  //this.selection.setGroupSelection($els);
};
