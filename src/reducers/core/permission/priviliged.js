import * as type from './../../../constants/type';

export default (state = [], action) => {
    var { values, actionCode } = action;
    switch (action.type) {
        case type.TYPE_PERMISSION_GET_PRIVILIGED:
            switch (actionCode) {
                case "create":
                    return [...state, ...values];
                case "delete":
                    return state.filter(item => values.findIndex(c => item.idChucNang === c.idChucNang) === -1);
                default:
                    return values;
            }
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}