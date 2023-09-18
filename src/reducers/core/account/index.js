import { combineReducers } from "redux";

import item from "./item";
import list from "./list";
import profiles from "./profiles";
import phong_bans from "./phong_ban";
// ===================================================================================

export default combineReducers({
    item,
    list,
    profiles,
    phong_bans
})