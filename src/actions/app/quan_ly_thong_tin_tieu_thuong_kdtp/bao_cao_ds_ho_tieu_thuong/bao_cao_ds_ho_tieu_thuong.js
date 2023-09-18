import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as type from "./../../../../constants/type";

export const getAllDSRequest = (object = {}, type = 1) => {
    var { data, requestSuccess, requestError, controller, pageKey } = main.checkValidObjectRequest(object);
    const url = apiUrl.API_BAO_CAO_HO_TIEU_THUONG

    return dispatch => {
        return api.get({
            url,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAllDS(res.result))
                requestSuccess(res);
            }
            else {
                res && res.msg && message.error({ content: res.msg });
                requestError();
            }
        });
    }
}

const handleGetAllDS = (values) => {
    return {
        type: type.TYPE_BAO_CAO_HO_TIEU_THUONG_LIST,
        values,
    }
}