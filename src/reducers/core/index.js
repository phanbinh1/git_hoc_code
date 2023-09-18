import { combineReducers } from "redux";
import loading from "./loading";
import request_error from "./request_error";
import config from "./config";
import actions from "./actions";
import controllers from "./controllers";
import paginations from "./paginations";
import notification from "./notification";
import notification_page from "./notification_page";
import rows_selected from "./rows_selected";
import sync_process from "./sync_process";
import search from "./search";
import account_current from "./account_current/account_current";
import authReducer from "./auth/auth_reducer";
// ===================================================================================
import permission from "./permission";
import account from "./account";
import account_group from "./account_group";
import service from "./service";
import cau_hinh from "./cau_hinh";
import history_download from "./history_download"
import constants from "./constants";

export default combineReducers({
    constants,
    loading,
    config,
    request_error,
    history_download,
    actions,
    controllers,
    paginations,
    notification,
    notification_page,
    rows_selected,
    sync_process,
    search,
    account_current,
    auth: authReducer,

    permission,
    account,
    account_group,
    service,
    cau_hinh,
})