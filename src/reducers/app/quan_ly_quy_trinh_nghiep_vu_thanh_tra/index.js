import { combineReducers } from "redux";
import cuoc_thanh_tra from "./cuoc_thanh_tra"
import bien_ban from "./bien_ban"
import ke_hoach_thanh_tra from "./ke_hoach_thanh_tra"

export default combineReducers({
    ke_hoach_thanh_tra,
    cuoc_thanh_tra,
    bien_ban,
});