import * as type from '../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    switch (action.type) {
        case type.TYPE_SAN_PHAM_OCOP_LIST:
            return [...values];
            case type.TYPE_DANH_SACH_OCOP_DELETE:
            return state.filter(item => values.findIndex(id => id === item.id) === -1);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}