import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values } = action;
    switch (action.type) {
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_QUAN_HUYEN_LIST:
            return [...values];
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}