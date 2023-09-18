import { combineReducers } from "redux";

import ho_so_cap_giay_chung_nhan from "./ho_so_cap_giay_chung_nhan";
import ke_hoach_tham_dinh from "./ke_hoach_tham_dinh";
import thong_ke_bao_cao from "./thong_ke_bao_cao";

export default combineReducers({
    ho_so_cap_giay_chung_nhan,
    ke_hoach_tham_dinh,
    thong_ke_bao_cao
});