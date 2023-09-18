import * as type from './../../../constants/type';
import { removeAuth } from '../../../constants/main';
const init = {
    authenticated: true,
    error: false,
    checked: false
}
export default (state = init, action) => {
    switch (action.type) {
        case type.TYPE_AUTHENTICATED_CHECKED:
            return {
                ...state,
                checked: true
            }
        case type.TYPE_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                error: false,
                checked: true
            };
        case type.TYPE_UNAUTHENTICATED:
            removeAuth();
            return {
                ...state,
                authenticated: false,
                error: true,
                checked: false
            };
        case type.TYPE_AUTHENTICATION_ERROR:
            return {
                ...state,
                error: action.error,
                checked: false
            };
        case type.TYPE_RESET_STORE:
            return init;
        default:
            return state;
    }
}