import {ADD_STYLE_CELL, HEADER_TITLE, INPUT_CELL, TABLE_RESIZE, TABLE_SELECTED} from "@/redux/types";

export const resizeTable = (data) => ({type: TABLE_RESIZE, data})
export const selectedTable = (data) => ({type: TABLE_SELECTED, data})
export const inputHeader = (data) => ({type: HEADER_TITLE, data})
export const inputCell = (data) => ({type: INPUT_CELL, data})
export const addStyleCell = (data) => ({type: ADD_STYLE_CELL, data})