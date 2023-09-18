import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    switch (action.type) {
        case type.TYPE_CAU_HINH_NGHI_PHEP_LIST:
            return [...values];
        case type.TYPE_CAU_HINH_NGHI_PHEP_CREATE:
            return [value, ...state];
        case type.TYPE_CAU_HINH_NGHI_PHEP_UPDATE:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return value;
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_CAU_HINH_NGHI_PHEP_DELETE:
            return state.filter(item => values.findIndex(id => id === item.id) === -1);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}