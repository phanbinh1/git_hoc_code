import { combineReducers } from "redux";
import count from "./count";
import list from "./list";
import pagination from "./pagination";
import page_count from "./page_count";
import page_list from "./page_list";
import page_pagination from "./page_pagination";

export default combineReducers({
    count,
    pagination,
    list,
    page_count,
    page_pagination,
    page_list,
});