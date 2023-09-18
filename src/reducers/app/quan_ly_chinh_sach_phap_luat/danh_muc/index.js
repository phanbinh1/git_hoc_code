import { combineReducers } from "redux";

import mau_kiem_nghiem from "./mau_kiem_nghiem";
import mau_thuc_pham_nong_nghiep from "./mau_thuc_pham_nong_nghiep";
import truyen_thong from "./truyen_thong";


export default combineReducers({
    mau_kiem_nghiem,
    mau_thuc_pham_nong_nghiep,
    truyen_thong,


});