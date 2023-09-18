import * as api from "./../../../util/api_call";
import * as apiUrl from './../../../constants/api';
import * as main from "./../../../constants/main";
import * as message from "./../../../constants/message";

export const qrcodeValid = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QRCODE_VALID(data.id),
                controller
            }).then(async res => {
                if (res && res.status) {
                    await requestSuccess(res);
                }
                else {
                    await requestError();
                }
            })
        }
    }
}

export const qrcodeValidPublic = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QRCODE_PUBLIC_VALID(data.id),
                controller
            }).then(async res => {
                if (res && res.status) {
                    await requestSuccess(res);
                }
                else {
                    await requestError();
                }
            })
        }
    }
}