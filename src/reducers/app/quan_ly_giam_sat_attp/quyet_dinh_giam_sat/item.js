import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_GIAM_SAT_ATTP_QUYET_DINH_GIAM_SAT_EDIT:
            return { ...value };
        case type.TYPE_GIAM_SAT_ATTP_QUYET_DINH_GIAM_SAT_CREATE:
            return { ...value };
        case type.TYPE_GIAM_SAT_ATTP_QUYET_DINH_GIAM_SAT_UPDATE:
            return { ...value };
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}