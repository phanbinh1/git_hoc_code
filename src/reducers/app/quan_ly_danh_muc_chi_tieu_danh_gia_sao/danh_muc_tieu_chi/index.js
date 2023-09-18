import { combineReducers } from "redux";
import item from "./item";
import list from "./list";
// import permission_menu from "./danhmuc_menu";
import menu from "./menu";
// import priviliged from "./priviliged";
// import { CONST_PERMISSION_TYPE_ACTION_HIDDEN, CONST_PERMISSION_TYPE_ACTION, CONST_PERMISSION_TYPE_URL, CONST_PERMISSION_TYPE_URL_HIDDEN } from '../../../../constants/constants';
import { orderBy } from "lodash";

export default combineReducers({
    item,
    list,
   //  priviliged,
   //  permission_menu,
    menu
})

export const formatItem = (item) => ({
    ...item
});

export const getPermissionChild = (list) => {
    const result = Array.isArray(list) ? list.map(item => ({ ...formatItem(item), children: getPermissionChild(item.children) })) : [];
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const deletePermissionChild = (list, permissionIds) => {
    const result = Array.isArray(list) ? list.filter(item => permissionIds.findIndex(id => item.id === id) < 0).map(item => ({ ...item, children: deletePermissionChild(item.children, permissionIds) })) : [];
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const updatePermissionChild = (list, permission) => {
    const result = Array.isArray(list) ? list.map(item => ({ ...(permission && permission.id === item.id ? formatItem(permission) : item), children: updatePermissionChild(item.children) })) : [];
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const createPermissionChild = (list, permission) => {
    let result = [];
    if (Array.isArray(list)) {
        if (permission.idParent === 0) {
            result = [...list, { ...formatItem(permission), children: [] }];
        }
        else {
            result = list.map(item => permission.idParent === item.id ? ({ ...item, children: [...item.children, { ...formatItem(permission), children: [] }] }) : ({ ...item, children: createPermissionChild(item.children, permission) }));
        }
    }
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const getPermission = (list) => {
    const result = Array.isArray(list) ? list.map(item => formatItem(item)) : [];
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const deletePermission = (list, permissionIds) => {
    const result = Array.isArray(list) ? list.filter(item => permissionIds.findIndex(id => item.id === id) < 0) : [];
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const updatePermission = (list, permission) => {
    const result = Array.isArray(list) ? list.map(item => ({ ...(permission && permission.id === item.id ? formatItem(permission) : item) })) : [];
    return orderBy(result, ["sort", "id"], ["asc"]);
}

export const createPermission = (list, permission) => {
    const result = [...(Array.isArray(list) ? list : []), formatItem(permission)];
    return orderBy(result, ["sort", "id"], ["asc"]);
}