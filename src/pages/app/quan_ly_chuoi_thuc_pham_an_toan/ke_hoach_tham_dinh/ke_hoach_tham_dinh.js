import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import KeHoachThamDinhCTPComponent from "./../../../../components/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";
import * as actKeHoachThamDinhCTP from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const KeHoachThamDinh = ({ queryVariable, location, history, ...props }) => {
    const dataSortInit = [
        { key: "id", value: false, sort: 10 },
        { key: "soKeHoach", value: true, sort: 9 },
        { key: "nam", value: true, sort: 8 },
        { key: "tenKeHoach", value: true, sort: 7 },
        { key: "ngayBatDau", value: true, sort: 6 },
        { key: "ngayKetThuc", value: true, sort: 5 },
        { key: "quyetDinh", value: true, sort: 4 },
        { key: "ngayKyQuyetDinh", value: true, sort: 3 },
        { key: "trangThaiPheDuyet", value: true, sort: 2 },
        { key: "ngayPheDuyet", value: true, sort: 1 }
    ]

    const [pageKey] = useState(pageKeys.PAGE_KEY_KE_HOACH_THAM_DINH_HO_SO_CTP);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(false);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [isVisiableHoSoCreate, setIsVisiableHoSoCreate] = useState(false);
    const [isVisiableHoSoList, setIsVisiableHoSoList] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);
    const ke_hoach_tham_dinh_list = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ke_hoach_tham_dinh.list);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = [], _pageKey = pageKey) => dispatch(act.selectRow(rows_selected, _pageKey));
    const getAllRequest = (object = {}) => dispatch(actKeHoachThamDinhCTP.getAllRequest({ ...object, pageKey }));
    const getAllHoSoThamDinhRequest = (object = {}) => dispatch(actKeHoachThamDinhCTP.getAllHoSoThamDinhRequest({ ...object, pageKey }));
    const getOneRequest = (object = {}) => dispatch(actKeHoachThamDinhCTP.getOneRequest(object));
    const handleGetOne = (value = {}) => dispatch(actKeHoachThamDinhCTP.handleGetOne(value));
    const deleteRequest = (object = {}) => dispatch(actKeHoachThamDinhCTP.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_LIST) {
                onList();
            }
            if (queryVariable.action === actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_HOSO_LIST && queryVariable.id) {
                const id = queryVariable.id;
                onHoSoList(id);
            }
        }
    }, [queryVariable.action, queryVariable.id])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_SEARCH;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onSearch = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(true);
        setIsVisiableHoSoCreate(false);
        setIsVisiableHoSoList(false);
    };

    const handleCreate = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_CREATE;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onCreate = async () => {
        const valueDefault = {};
        handleGetOne({ ...valueDefault });
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        setIsVisiableHoSoCreate(false);
        setIsVisiableHoSoList(false);
    };

    const handleEdit = (id) => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_UPDATE;
        objectQueryVariable.id = id;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onEdit = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: {
                id
            },
            requestSuccess: async () => {
                setIsVisiableForm(true);
                setIsVisiableList(false);
                setIsVisiableSearch(false);
                setIsVisiableHoSoCreate(false);
                setIsVisiableHoSoList(false);
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
        setIsVisiableHoSoCreate(false);
        setIsVisiableHoSoList(false);
    };

    const handleHoSoList = (id) => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_HOSO_LIST;
        objectQueryVariable.id = id;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onHoSoList = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: { id },
            requestSuccess: async (res) => {
                setIsVisiableForm(false);
                setIsVisiableList(false);
                setIsVisiableSearch(false);
                setIsVisiableHoSoCreate(false);
                setIsVisiableHoSoList(true);
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleBack = (handleList);
    const handleDelete = (delteAll = true, id) => {
        const list_ke_hoach_tham_dinh_delete = delteAll ?
            main.getItemSelected(rows_selected, pageKey) :
            [id];
        deleteRequest({
            data: list_ke_hoach_tham_dinh_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const getSelection = (arrIds = [], isDaPheDuyet = true) => {
        var arrValidIds = arrIds.reduce((arrValidIds, id) => {
            ke_hoach_tham_dinh_list.map((ke_hoach) => {
                if (ke_hoach.id === id && (isDaPheDuyet === (ke_hoach.trangThaiPheDuyet !== 'DAPHEDUYET'))) {
                    arrValidIds.push(id);
                }
                return arrValidIds;
            });
            return arrValidIds;
        }, []);
        return arrValidIds;
    }

    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_LIST}`} />}
            <KeHoachThamDinhCTPComponent
                {...props}
                history={history}
                pageKey={pageKey}
                isVisiableForm={isVisiableForm}
                isVisiableList={isVisiableList}
                isVisiableSearch={isVisiableSearch}
                isVisiableHoSoCreate={isVisiableHoSoCreate}
                isVisiableHoSoList={isVisiableHoSoList}
                setIsVisiableHoSoCreate={setIsVisiableHoSoCreate}
                dataLoading={dataLoading}
                dataSearch={dataSearch}
                dataSort={dataSort}
                getAllRequest={getAllRequest}
                getAllHoSoThamDinhRequest={getAllHoSoThamDinhRequest}
                onSelectRow={onSelectRow}
                handleEdit={handleEdit}
                handleBack={handleBack}
                handleDelete={handleDelete}
                handleCreate={handleCreate}
                handleSearch={handleSearch}
                getSelection={getSelection}
                handleHoSoList={handleHoSoList}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleChangeDataSearch={handleChangeDataSearch}
                handleChangeDataSort={handleChangeDataSort}
            />
        </React.Fragment>
    );
}

export default KeHoachThamDinh;