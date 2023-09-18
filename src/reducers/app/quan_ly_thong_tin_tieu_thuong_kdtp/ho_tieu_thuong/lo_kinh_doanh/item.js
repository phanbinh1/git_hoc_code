import * as type from './../../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_LO_KINH_DOANH_EDIT:
            return { ...value };
        case type.TYPE_LO_KINH_DOANH_CREATE:
            return {};
        case type.TYPE_LO_KINH_DOANH_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}