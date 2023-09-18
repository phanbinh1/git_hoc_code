import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { store } from "../../../..";
import * as actPagination from "./../../../../actions/core/pagination";

const send = (data, type) => {
   const state = store.getState();
   const socket = new SockJS(apiUrl.SOCKET_PORT);
   const stompClient = Stomp.over(socket);
   stompClient.debug = null;
   stompClient.connect({}, () => {
      stompClient.send("/update/permission", {}, JSON.stringify({ type: "PERMISSION", screenID: state.screenID, data: { type, data } }));
   });
}

export const getMenuRequest = (object) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest({ ...object, data: { idParent: 0, isTree: true } });
   return dispatch => {
      return api.get({
         url: apiUrl.API_DANHMUCTIEUCHI,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(getMenu(res.result));
            requestSuccess();
         }
         else {
            dispatch(getMenu([]));
            requestError();
         }
      });
   }
}

export const getMenuLeftRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest({ ...object, data: { idParent: 0, isTree: true, isMobile: document.body.getAttribute("_enviroment") === "app" } });
   return dispatch => {
      return api.get({
         url: apiUrl.API_MENU_LEFT,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(getMenuLeft(res.result));
            requestSuccess();
         }
         else {
            dispatch(getMenuLeft([]));
            requestError();
         }
      });
   }
}

export const getAllRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest({ ...object, isPagination: false });
   if (!data.hasOwnProperty("idcha") || typeof data.idcha !== "number") {
      data.idcha = 0;
   }
   if (isPagination) {
      var pagination = main.getParamPagination(pageKey);
      data = { ...pagination, ...data };
   }
   return dispatch => {
      return api.get({
         url: apiUrl.API_DANHMUCTIEUCHI_CHA,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(handleGetAll(res.result));
            if (res.hasOwnProperty("pagination") && isPagination) {
               dispatch(actPagination.Pagination({
                  ...res.pagination,
                  currentPage: data.currentPage
               },
                  pageKey)
               );
            }
            requestSuccess();
         }
         else {
            requestError();
         }
      });
   }
}

export const getOneRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      if (!data.id) {
         message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
      }
      else {
         return api.get({
            url: apiUrl.API_DANHMUCTIEUCHI + `/${data.id}`,
            controller
         }).then(res => {
            if (res && res.status && res.result) {
               dispatch(handleGetOne(res.result));
               requestSuccess(res);
            }
            else {
               requestError();
            }
         });
      }
   }
}

export const createRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.post({
         url: apiUrl.API_DANHMUCTIEUCHI,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            res.msg && message.success({ content: res.msg });
            dispatch(handleCreate(res.result));
            requestSuccess(res);
         }
         else {
            res.msg && message.error({ content: res.msg });
            requestError();
         }
      })
   }
}

export const updateRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.put({
         url: apiUrl.API_DANHMUCTIEUCHI,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            res.msg && message.success({ content: res.msg });
            dispatch(handleUpdate(res.result));
            requestSuccess(res);
         }
         else {
            res.msg && message.error({ content: res.msg });
            requestError();
         }
      })
   }
}

export const deleteRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.del({
         url: apiUrl.API_DANHMUCTIEUCHI,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            res.msg && message.success({ content: res.msg });
            dispatch(handleDelete(data));
            requestSuccess();
         }
         else {
            res.msg && message.error({ content: res.msg });
            requestError();
         }
      })
   }
}

const getMenu = (values) => {
   return {
      type: type.DANH_MUC_TIEU_CHI_MENU,
      values
   }
}

export const getMenuLeft = (values) => {
   return {
      type: type.TYPE_GET_MENU_LEFT,
      values
   }
}

const handleGetAll = (values) => {
   return {
      type: type.DANH_MUC_TIEU_CHI_LIST,
      values
   }
}

export const handleGetOne = (value) => {
   return {
      type: type.DANH_MUC_TIEU_CHI_EDIT,
      value
   }
}

const handleCreate = (value) => {
   send(value, type.DANH_MUC_TIEU_CHI_CREATE);
   return {
      type: type.DANH_MUC_TIEU_CHI_CREATE,
      value
   }
}

const handleUpdate = (value) => {
   send(value, type.DANH_MUC_TIEU_CHI_UPDATE);
   return {
      type: type.DANH_MUC_TIEU_CHI_UPDATE,
      value
   }
}

const handleDelete = (values) => {
   send(values, type.DANH_MUC_TIEU_CHI_DELETE);
   return {
      type: type.DANH_MUC_TIEU_CHI_DELETE,
      values
   }
}
