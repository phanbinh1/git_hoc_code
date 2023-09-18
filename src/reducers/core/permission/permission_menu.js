import { deletePermissionChild, getPermissionChild, updatePermissionChild, createPermissionChild } from '.';
import * as type from './../../../constants/type';

export default (state = [], action) => {
    var { values, value, payload } = action;
    switch (action.type) {
        case type.TYPE_PERMISSION_MENU:
            return getPermissionChild(values);
        case type.TYPE_PERMISSION_CREATE:
            return createPermissionChild(state, value);
        case type.TYPE_PERMISSION_DELETE:
            return deletePermissionChild(state, values);
        case type.TYPE_PERMISSION_UPDATE:
            return updatePermissionChild(state, value);
        case type.TYPE_SOCKET_PERMISSION:
            switch (payload.type) {
                case type.TYPE_PERMISSION_CREATE:
                    return createPermissionChild(state, payload.data);
                case type.TYPE_PERMISSION_UPDATE:
                    return updatePermissionChild(state, payload.data);
                case type.TYPE_PERMISSION_DELETE:
                    return deletePermissionChild(state, payload.data);
                default:
                    return state;
            }
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}