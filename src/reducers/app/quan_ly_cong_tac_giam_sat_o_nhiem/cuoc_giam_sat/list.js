import * as type from "./../../../../constants/type";

export default (state = [], action) => {
  var { values, value } = action;
  switch (action.type) {
    case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_LIST:
      return [...values];
    case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CREATE:
      return [value, ...state];
    case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CHILD_CREATE:
      return state.map((item) => {
        if (item.id === value.idChaCuocGiamSat) {
          return {
            ...item,
            dotGiamSat:
              item.dotGiamSat.findIndex((dtt) => dtt.id === value.id) >= 0
                ? item.dotGiamSat.map((dtt) =>
                    dtt.id === value.id ? value : dtt
                  )
                : [...item.dotGiamSat, value],
          };
        } else {
          return item;
        }
      });
    case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CHILD_UPDATE:
      return state.map((item) => {
        if (item.id === value.idChaCuocGiamSat) {
          return {
            ...item,
            dotGiamSat:
              item.dotGiamSat.findIndex((dtt) => dtt.id === value.id) >= 0
                ? item.dotGiamSat.map((dtt) =>
                    dtt.id === value.id ? value : dtt
                  )
                : [...item.dotGiamSat, value],
          };
        } else {
          return item;
        }
      });
    case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE:
      state = state.map((item) => {
        if (item.id === value.id) {
          return value;
        } else {
          return item;
        }
      });
      return [...state];
    case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_DELETE:
      return state.filter(
        (item) => values.findIndex((id) => id === item.id) === -1
      );
    case type.TYPE_RESET_STORE:
      return [];
    default:
      return state;
  }
};
