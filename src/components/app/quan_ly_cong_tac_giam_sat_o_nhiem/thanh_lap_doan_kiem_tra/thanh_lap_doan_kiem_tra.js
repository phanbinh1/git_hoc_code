import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as act from "./../../../../actions/index";
import * as main from "./../../../../constants/main";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import ThanhLapDoanKiemTraForm from "./thanh_lap_doan_kiem_tra_form";
import ThanhLapDoanKiemTraList from "./thanh_lap_doan_kiem_tra_list";
import * as pageKeys from "./../../../../constants/page_key";
import * as actDanhMucCho from "./../../../../actions/app/danh_muc/danh_muc_cho/danh_muc_cho";
import * as actChiTieu from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/chi_tieu/chi_tieu";

export default function ThanhLapDoanKiemTra(props) {
  const {
    isVisiableForm,
    isVisiableList,
    isVisiableSearch,
    pageKey,
    handleCreate,
    handleDelete,
    handleSearch,
    handleBack,
    queryVariable,
    history,
    dataSearch,
  } = props;

  const rows_selected = useSelector((state) => state.core.rows_selected);

  const dispatch = useDispatch();
  const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

  useEffect(() => {
    onSetAction();
  }, [
    isVisiableList,
    isVisiableSearch,
    main.getItemSelected(rows_selected, pageKey),
  ]);

  const getAllChoRequest = (object = {}) =>
    dispatch(
      actDanhMucCho.getAllRequest({
        ...object,
        pageKey: pageKeys.PAGE_KEY_DANH_MUC_CHO,
      })
    );

  const getAllChiTieuRequest = (object = {}) => {
    dispatch(
      actChiTieu.getAllRequest({
        ...object,
        pageKey: pageKeys.PAGE_KEY_CHI_TIEU,
      })
    );
  };

  useEffect(() => {
    const requestSuccess = () => {};
    const requestError = () => {};

    getAllChoRequest({
      data: {
        currentPage: 1,
        pageSize: 999,
        sortData: "xaPhuong.ma asc,quanHuyen.ma asc,tinhThanh.ma asc,ten asc",
      },
      requestSuccess,
      requestError,
    });
    getAllChiTieuRequest({
      data: {
        currentPage: 1,
        pageSize: 999,
        sortData: "id desc,maChiTieu asc,tenChiTieu asc",
      },
      requestSuccess,
      requestError,
    });
  }, []);

  const onSetAction = () => {
    let arrAction = [];
    arrAction.push(renderActionBack());
    arrAction.push(renderActionSearch());
    arrAction.push(renderActionDelete());
    arrAction.push(renderActionCreate());
    setAction(arrAction);
  };

  const renderActionCreate = () => {
    let result = {};
    result.key = actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_CREATE;
    result.disabled = false;
    result.hidden = isVisiableList && !isVisiableSearch ? false : true;
    result.handleClick = handleCreate;
    result.type = constants.CONST_TYPE_BTN_CREATE;
    return result;
  };

  const renderActionDelete = () => {
    let result = {};
    const selected = main.getItemSelected(rows_selected, pageKey);
    result.key = actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_DELETE;
    result.disabled = selected.length > 0 ? false : true;
    result.hidden = isVisiableList ? false : true;
    result.handleClick = handleDelete;
    result.type = constants.CONST_TYPE_BTN_DELETE;
    result.isConfirm = true;
    result.confirmTitle = "Bạn chắc chắn muốn xóa";
    result.confirmOkText = "Đồng ý";
    result.confirmOkType = "danger";
    result.confirmCancelText = "Hủy";
    result.text = `Xóa ${selected.length > 0 ? `(${selected.length})` : ""}`;
    return result;
  };

  const renderActionSearch = () => {
    let result = {};
    result.key = actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_SEARCH;
    result.disabled = false;
    result.hidden = isVisiableList && !isVisiableSearch ? false : true;
    result.handleClick = handleSearch;
    result.type = constants.CONST_TYPE_BTN_SEARCH;
    return result;
  };

  const renderActionBack = () => {
    let result = {};
    result.key = actID.ACT_BACK;
    result.disabled = false;
    result.hidden = !isVisiableList || isVisiableSearch ? false : true;
    result.handleClick =
      queryVariable && queryVariable.idKeHoachThanhTra
        ? () => history.go(-1)
        : handleBack;
    result.type = constants.CONST_TYPE_BTN_BACK;
    return result;
  };

  return (
    <Fragment>
      {isVisiableForm && (
        <ThanhLapDoanKiemTraForm {...props} nam={dataSearch.nam} />
      )}
      {isVisiableList && <ThanhLapDoanKiemTraList {...props} />}
    </Fragment>
  );
}
