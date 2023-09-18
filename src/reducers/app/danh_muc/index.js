import { combineReducers } from "redux";

import linh_vuc from "./linh_vuc";
import loai_hinh_co_so from "./loai_hinh_co_so";
import dia_ban from "./dia_ban";
import quan_ly_phong_ban from "./quan_ly_phong_ban";
import quan_ly_quoc_gia from "./quan_ly_quoc_gia";
import nhom from "./nhom";
import phan_nhom from "./phan_nhom";
import nhom_tai_san from "./nhom_tai_san";
import loai_tai_chinh from "./loai_tai_chinh";
import nguon_kinh_phi from "./nguon_kinh_phi";
import doan_tham_dinh from "./doan_tham_dinh";

export default combineReducers({
    linh_vuc,
    loai_hinh_co_so,
    dia_ban,
    quan_ly_phong_ban,
    quan_ly_quoc_gia,
    nhom,
    phan_nhom,
    nhom_tai_san,
    loai_tai_chinh,
    nguon_kinh_phi,
    doan_tham_dinh
});