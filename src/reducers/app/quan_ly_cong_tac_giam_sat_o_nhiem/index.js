import { combineReducers } from "redux";

import loai_thuc_pham from "./danh_muc/loai_thuc_pham";
import chi_tieu from "./danh_muc/chi_tieu";
import dot_kiem_tra from "./dot_kiem_tra";
import thong_ke_bao_cao from "./thong_ke_bao_cao";
import ke_hoach_kiem_tra from "./ke_hoach_kiem_tra";
import cuoc_giam_sat from "./cuoc_giam_sat"

export default combineReducers({
    loai_thuc_pham,
    chi_tieu,
    dot_kiem_tra,
    thong_ke_bao_cao,
    ke_hoach_kiem_tra,
    cuoc_giam_sat
});