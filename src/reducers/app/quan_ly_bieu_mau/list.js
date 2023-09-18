import * as type from './../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_BIEU_MAU_LIST:
            return [...values];
        case type.TYPE_QUAN_LY_BIEU_MAU_CREATE:
            return [value, ...state];
        case type.TYPE_QUAN_LY_BIEU_MAU_UPDATE:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return value;
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_QUAN_LY_BIEU_MAU_DELETE:
            return state.filter(item => values.findIndex(id => id === item.id) === -1);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}