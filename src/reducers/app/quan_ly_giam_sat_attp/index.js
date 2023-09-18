import { combineReducers } from "redux";

import su_kien from "./su_kien";
import loai_su_kien from "./loai_su_kien";
import chi_tiet_su_kien from "./chi_tiet_su_kien";
import ke_hoach_giam_sat_attp from "./ke_hoach_giam_sat_attp";
import giam_sat_attp from "./giam_sat_attp";
import thong_ke_bao_cao from "./thong_ke_bao_cao";
import quyet_dinh_giam_sat from "./quyet_dinh_giam_sat";

export default combineReducers({
    su_kien,
    loai_su_kien,
    chi_tiet_su_kien,
    ke_hoach_giam_sat_attp,
    giam_sat_attp,
    thong_ke_bao_cao,
    quyet_dinh_giam_sat
});