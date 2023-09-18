import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import HoSoChuoiThucPhamComponent from "./../../../../components/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham";
import * as actHoSoChuoiThucPham from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";

const HoSoChuoiThucPham = ({ queryVariable, location, history, ...props }) => {
    const dataSortInit = [
        { key: "id", value: false, sort: 6 },
        { key: "tenCoSo", value: true, sort: 5 },
        { key: "tenDangKyKinhDoanh", value: true, sort: 4 },
        { key: "diaDiemKinhDoanh", value: true, sort: 3 },
        { key: "diaChiTruSo", value: true, sort: 2 },
        { key: "trangThaiHoSo", value: true, sort: 1 },
        { key: "ketQuaThamDinh", value: true, sort: 0 }
    ]

    const [pageKey] = useState(pageKeys.PAGE_KEY_HO_SO_CHUOI_THUC_PHAM);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(false);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [isVisiableReport, setIsVisiableReport] = useState(false);
    const [allowUpdateList, setAllowUpdateList] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const getAllRequest = (object = {}) => dispatch(actHoSoChuoiThucPham.getAllRequest({ ...object, pageKey }));
    const getOneRequest = (object = {}) => dispatch(actHoSoChuoiThucPham.getOneRequest(object));
    const handleGetOne = (value = {}) => dispatch(actHoSoChuoiThucPham.handleGetOne(value));
    const deleteRequest = (object = {}) => dispatch(actHoSoChuoiThucPham.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_CREATE) {
                const hoSoMotCuaId = queryVariable.hoSoMotCuaId;
                onCreate(hoSoMotCuaId);
            }
            if (queryVariable.action === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                const hoSoMotCuaId = queryVariable.hoSoMotCuaId;
                onEdit(id, hoSoMotCuaId);
            }
            if (queryVariable.action === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_REPORT) {
                onReport();
            }
            if (queryVariable.action === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_LIST) {
                onList();
            }
            if (queryVariable.action === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_KE_HOACH_UPDATE_LIST) {
                onUpdateList();
            }
        }
    }, [queryVariable.action, queryVariable.id])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_SEARCH;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onSearch = () => {
        setAllowUpdateList(false);
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(true);
        setIsVisiableReport(false);
    };

    const handleReport = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_REPORT;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onReport = () => {
        setAllowUpdateList(false);
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
        setIsVisiableReport(true);
    };

    const handleCreate = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_CREATE;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onCreate = async (hoSoMotCuaId) => {
        const valueDefault = {};
        if (constants.CONST_DEFAULT_TINHTHANH && constants.CONST_DEFAULT_TINHTHANH.ma) {
            valueDefault._tinhThanh = constants.CONST_DEFAULT_TINHTHANH.ma;
        }
        handleGetOne({ hoSoMotCuaId, ...valueDefault });
        setAllowUpdateList(false);
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        setIsVisiableReport(false);
    };

    const handleEdit = (id) => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_UPDATE;
        objectQueryVariable.id = id;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onEdit = (id, hoSoMotCuaId) => {
        handleStartLoadData();
        getOneRequest({
            data: {
                id,
                hoSoMotCuaId
            },
            requestSuccess: async () => {
                setAllowUpdateList(false);
                setIsVisiableForm(true);
                setIsVisiableList(false);
                setIsVisiableSearch(false);
                setIsVisiableReport(false);
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList = () => {
        setAllowUpdateList(false);
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
        setIsVisiableReport(false);
    };

    const onUpdateList = () => {
        setAllowUpdateList(true);
        setIsVisiableForm(false);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        setIsVisiableReport(false);
    };

    const handleBack = (handleList);
    const handleDelete = (delteAll = true, id) => {
        const list_ho_so_chuoi_thuc_pham_delete = delteAll ?
            main.getItemSelected(rows_selected, pageKey) :
            [id];
        deleteRequest({
            data: list_ho_so_chuoi_thuc_pham_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_LIST}`} />}
            <HoSoChuoiThucPhamComponent
                {...props}
                queryVariable={queryVariable}
                history={history}
                pageKey={pageKey}
                allowUpdateList={allowUpdateList}
                isVisiableReport={isVisiableReport}
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
                handleReport={handleReport}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleChangeDataSearch={handleChangeDataSearch}
                handleChangeDataSort={handleChangeDataSort}
            />
        </React.Fragment>
    );
}

export default HoSoChuoiThucPham;