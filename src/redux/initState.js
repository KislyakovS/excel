import {storage} from "@core/utils";

const defaultState = {
  colSize: {},
  rowSize: {}
}

export const initState = storage("state") ? storage("state") : defaultState