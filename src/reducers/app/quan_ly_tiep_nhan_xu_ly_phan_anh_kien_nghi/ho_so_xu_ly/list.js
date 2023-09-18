import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    switch (action.type) {
        case type.TYPE_PAKN_HO_SO_DANG_XU_LY_LIST:
            return [...values];
      //   case type.TYPE_PAKN_HO_SO_CREATE:
      //       return [value, ...state];
      //   case type.TYPE_PAKN_HO_SO_UPDATE:
      //       state = state.map((item) => {
      //           if (item.id === value.id) {
      //               return value;
      //           }
      //           else {
      //               return item;
      //           }
      //       });
      //       return [...state];
      //   case type.TYPE_PAKN_HO_SO_DELETE:
      //       return state.filter(item => values.findIndex(id => id === item.id) === -1);
      //   case type.TYPE_PAKN_BIEN_BAN_THANH_TRA_CREATE:
      //       return state.map((item) => {
      //           if (item.id === value.hoSoPhanAnhKienNghiFkid) {
      //               return { ...item, bienBanThanhTra: value };
      //           }
      //           else {
      //               return item;
      //           }
      //       });
      //   case type.TYPE_PAKN_BIEN_BAN_THANH_TRA_UPDATE:
      //       return state.map((item) => {
      //           if (item.id === value.hoSoPhanAnhKienNghiFkid) {
      //               return { ...item, bienBanThanhTra: value };
      //           }
      //           else {
      //               return item;
      //           }
      //       });
      //   case type.TYPE_PAKN_BIEN_BAN_XU_PHAT_CREATE:
      //       return state.map((item) => {
      //           if (value.hoSoPhanAnhKienNghi && item.id === value.hoSoPhanAnhKienNghi.id) {
      //               return { ...item, bienBanXuPhat: value };
      //           }
      //           else {
      //               return item;
      //           }
      //       });
      //   case type.TYPE_PAKN_BIEN_BAN_XU_PHAT_UPDATE:
      //       return state.map((item) => {
      //           if (value.hoSoPhanAnhKienNghi && item.id === value.hoSoPhanAnhKienNghi.id) {
      //               return { ...item, bienBanXuPhat: value };
      //           }
      //           else {
      //               return item;
      //           }
      //       });
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}