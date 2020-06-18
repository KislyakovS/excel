import {storage} from "@core/utils";

const defaultState = {
  colSize: {},
  rowSize: {},
  title: "",
  dataCell: {},
  currentText: ""
}

export const initState = storage("state") ? storage("state") : defaultState