import { combineReducers } from "redux";
import thong_tin_nghi_phep from "./thong_tin_nghi_phep";
import thong_tin_cong_tac from "./thong_tin_cong_tac";
import thong_tin_cau_hinh_nghi_phep from "./thong_tin_cau_hinh_nghi_phep";
import thong_ke_bao_cao_nghi_phep from "./thong_ke_bao_cao";

export default combineReducers({
    thong_tin_nghi_phep,
    thong_tin_cong_tac,
    thong_tin_cau_hinh_nghi_phep,
    thong_ke_bao_cao_nghi_phep
});