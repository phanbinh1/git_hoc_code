import * as api from "./../../../../util/api_call";
import * as apiUrl from "./../../../../constants/api";
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";
import * as pageKeys from "./../../../../constants/page_key";

export const getAllRequest = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
    pageKey,
    isPagination,
  } = main.checkValidObjectRequest(object);
  if (isPagination) {
    var pagination = main.getParamPagination(pageKey);
    data = { ...pagination, ...data };
  }

  return (dispatch) => {
    return api
      .get({
        url: apiUrl.API_QLONTP_CUOC_GIAM_SAT,
        data,
        controller,
      })
      .then((res) => {
        if (res && res.status) {
          const result = res.result.map((item) => {
            const danhSachCongViecGiamSats =
              item.danhSachCongViecGiamSats || [];
            return {
              ...item.cuocGiamSatONTP,
              keHoachGiamSat: item.keHoachGiamSatONTP,
              danhSachCongViecGiamSats: danhSachCongViecGiamSats,
              daPhanCongCongViec:
                danhSachCongViecGiamSats.filter(
                  (val) => val.danhSachCongViecGiamSat.length === 0
                ).length === 0,
              dotGiamSat: item.dotGiamSatONTP || [],
              cuocGiamSatCha: item.cuocGiamSatONTPCha,
            };
          });
          dispatch(handleGetAll(result));
          if (res.hasOwnProperty("pagination") && isPagination) {
            dispatch(
              actPagination.Pagination(
                {
                  ...res.pagination,
                },
                pageKey
              )
            );
          }
          requestSuccess({ ...res, result });
        } else {
          res && res.msg && message.error({ content: res.msg });
          requestError();
        }
      });
  };
};

export const createRequest = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
    isQDTLD,
  } = main.checkValidObjectRequest(object);
  return (dispatch) => {
    return api
      .post({
        url: apiUrl.API_QLONTP_CUOC_GIAM_SAT,
        data,
        controller,
      })
      .then((res) => {
        if (res && res.status) {
          const result = {
            ...res.result.cuocGiamSat,
            keHoachGiamSat: res.result.keHoachGiamSat,
            danhSachCongViecGiamSats: res.result.danhSachCongViecGiamSats || [],
            daPhanCongCongViec: res.result.danhSachCongViecGiamSats
              ? res.result.danhSachCongViecGiamSats.filter(
                  (val) => val.danhSachCongViecGiamSat.length === 0
                ).length === 0
              : true,
            danhSachXepHang: [],
            dotGiamSat: res.result.dotGiamSat || [],
          };
          isQDTLD
            ? dispatch(handleCreateCuocGiamSat(result))
            : dispatch(handleCreate(result));
          requestSuccess();
          res.msg && message.success({ content: res.msg });
        } else {
          requestError();
          res.msg && message.error({ content: res.msg });
        }
      });
  };
};

export const deleteRequest = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
  } = main.checkValidObjectRequest(object);
  return (dispatch) => {
    return api
      .del({
        url: apiUrl.API_QLONTP_CUOC_GIAM_SAT,
        data,
        controller,
      })
      .then((res) => {
        if (res && res.status) {
          dispatch(handleDelete(data));
          requestSuccess();
          res.msg && message.success({ content: res.msg });
        } else {
          requestError();
          res.msg && message.error({ content: res.msg });
        }
      });
  };
};

export const getOneRequest = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
  } = main.checkValidObjectRequest(object);
  return (dispatch) => {
    if (!data.hasOwnProperty("id")) {
      message.error({ content: "Dữ liệu đầu vào không chính xác!" });
    } else {
      return api
        .get({
          url: apiUrl.API_QLONTP_CUOC_GIAM_SAT + `/${data.id}`,
          data,
          controller,
        })
        .then((res) => {
          if (res && res.status) {
            const { listBienBanGiamSat } = res.result;

            const coSoKinhDoanhs = res.result.cuocGiamSat.coSoKinhDoanhs.map(
              (coSo, i) => {
                return {
                  ...coSo,
                  bienBan:
                    listBienBanGiamSat.find(
                      (item) =>
                        item.idCoSoEntity === coSo.id &&
                        item.idCoSo === coSo.idCoSo
                    ) || {},
                };
              }
            );
            const result = {
              ...res.result.cuocGiamSat,
              coSoKinhDoanhs,
              keHoachGiamSat: res.result.keHoachGiamSat,
              danhSachCongViecGiamSats: res.result.danhSachCongViecGiamSats,
              listBienBanGiamSat,
              danhSachXepHang: res.result.danhSachXepHang || [],
              dotGiamSat: res.result.dotGiamSat || [],
              cuocGiamSatCha: res.result.cuocGiamSatONTPCha,
            };
            dispatch(handleGetOne(result));
            requestSuccess({ ...res, result });
          } else {
            requestError();
          }
        });
    }
  };
};

