import { combineReducers } from "redux";
import item from "./item";
import list from "./list";
import ket_qua_thanh_tra from "./ket_qua_thanh_tra";

export default combineReducers({
    item,
    list,
    ket_qua_thanh_tra
});