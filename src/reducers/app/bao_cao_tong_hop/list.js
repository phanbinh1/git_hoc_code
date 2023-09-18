import * as type from './../../../constants/type';

export default (state = [], action) => {
    const { values, value } = action;
    var index = -1;
    switch (action.type) {
        case type.TYPE_BAO_CAO_TONG_HOP_LIST:
            return [...values];
        case type.TYPE_BAO_CAO_TONG_HOP_CREATE:
            return [value, ...state];
        case type.TYPE_BAO_CAO_TONG_HOP_UPDATE:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return value;
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_BAO_CAO_TONG_HOP_DELETE:
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