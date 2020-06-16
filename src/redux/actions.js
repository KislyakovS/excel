import {TABLE_RESIZE, TABLE_SELECTED} from "@/redux/types";

export const resizeTable = (data) => ({type: TABLE_RESIZE, data})
export const selectedTable = (data) => ({type: TABLE_SELECTED, data})