import { combineReducers } from "redux";
import ho_so_phan_anh_kien_nghi from "./ho_so"
import bien_ban_thanh_tra from "./bien_ban_thanh_tra"
import bien_ban_xu_phat from "./bien_ban_xu_phat"
import ho_so_tiep_nhan from "./ho_so_tiep_nhan"
import ho_so_dang_xu_ly from "./ho_so_xu_ly"

export default combineReducers({
    ho_so_phan_anh_kien_nghi,
    bien_ban_thanh_tra,
    bien_ban_xu_phat,
    ho_so_tiep_nhan,
    ho_so_dang_xu_ly
});