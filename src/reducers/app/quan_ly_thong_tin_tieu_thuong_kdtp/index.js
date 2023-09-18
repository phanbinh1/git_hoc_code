import { combineReducers } from "redux";

import danh_muc_cho from "./danh_muc_cho";
import nhom_nganh_hang from "./nhom_nganh_hang";
import ho_tieu_thuong from "./ho_tieu_thuong"
import bao_cao_ds_ho_tieu_thuong from './bao_cao_ds_ho_tieu_thuong'

export default combineReducers({
    danh_muc_cho,
    nhom_nganh_hang,
    ho_tieu_thuong,
    bao_cao_ds_ho_tieu_thuong
});