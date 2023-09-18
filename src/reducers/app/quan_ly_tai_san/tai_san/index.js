import item from "./item";
import list from "./list";
import list_detail from "./list_detail";
import tai_san_co_dinh from "./tai_san_co_dinh";
import cong_cu_dung_cu from "./cong_cu_dung_cu";

import { combineReducers } from "redux";

export default combineReducers({
    item,
    list,
    list_detail,
    tai_san_co_dinh,
    cong_cu_dung_cu
});