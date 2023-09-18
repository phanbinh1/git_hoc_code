import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values } = action;
    switch (action.type) {
        case type.TYPE_HO_SO_TIEP_NHAN_MOT_CUA_LIST:
            return [...values];
        default:
            return state;
    }
}