import {storage} from "@core/utils";

const defaultState = {
  colSize: {},
  rowSize: {},
  title: ""
}

export const initState = storage("state") ? storage("state") : defaultState