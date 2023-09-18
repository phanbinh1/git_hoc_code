import { combineReducers } from "redux";

import ho_so_chuoi_thuc_pham from "./ho_so_chuoi_thuc_pham";
import ke_hoach_tham_dinh from "./ke_hoach_tham_dinh";
import nhom_chuoi_thuc_pham from "./nhom_chuoi_thuc_pham";
import thong_ke_bao_cao from "./thong_ke_bao_cao";

export default combineReducers({
    ho_so_chuoi_thuc_pham,
    ke_hoach_tham_dinh,
    nhom_chuoi_thuc_pham,
    thong_ke_bao_cao
});