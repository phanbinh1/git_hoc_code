import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_EDIT:
            return { ...value };
        default:
            return state;
    }
}