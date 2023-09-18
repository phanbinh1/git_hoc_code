import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value, id } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_TAI_SAN_LIST_DETAIL:
            return state.map(item => (item.id === id ? {
                ...item,
                details: values
            } : item))
        case type.TYPE_QUAN_LY_TAI_SAN_LIST:
            return [...values];
        case type.TYPE_QUAN_LY_TAI_SAN_CREATE:
            return [value, ...state];
        case type.TYPE_QUAN_LY_TAI_SAN_UPDATE:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return value;
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_QUAN_LY_TAI_SAN_DELETE:
            return state.filter(item => values.findIndex(id => id === item.id) === -1);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}