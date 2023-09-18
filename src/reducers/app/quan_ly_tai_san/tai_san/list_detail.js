import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_TAI_SAN_LIST_DETAIL:
            return [...values];
        case type.TYPE_QUAN_LY_TAI_SAN_LIST_DETAIL_UPDATE:
            return state.map(item => {
                if (value && value.id && item.id === value.id) {
                    return value;
                }
                return item;
            })
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}