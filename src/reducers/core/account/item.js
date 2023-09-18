import * as type from './../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_ACCOUNT_EDIT:
            return {
                ...value,
                isEnable: value.isEnable && value.isEnable === 1 ? true : false
            };
        case type.TYPE_ACCOUNT_CREATE:
            return {};
        case type.TYPE_ACCOUNT_UPDATE:
            return {};
        // case type.TYPE_SOCKET_ACCOUNT:
        //     if (value.id === payload.id) {
        //         payload.isEnable = (payload.hasOwnProperty("isEnable") && payload.isEnable === 1) ? true : false;
        //         return payload;
        //     }
        //     return state;
        default:
            return state;
    }
}