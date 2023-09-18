import * as type from './../../../../constants/type';
import { formatItem } from "./";
// import { CONST_PERMISSION_TYPE_URL } from '../../../constants/constants';

export default (state = {}, action) => {
   var { value, payload } = action;
   switch (action.type) {
      case type.DANH_MUC_TIEU_CHI_EDIT:
         return value
      default:
         return state;
   }
}