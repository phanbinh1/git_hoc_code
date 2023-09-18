import * as type from "./../constants/type";
import * as constants from "./../constants/constants";
import * as pageKeys from "./../constants/page_key";
import * as api from "./../util/api_call";
import * as apiUrl from './../constants/api';
import * as main from "./../constants/main";

export const ConvertHtmlToPdfBase64 = async (object) => {
    const { data, controller } = main.checkValidObjectRequest(object);
    const res = await api.post({
        url: apiUrl.API_CONVERT_HTML_TO_PDF_BASE64,
        data,
        controller
    })
    return res;
}

export const getFiles = (object) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.get({
        url: apiUrl.API_ATTACH_FILE,
        data,
        controller
    }).then((res) => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError(res)
        }
    }).catch((res) => {
        requestError(res)
    })
}

export const deleteFiles = (object) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.del({
        url: apiUrl.API_ATTACH_FILE,
        data,
        controller
    }).then((res) => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError(res)
        }
    }).catch((res) => {
        requestError(res)
    })
}

export const setAction = (arrAction) => {
    return {
        type: type.TYPE_ACTIONS,
        values: arrAction
    }
}

export const selectRow = (rows_selected, key = pageKeys.PAGE_KEY_DEFAULT) => {
    return {
        type: type.TYPE_SELECT_ROW,
        key,
        rows_selected
    }
}

export const requestError = (error = 401, value = true) => {
    switch (error) {
        case 400:
            return { type: type.TYPE_ERROR_400, value };
        case 401:
            return { type: type.TYPE_ERROR_401, value };
        case 403:
            return { type: type.TYPE_ERROR_403, value };
        case 404:
            return { type: type.TYPE_ERROR_404, value };
        case 500:
            return { type: type.TYPE_ERROR_500, value };
        default:
            return null;

    }
}


export const startLoading = () => {
    return {
        type: type.TYPE_START_LOADING
    }
}

export const endLoading = () => {
    return {
        type: type.TYPE_END_LOADING
    }
}

export const resetStore = () => {
    return {
        type: type.TYPE_RESET_STORE
    }
}

export const handleChangeLayout = (obj = {}) => {
    var actionType = null, value = null;
    if (obj.key) {
        switch (obj.key) {
            case constants.CONST_LAYOUT_KEY_MENU_LEFT:
                actionType = type.TYPE_LAYOUT_MENU_LEFT;
                value = { menu_left: obj.value }
                break;
            case constants.CONST_LAYOUT_KEY_MENU_RIGHT:
                actionType = type.TYPE_LAYOUT_MENU_RIGHT;
                value = { menu_right: { width: constants.CONST_LAYOUT_MENU_RIGHT.width, ...obj.value } }
                break;
            case constants.CONST_LAYOUT_KEY_TABLE:
                actionType = type.TYPE_LAYOUT_TABLE;
                value = { table: obj.value }
                break;
            case constants.CONST_LAYOUT_KEY_FORM:
                actionType = type.TYPE_LAYOUT_FORM;
                value = { form: obj.form, style: obj.style }
                break;
            default:
                return null;
        }
        return {
            type: actionType,
            value
        }
    }
}