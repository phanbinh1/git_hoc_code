import * as type from './../../../constants/type';
import { formatItem } from "./";
import { CONST_PERMISSION_TYPE_URL } from '../../../constants/constants';

export default (state = {}, action) => {
    var { value, payload } = action;
    switch (action.type) {
        case type.TYPE_PERMISSION_EDIT:
            return value.id ? formatItem({ ...value }) : {
                type: CONST_PERMISSION_TYPE_URL,
                hiddenAction: true,
                menuLeft: true
            };
        case type.TYPE_PERMISSION_CREATE:
            return {};
        case type.TYPE_PERMISSION_UPDATE:
            return {};
        case type.TYPE_SOCKET_PERMISSION:
            switch (payload.type) {
                case type.TYPE_PERMISSION_UPDATE:
                    if (state.id === payload.data.id) {
                        return formatItem(payload.data)
                    }
                    return state;
                case type.TYPE_PERMISSION_CREATE:
                    return formatItem(payload.data);
                default:
                    return state;
            }
        default:
            return state;
    }
}