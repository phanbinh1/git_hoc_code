import { combineReducers } from "redux";
import xac_nhan_quang_cao from "./xac_nhan_quang_cao";
import bao_cao_thong_ke from "./thong_ke_bao_cao";

export default combineReducers({
    xac_nhan_quang_cao,
    bao_cao_thong_ke,
});