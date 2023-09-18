import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router";
import KeHoachThanhTraComponent from "./../../../../components/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_thanh_tra/ke_hoach_thanh_tra";
import * as actKeHoachThanhTra from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra";
import { queryString, getPriviligeds, getItemSelected } from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";
import moment from "moment";

const KeHoachThanhTra = () => {
   const dataSortInit = [
      { key: "id", value: false, sort: 7 },
      { key: "nam", value: true, sort: 6 },
      { key: "tenKeHoach", value: true, sort: 5 },
      { key: "soKeHoach", value: true, sort: 4 },
      { key: "ngayKy", value: true, sort: 3 },
      { key: "trangThaiDuyet", value: true, sort: 2 },
   ]

   const location = useLocation();
   const history = useHistory();
   const qs = queryString.parse(location.search);

   const rows_selected = useSelector(state => state.core.rows_selected);
   const priviliged = useSelector(state => getPriviligeds(state.core.permission.menu, location.pathname));
   console.log("priviliged: ", priviliged)

   const getKeHoachPhongAllowAccess = () => {
      let result = [];
      priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_NGHIEP_VU) !== -1 && result.push(constants.CONST_PHONG_BAN.NGHIEPVU);
      priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_THANH_TRA) !== -1 && result.push(constants.CONST_PHONG_BAN.THANHTRA);
      priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_DOI1) !== -1 && result.push(constants.CONST_PHONG_BAN.DOI1);
      priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_DOI2) !== -1 && result.push(constants.CONST_PHONG_BAN.DOI2);
      return result;
   };

   const getSearchDefault = () => {
      let result = { nam: moment().year() };
      if (qs.trangThaiPheDuyet && constants.CONST_PHE_DUYET.options.find(item => item.value === qs.trangThaiPheDuyet)) {
         result.trangThaiDuyet = qs.trangThaiPheDuyet;
      }
      return result;
   }
   const [pageKey] = useState(pageKeys.PAGE_KEY_QTNVTT_KE_HOACH_THANH_TRA);
   const [isVisiableForm, setIsVisiableForm] = useState(false);
   const [isVisiableList, setIsVisiableList] = useState(false);
   const [isVisiableSearch, setIsVisiableSearch] = useState(false);
   const [dataLoading, setDataLoading] = useState(true);
   const [dataSearch, setDataSearch] = useState(getSearchDefault());
   const [dataSort, setDataSort] = useState(dataSortInit);

   const dispatch = useDispatch();
   const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey))
   const getAllRequest = (object = {}) => dispatch(actKeHoachThanhTra.getAllRequest({ ...object, pageKey }))
   const getOneRequest = (object = {}) => dispatch(actKeHoachThanhTra.getOneRequest(object))
   const handleGetOne = (value = {}) => dispatch(actKeHoachThanhTra.handleGetOne(value))
   const deleteRequest = (object = {}) => dispatch(actKeHoachThanhTra.deleteRequest(object))

   useEffect(() => {
      onSelectRow([]);
   }, []);

   useEffect(() => {
      if (qs.action) {
         if (qs.action === actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_CREATE) {
            const hoSoMotCuaId = qs.hoSoMotCuaId;
            onCreate(hoSoMotCuaId);
         }
         if (qs.action === actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_UPDATE && qs.id) {
            const id = qs.id;
            const hoSoMotCuaId = qs.hoSoMotCuaId;
            onEdit(id, hoSoMotCuaId);
         }
         if (qs.action === actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_SEARCH) {
            onSearch();
         }
         if (qs.action === actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_LIST) {
            onList();
         }
      }
   }, [qs.action, qs.id])

   const handleSearch = () => {
      history.push({
         search: queryString.stringify({ ...qs, action: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_SEARCH })
      });
   }

   const onSearch = () => {
      setIsVisiableForm(false);
      setIsVisiableList(true);
      setIsVisiableSearch(true);
   }

   const handleCreate = () => {
      history.push({
         search: queryString.stringify({ ...qs, action: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_CREATE })
      });
   }

   const onCreate = (hoSoMotCuaId) => {
      setIsVisiableForm(true);
      setIsVisiableList(false);
      setIsVisiableSearch(false);
      handleGetOne({ hoSoMotCuaId });
   }

   const handleEdit = (id) => {
      history.push({
         search: queryString.stringify({ ...qs, id, action: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_UPDATE })
      });
   }

   const onEdit = (id, hoSoMotCuaId) => {
      handleStartLoadData();
      getOneRequest({
         data: {
            id,
            hoSoMotCuaId
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
         }
      });
   }

   const handleList = () => {
      history.push({
         search: queryString.stringify({ ...qs, action: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_LIST })
      });
   }

   const onList = () => {
      setIsVisiableForm(false);
      setIsVisiableList(true);
      setIsVisiableSearch(false);
   }
   const handleBack = handleList
   const handleDelete = (delteAll = true, id) => {
      const list_ke_hoach_thanh_tra_delete = delteAll ?
         getItemSelected(rows_selected, pageKey) :
         [id];
      deleteRequest({
         data: list_ke_hoach_thanh_tra_delete,
         requestSuccess: handleDeleteSuccess
      });
   }

   const handleDeleteSuccess = () => onSelectRow([])
   const handleStartLoadData = () => setDataLoading(true)
   const handleEndLoadData = () => setDataLoading(false)
   const handleChangeDataSearch = (value = {}) => setDataSearch({ ...value })
   const handleChangeDataSort = (dataSort) => setDataSort(dataSort)

   return <Fragment>
      {!qs.action && <Redirect to={{ ...location, search: queryString.stringify({ ...qs, action: actID.ACT_ID_O_NHIEM_KIEM_TRA_GIAM_SAT.ACT_LIST }) }} />}
      <KeHoachThanhTraComponent
         // key={`key-${getKeHoachPhongAllowAccess().toString()}`}
         keHoachPhongs={getKeHoachPhongAllowAccess()}
         history={history}
         location={location}
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
}

export default KeHoachThanhTra;