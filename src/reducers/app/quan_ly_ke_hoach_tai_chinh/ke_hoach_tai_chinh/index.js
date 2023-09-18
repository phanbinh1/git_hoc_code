import item from "./item";
import list from "./list";
import list_chuyen_mon from "./list_chuyen_mon";
import list_tong_hop from "./list_tong_hop";
import list_egov from "./list_egov";

import { combineReducers } from "redux";

export default combineReducers({
    item,
    list,
    list_chuyen_mon,
    list_tong_hop,
    list_egov
});