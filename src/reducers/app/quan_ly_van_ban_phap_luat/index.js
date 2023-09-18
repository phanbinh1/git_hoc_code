import { combineReducers } from "redux";

import van_ban_phap_luat from "./van_ban_phap_luat";
import linh_vuc from "./linh_vuc";

export default combineReducers({
    van_ban_phap_luat,
    linh_vuc
});