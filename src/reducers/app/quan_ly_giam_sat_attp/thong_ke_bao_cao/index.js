import { combineReducers } from "redux";

import su_kien from "./bao_cao_su_kien";
import chi_tiet_su_kien from "./bao_cao_chi_tiet_su_kien";
import ke_hoach_giam_sat_attp from "./bao_cao_ke_hoach_giam_sat";
import giam_sat_attp from "./bao_cao_giam_sat_attp";

export default combineReducers({
    su_kien,
    chi_tiet_su_kien,
    ke_hoach_giam_sat_attp,
    giam_sat_attp,

});