import * as type from './../../../constants/type';


export default (state = {}, action) => {
    switch (action.type) {
        case type.TYPE_AUTH_CLIENT_SUA:
            return action.value;
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}