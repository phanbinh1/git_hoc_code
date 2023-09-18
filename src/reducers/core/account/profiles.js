import * as type from './../../../constants/type';
import { deduplicate } from '../../../constants/main';
import { orderBy } from "lodash"

export default (state = [], action) => {
    var { value, values, payload } = action;
    let result = state;
    switch (action.type) {
        case type.TYPE_GET_ACCOUNT_CURRENT:
            result = [...state, value];
            break;
        case type.TYPE_ACCOUNT_LIST:
            result = [...state, ...values];
            break;
        case type.TYPE_ACCOUNT_CREATE:
            result = [...state, value];
            break;
        case type.TYPE_ACCOUNT_UPDATE:
            result = [...state, value];
            break;
        case type.TYPE_ACCOUNT_PROFILE:
            result = [...state, value];
            break;
        case type.TYPE_ACCOUNT_PROFILES:
            result = [...state, ...values];
            break;
        case type.TYPE_RESET_STORE:
            result = [];
            break;
        case type.TYPE_SOCKET_ACCOUNT:
            switch (payload.type) {
                case type.TYPE_ACCOUNT_CREATE:
                    result = [...state, payload.data];
                    break;
                case type.TYPE_ACCOUNT_UPDATE:
                    result = state.map((item) => item.name === payload.data.name ? payload.data : item);
                    break;
                case type.TYPE_ACCOUNT_DELETE:
                    result = state.filter(item => payload.data.findIndex(name => name === item.name) === -1);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return orderBy(deduplicate(result, "name"), ["sort"], ["asc"]);
}