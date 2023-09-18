import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";

/**
 *  ==============================================================================
 *  ==============================================================================
 */



export const countCoSoRequest = (object = {}) => {
   var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.get({
         url: apiUrl.API_LOAI_HINH_CO_SO_COUNT_CO_SO,
         controller
      }).then(res => {
         if (res && res.status) {
            requestSuccess(res);
         }
         else {
            requestError();
         }
      });
   }
}

export const getAllRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
   if (isPagination) {
      var pagination = main.getParamPagination(pageKey);
      data = { ...pagination, ...data };
   }
   return dispatch => {
      return api.get({
         url: apiUrl.API_DANHGIATIEUCHI,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(handleGetOne(res.result));
            // if (res.hasOwnProperty("pagination") && isPagination) {
            //    dispatch(actPagination.Pagination({
            //       ...res.pagination
            //    },
            //       pageKey)
            //    );
            // }
            requestSuccess();
         }
         else {
            requestError();
         }
      });
   }
}

export const exportRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
   data = { ...data };
   return dispatch => {
      return api.get({
         url: apiUrl.API_DANHGIATIEUCHI_EXPORT,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            // dispatch(handleGetOne(res.result));
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
         message.error({ content: "Dữ liệu đầu vào không chính xác!" });
      }
      else {
         return api.get({
            url: apiUrl.API_DANHGIATIEUCHI + `/${data.id}`,
            controller
         }).then(res => {
            if (res && res.status) {
               dispatch(handleGetOne(res.result));
               requestSuccess(res);
            }
            else {
               requestError(res);
            }
         })
      }
   }
}

export const createRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.post({
         url: apiUrl.API_LINH_VUC,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(handleCreate(res.result));
            requestSuccess();
            res.msg && message.success({ content: res.msg });
         }
         else {
            requestError();
            res.msg && message.error({ content: res.msg });
         }
      })
   }
}

export const updateRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.put({
         url: apiUrl.API_LINH_VUC,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(handleUpdate(res.result));
            requestSuccess();
            res.msg && message.success({ content: res.msg });
         }
         else {
            requestError();
            res.msg && message.error({ content: res.msg });
         }
      })
   }
}

export const danhGiaHangSaoUpdateRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.put({
         url: apiUrl.API_DANHGIATIEUCHI,
         data,
         controller
      }).then(res => {
         if (res && res.status) {
            dispatch(handleUpdate(res.result));
            requestSuccess(res);
            res.msg && message.success({ content: res.msg });
         }
         else {
            requestError();
            res.msg && message.error({ content: "Vui lòng đánh giá hết tất cả các tiêu chí!" });
         }
      })
   }
}

export const deleteRequest = (object = {}) => {
   var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
   return dispatch => {
      return api.del({
         url: `${apiUrl.API_DANHGIATIEUCHI}?IdCoSo=${data.IdCoSo}&idKeHoachThamDinh=${data.idKeHoachThamDinh}&idGiayChungNhan=${data.idGiayChungNhan}`,
      }).then(res => {
         if (res) {
            requestSuccess(res);
            res.msg && message.success({ content: res.msg });
         }
         else {
            requestError();
            res.msg && message.error({ content: res.msg });
         }
      })
   }
}


const handleGetAll = (values) => {
   return {
      type: type.TYPE_DANH_GIA_HANG_SAO_LIST,
      values
   }
}

export const handleGetOne = (value) => {
   return {
      type: type.TYPE_DANH_GIA_HANG_SAO_EDIT,
      value
   }
}

const handleCreate = (value) => {
   return {
      type: type.TYPE_DANH_GIA_HANG_SAO_CREATE,
      value
   }
}

const handleUpdate = (value) => {
   return {
      type: type.TYPE_DANH_GIA_HANG_SAO_UPDATE,
      value
   }
}

const handleDelete = (values) => {
   return {
      type: type.TYPE_LINH_VUC_DELETE,
      values
   }
}