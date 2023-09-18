import * as type from './../../../../constants/type';

export default (state = {}, action) => {
   var { value } = action;
   switch (action.type) {
      case type.TYPE_DANH_GIA_HANG_SAO_EDIT:
         return { ...value };
      case type.TYPE_DANH_GIA_HANG_SAO_CREATE:
         return {};
      case type.TYPE_DANH_GIA_HANG_SAO_UPDATE:
         return {};
      case "DANH_GIA_MUC_HANG_SAO_NULL":
         return {}
      case type.TYPE_RESET_STORE:
         return {};
      default:
         return state;
   }
}