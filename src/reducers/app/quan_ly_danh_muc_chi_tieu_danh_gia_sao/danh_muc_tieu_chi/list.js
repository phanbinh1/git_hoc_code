import * as type from './../../../../constants/type';
import { createPermission, deletePermission, getPermission, updatePermission } from "./";

export default (state = [], action) => {
    var { values, value, payload } = action;
    switch (action.type) {
        case type.DANH_MUC_TIEU_CHI_LIST:
            return getPermission(values);
        case type.DANH_MUC_TIEU_CHI_CREATE:
            return createPermission(state, value);
        case type.DANH_MUC_TIEU_CHI_UPDATE:
            return updatePermission(state, value);
        case type.DANH_MUC_TIEU_CHI_DELETE:
            return deletePermission(state, values);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}