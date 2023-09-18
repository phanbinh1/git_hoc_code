import { combineReducers } from "redux";
import item from "./item";
import list from "./list";
import van_ban_dieu_hanh from "./van_ban_dieu_hanh";

export default combineReducers({
    item,
    list,
    van_ban_dieu_hanh
});