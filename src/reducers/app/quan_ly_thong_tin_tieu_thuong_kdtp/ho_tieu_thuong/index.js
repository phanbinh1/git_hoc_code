import {combineReducers} from "redux"
import list from "./list"
import item from "./item"
import lo_kinh_doanh from "./lo_kinh_doanh"

export default combineReducers({
    list,
    item,
    lo_kinh_doanh
})