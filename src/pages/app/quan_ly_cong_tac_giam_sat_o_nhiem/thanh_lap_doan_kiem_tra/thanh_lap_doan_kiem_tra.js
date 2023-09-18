import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router";
import { getItemSelected, queryString } from "../../../../constants/main";
import * as pageKeys from "../../../../constants/page_key";
import * as act from "./../../../../actions/index";
import * as actCuocGiamSat from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import * as actID from "./../../../../constants/action_id";
import ThanhLapDoanKiemTraComponent from "./../../../../components/app/quan_ly_cong_tac_giam_sat_o_nhiem/thanh_lap_doan_kiem_tra/thanh_lap_doan_kiem_tra";

export default function ThanhLapDoanKiemTra({ dotXuat, ...props }) {
  const location = useLocation();
  const history = useHistory();
  const qs = queryString.parse(location.search);
  const dispatch = useDispatch();

  const dataSortInit = [
    { key: "idKeHoachGiamSat", value: false, sort: 99999, max: true },
    { key: "nam", value: false, sort: 7 },
    { key: "id", value: false, sort: 6 },
    { key: "tenCuocGiamSat", value: false, sort: 5 },
    { key: "ngayBatDau", value: false, sort: 4 },
    { key: "ngayKetThuc", value: false, sort: 3 },
    { key: "trangThaiDuyet", value: false, sort: 2 },
  ];

  const rows_selected = useSelector((state) => state.core.rows_selected);
  const priviliged = useSelector((state) => state.core.permission.priviliged);

  const getKeHoachPhongAllowAccess = () => {
    let result = [];
    priviliged.findIndex(
      (item) => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_NGHIEP_VU
    ) !== -1 && result.push("NGHIEPVU");
    priviliged.findIndex(
      (item) => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_THANH_TRA
    ) !== -1 && result.push("THANHTRA");
    priviliged.findIndex(
      (item) => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_DOI1
    ) !== -1 && result.push("DOI1");
    priviliged.findIndex(
      (item) => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_DOI2
    ) !== -1 && result.push("DOI2");
    return result;
  };

  const [pageKey] = useState(
    pageKeys.PAGE_KEY_QLCTGSON_THANH_LAP_DOAN_KIEM_TRA
  );
  const [isVisiableForm, setIsVisiableForm] = useState(false);
  const [isVisiableList, setIsVisiableList] = useState(false);
  const [isVisiableSearch, setIsVisiableSearch] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState({});
  const [dataSort, setDataSort] = useState(dataSortInit);

  const onSelectRow = (rows_selected = []) =>
    dispatch(act.selectRow(rows_selected, pageKey));
  const getAllRequest = (object = {}) =>
    dispatch(actCuocGiamSat.getAllRequest({ ...object, pageKey }));
  const getOneRequest = (object = {}) =>
    dispatch(actCuocGiamSat.getOneRequest(object));
  const handleGetOne = (value = {}) =>
    dispatch(actCuocGiamSat.handleGetOne(value));
  const deleteRequest = (object = {}) =>
    dispatch(actCuocGiamSat.deleteRequest(object));

  useEffect(() => {
    onSelectRow([]);
  }, []);

  useEffect(() => {
    if (qs.action) {
      if (qs.action === actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_CREATE) {
        const hoSoMotCuaId = qs.hoSoMotCuaId;
        onCreate(hoSoMotCuaId);
      }
      if (
        qs.action === actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_UPDATE &&
        qs.id
      ) {
        const id = qs.id;
        const hoSoMotCuaId = qs.hoSoMotCuaId;
        onEdit(id, hoSoMotCuaId);
      }
      if (qs.action === actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_SEARCH) {
        onSearch();
      }
      if (qs.action === actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_LIST) {
        onList();
      }
    }
  }, [qs.action, qs.id, qs.idKeHoachGiamSat]);

  const handleSearch = () => {
    history.push({
      pathname: location.pathname,
      hash: location.hash,
      search: queryString.stringify({
        ...qs,
        action: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_SEARCH,
      }),
    });
  };

  const onSearch = () => {
    setIsVisiableForm(false);
    setIsVisiableList(true);
    setIsVisiableSearch(true);
  };

  const handleCreate = () => {
    history.push({
      pathname: location.pathname,
      hash: location.hash,
      search: queryString.stringify({
        ...qs,
        action: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_CREATE,
      }),
    });
  };

  const onCreate = (hoSoMotCuaId) => {
    setIsVisiableForm(true);
    setIsVisiableList(false);
    setIsVisiableSearch(false);
    handleGetOne({ hoSoMotCuaId });
  };

  const handleEdit = (id) => {
    history.push({
      pathname: location.pathname,
      hash: location.hash,
      search: queryString.stringify({
        ...qs,
        id,
        action: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_UPDATE,
      }),
    });
  };

  const onEdit = (id, hoSoMotCuaId) => {
    handleStartLoadData();
    getOneRequest({
      data: {
        id,
        hoSoMotCuaId,
      },
      requestSuccess: () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        handleEndLoadData();
      },
      requestError: () => {
        handleEndLoadData();
        history.goBack();
      },
    });
  };

  const handleList = () => {
    history.push({
      pathname: location.pathname,
      hash: location.hash,
      search: queryString.stringify({
        ...qs,
        action: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_LIST,
      }),
    });
  };

  const onList = () => {
    setIsVisiableForm(false);
    setIsVisiableList(true);
    setIsVisiableSearch(false);
  };
  const handleBack = handleList;
  const handleDelete = (delteAll = true, id) => {
    const list_co_so_san_xuat_delete = delteAll
      ? getItemSelected(rows_selected, pageKey)
      : [id];
    deleteRequest({
      data: list_co_so_san_xuat_delete,
      requestSuccess: handleDeleteSuccess,
    });
  };

  const handleDeleteSuccess = () => onSelectRow([]);
  const handleStartLoadData = () => setDataLoading(true);
  const handleEndLoadData = () => setDataLoading(false);
  const handleChangeDataSearch = (value = {}) =>
    setDataSearch({ ...value, child: "YES" });
  const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

  return (
    <Fragment>
      {!qs.action && (
        <Redirect
          to={{
            ...location,
            search: queryString.stringify({
              ...qs,
              action: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_LIST,
            }),
          }}
        />
      )}

      <ThanhLapDoanKiemTraComponent
        key={`key-${getKeHoachPhongAllowAccess().toString()}`}
        {...props}
        dotXuat={dotXuat}
        keHoachPhongs={getKeHoachPhongAllowAccess()}
        history={history}
        pageKey={pageKey}
        isVisiableForm={isVisiableForm}
        isVisiableList={isVisiableList}
        isVisiableSearch={isVisiableSearch}
        dataLoading={dataLoading}
        dataSearch={dataSearch}
        dataSort={dataSort}
        getAllRequest={getAllRequest}
        onSelectRow={onSelectRow}
        handleEdit={handleEdit}
        handleBack={handleBack}
        handleDelete={handleDelete}
        handleCreate={handleCreate}
        handleSearch={handleSearch}
        handleStartLoadData={handleStartLoadData}
        handleEndLoadData={handleEndLoadData}
        handleChangeDataSearch={handleChangeDataSearch}
        handleChangeDataSort={handleChangeDataSort}
      />
    </Fragment>
  );
}
