import { combineReducers } from "redux";

import tai_san from "./tai_san";
import thanh_ly_tai_san from "./thanh_ly_tai_san";
import thong_ke_bao_cao from "./thong_ke_bao_cao";

export default combineReducers({
    tai_san,
    thanh_ly_tai_san,
    thong_ke_bao_cao
});