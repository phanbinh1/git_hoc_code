import * as type from './../../../constants/type';
import { createPermission, deletePermission, getPermission, updatePermission } from "./";

export default (state = [], action) => {
    var { values, value, payload } = action;
    switch (action.type) {
        case type.TYPE_PERMISSION_LIST:
            return getPermission(values);
        case type.TYPE_PERMISSION_CREATE:
            return createPermission(state, value);
        case type.TYPE_PERMISSION_UPDATE:
            return updatePermission(state, value);
        case type.TYPE_PERMISSION_DELETE:
            return deletePermission(state, values);
        case type.TYPE_SOCKET_PERMISSION:
            switch (payload.type) {
                case type.TYPE_PERMISSION_UPDATE:
                    return updatePermission(state, payload.data);
                case type.TYPE_PERMISSION_CREATE:
                    return createPermission(state, payload.data);
                case type.TYPE_PERMISSION_DELETE:
                    return deletePermission(state, payload.data);
                default:
                    return state;
            }
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}