export const updateRequest = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
    isQDTLD,
  } = main.checkValidObjectRequest(object);
  return (dispatch) => {
    return api
      .put({
        url: apiUrl.API_QLONTP_CUOC_GIAM_SAT,
        data,
        controller,
      })
      .then((res) => {
        if (res && res.status) {
          const result = {
            ...res.result.cuocThanhKiemTra,
            keHoachThanhKiemTra: res.result.keHoachThanhKiemTra,
            danhSachCongViecThanhKiemTras:
              res.result.danhSachCongViecThanhKiemTras || [],
            daPhanCongCongViec: res.result.danhSachCongViecThanhKiemTras
              ? res.result.danhSachCongViecThanhKiemTras.filter(
                  (val) => val.danhSachCongViecThanhKiemTra.length === 0
                ).length === 0
              : true,
            dotThanhKiemTra: res.result.dotThanhKiemTra || [],
          };
          isQDTLD
            ? dispatch(handleUpdateCuocGiamSat(result))
            : dispatch(handleUpdate(result));
          requestSuccess();
          res.msg && message.success({ content: res.msg });
        } else {
          requestError();
          res.msg && message.error({ content: res.msg });
        }
      });
  };
};

export const pheDuyetRequest = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
  } = main.checkValidObjectRequest(object);
  if (!data.ids || !data.trangThaiDuyet) {
    message.error({ content: "Dữ liệu đầu vào không chính xác!" });
  } else {
    return (dispatch) => {
      return api
        .put({
          url: apiUrl.API_QLONTP_CUOC_GIAM_SAT_PHE_DUYET(data.trangThaiDuyet),
          data,
          controller,
        })
        .then((res) => {
          if (res && res.status) {
            data.item
              ? dispatch(handleUpdate(data.item))
              : dispatch(
                  getAllRequest({
                    pageKey: pageKeys.PAGE_KEY_QLCTGSON_THANH_LAP_DOAN_KIEM_TRA,
                  })
                );
            requestSuccess();
            data.msgSuccess
              ? message.success({ content: data.msgSuccess })
              : res.msg && message.success({ content: res.msg });
          } else {
            requestError();
            data.msgError
              ? message.error({ content: data.msgError })
              : res.msg && message.error({ content: res.msg });
          }
        });
    };
  }
};

export const createQuyetDinhThanhLapDoan = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
  } = main.checkValidObjectRequest(object);
  return (dispatch) => {
    return api
      .post({
        url: `${apiUrl.API_QLONTP_CUOC_GIAM_SAT}/quyetdinhthanhlapdoan`,
        data,
        controller,
      })
      .then((res) => {
        if (res && res.status) {
          requestSuccess();
          data.msgSuccess
            ? message.success({ content: data.msgSuccess })
            : res.msg && message.success({ content: res.msg });
        } else {
          requestError();
          res.msg && message.error({ content: res.msg });
        }
      });
  };
};

export const updateQuyetDinhThanhLapDoan = (object = {}) => {
  var {
    data,
    requestSuccess,
    requestError,
    controller,
  } = main.checkValidObjectRequest(object);
  return (dispatch) => {
    return api
      .put({
        url: `${apiUrl.API_QLONTP_CUOC_GIAM_SAT}/quyetdinhthanhlapdoan`,
        data,
        controller,
      })
      .then((res) => {
        if (res && res.status) {
          requestSuccess();
          data.msgSuccess
            ? message.success({ content: data.msgSuccess })
            : res.msg && message.success({ content: res.msg });
        } else {
          requestError();
          res.msg && message.error({ content: res.msg });
        }
      });
  };
};

const handleGetAll = (values) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_LIST,
    values,
  };
};

const handleCreateCuocGiamSat = (value) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CHILD_CREATE,
    value,
  };
};

const handleCreate = (value) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CREATE,
    value,
  };
};

const handleDelete = (values) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_DELETE,
    values,
  };
};

export const handleGetOne = (value) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_EDIT,
    value,
  };
};

export const handleUpdateCuocGiamSat = (value) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CHILD_UPDATE,
    value,
  };
};

export const handleUpdate = (value) => {
  return {
    type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE,
    value,
  };
};
