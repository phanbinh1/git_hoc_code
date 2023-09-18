import * as type from './../../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_THIDUA_KHENTHUONG_EDIT:
            return { ...value };
        case type.TYPE_THIDUA_KHENTHUONG_DETAIL:
            return { ...value };
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}