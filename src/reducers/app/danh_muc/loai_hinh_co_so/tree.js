import * as type from '../../../../constants/type';

export default (state = [], action) => {
    var { values } = action;
    switch (action.type) {
        case type.TYPE_LOAI_HINH_CO_SO_LIST_TREE:
            return [...values];
        default:
            return state;
    }
}