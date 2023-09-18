import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    var index = -1;
    switch (action.type) {
        case type.TYPE_LINH_VUC_LIST:
            return [...values];
        case type.TYPE_LINH_VUC_CREATE:
            return [value, ...state];
        case type.TYPE_LINH_VUC_UPDATE:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return value;
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_LINH_VUC_DELETE:
            values.map((id) => {
                index = state.findIndex(item => item.id === id);
                if (index !== -1) {
                    state.splice(index, 1);
                }
                return state;
            })
            return [...state];
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}