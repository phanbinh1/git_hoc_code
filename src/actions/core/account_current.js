import * as message from './../../constants/message';
import * as api from "./../../util/api_call";
import * as apiUrl from './../../constants/api';
import * as type from "./../../constants/type";
import * as main from "./../../constants/main";
import * as actAuth from "./auth";

var objectInit = {
    data: {},
    requestSuccess: () => { },
    requestError: () => { }
}

export const getAccountCurrentRequest = (object = objectInit) => {
    return dispatch => {
        const { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
        return api.get(
            {
                url: apiUrl.API_ACCOUNT_CURRENT,
                controller
            }).then(res => {
                if (res) {
                    dispatch(getAccountCurrent(res));
                    typeof requestSuccess === "function" && requestSuccess(res);
                }
                else {
                    typeof requestError === "function" && requestError();
                }
            });
    }
}

export const updateAccountCurrentRequest = (object = objectInit) => {
    return dispatch => {
        const { requestSuccess, requestError, controller, data, hiddenMsg, errorNotifi } = main.checkValidObjectRequest(object);
        return api.put({
            url: apiUrl.API_UPDATE_ACCOUNT_CURRENT,
            data,
            controller,
            errorNotifi
        }).then(res => {
            if (res && res.status) {
                !hiddenMsg && res.msg && message.success({ content: res.msg });
                dispatch(getAccountCurrent(res.result));
                typeof requestSuccess === "function" && requestSuccess();
            }
            else {
                !hiddenMsg && res.msg && message.error({ content: res.msg });
                typeof requestError === "function" && requestError();
            }
        });
    }
}

export const updateConfigRequest = (object = objectInit) => {
    return dispatch => {
        const { data } = main.checkValidObjectRequest(object);
        return api.put(
            {
                url: apiUrl.API_UPDATE_ACCOUNT_CURRENT,
                data,
                errorNotifi: false
            }).then(res => {
                if (res && res.status) {
                    dispatch(getAccountCurrent(res.result));
                }
            });
    }
}

export const changePasswordRequest = (object = objectInit) => {
    return (dispatch) => {
        const { data, requestSuccess, requestError, controller } = object;
        var logout = data.hasOwnProperty("logoutAll") ? data.logoutAll : false;
        return api.put(
            {
                url: apiUrl.API_ACCOUNT_CURRENT_CHANGE_PASSWORD,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    if (logout) {
                        dispatch(actAuth.destroyToken(
                            () => {//handle success
                                dispatch(actAuth.reloginRequest(() => {
                                    res.msg && message.success({ content: res.msg });
                                    typeof requestSuccess === "function" && requestSuccess();
                                }));
                            }
                        ));
                    }
                    else {
                        res.msg && message.success({ content: res.msg })
                        typeof requestSuccess === "function" && requestSuccess();
                    }

                }
                else {
                    res.msg && message.error({ content: res.msg, duration: 3 });
                    typeof requestError === "function" && requestError();
                }
            });
    }
}



const getAccountCurrent = (account = {}) => {
    return {
        type: type.TYPE_GET_ACCOUNT_CURRENT,
        value: account
    }
}