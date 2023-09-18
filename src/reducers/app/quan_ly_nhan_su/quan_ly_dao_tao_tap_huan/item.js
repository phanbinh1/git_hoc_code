import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_THONGTIN_DAOTAO_TAPHUAN_EDIT:
            return { ...value };
        case type.TYPE_THONGTIN_DAOTAO_TAPHUAN_DETAIL:
            return { ...value };
        case type.TYPE_THONGTIN_DAOTAO_TAPHUAN_CREATE:
            return {};
        case type.TYPE_THONGTIN_DAOTAO_TAPHUAN_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}