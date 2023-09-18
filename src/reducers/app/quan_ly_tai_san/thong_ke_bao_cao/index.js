import { combineReducers } from "redux";

import bao_cao_cong_cu_dung_cu from "./bao_cao_cong_cu_dung_cu";
import bao_cao_tai_san_co_dinh from "./bao_cao_tai_san_co_dinh";

export default combineReducers({
    bao_cao_cong_cu_dung_cu,
    bao_cao_tai_san_co_dinh

});