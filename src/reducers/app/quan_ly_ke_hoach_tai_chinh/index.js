import { combineReducers } from "redux";

import ke_hoach_tai_chinh from "./ke_hoach_tai_chinh";
import tai_chinh from "./tai_chinh";
import thuc_hien from "./thuc_hien";

export default combineReducers({
    ke_hoach_tai_chinh,
    tai_chinh,
    thuc_hien
});