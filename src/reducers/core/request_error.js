import * as type from './../../constants/type';
const init = {
    e_400: false,
    e_401: false,
    e_403: false,
    e_404: false,
    e_500: false,
}
export default (state = init, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_ERROR_400:
            return { ...state, e_400: value };
        case type.TYPE_ERROR_401:
            return { ...state, e_401: value };
        case type.TYPE_ERROR_403:
            return { ...state, e_403: value };
        case type.TYPE_ERROR_404:
            return { ...state, e_404: value };
        case type.TYPE_ERROR_500:
            return { ...state, e_500: value };
        default:
            return state;
    }
}