import * as type from './../../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QLCTDSON_DM_CHI_TIEU_EDIT:
            return { ...value };
        case type.TYPE_QLCTDSON_DM_CHI_TIEU_CREATE:
            return {};
        case type.TYPE_QLCTDSON_DM_CHI_TIEU_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}