import * as type from "./../../../../constants/type";
import { getPermissionChild, deletePermissionChild, updatePermissionChild } from "./";

export default (state = [], action) => {
   var { values, value, payload } = action;
   switch (action.type) {
      case type.DANH_MUC_TIEU_CHI_MENU:
         return getPermissionChild(values).map(m => {
            return {
               childs: m.childs.sort((a, b) => {
                  let ac = parseInt(a.danhMucTieuChi.stt);
                  let bc = parseInt(b.danhMucTieuChi.stt)
                  return ac - bc
               }),
               danhMucTieuChi: m.danhMucTieuChi
            }
         }).sort((a, b) => {
            let ac = parseInt(a.danhMucTieuChi.sttRoman);
            let bc = parseInt(b.danhMucTieuChi.sttRoman)
            return ac - bc
         });
      case type.TYPE_RESET_STORE:
         return [];
      default:
         return state;
   }
}