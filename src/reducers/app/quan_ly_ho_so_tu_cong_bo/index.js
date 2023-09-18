import { combineReducers } from "redux";
import ho_so_tu_cong_bo from "./ho_so_tu_cong_bo";
import thong_bao_cong_bo_san_pham from "./thong_bao_ho_so_tu_cong_bo";
import bao_cao_thong_ke from "./bao_cao_thong_ke";
import danh_sach_san_pham_ocop from "./danh_sach_san_pham_ocop"

export default combineReducers({
    ho_so_tu_cong_bo,
    thong_bao_cong_bo_san_pham,
    bao_cao_thong_ke,
    danh_sach_san_pham_ocop
});