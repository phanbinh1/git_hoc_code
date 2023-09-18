import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_NHOM_CHUOI_THUC_PHAM_EDIT:
            return { ...value };
        default:
            return state;
    }
}