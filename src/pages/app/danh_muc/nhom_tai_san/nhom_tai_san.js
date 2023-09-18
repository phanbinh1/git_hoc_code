import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router";
import NhomTaiSanComponent from "./../../../../components/app/danh_muc/nhom_tai_san/nhom_tai_san";
import * as actNhomTaiSan from "./../../../../actions/app/danh_muc/nhom_tai_san/nhom_tai_san";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const Nhom = () => {

    const dataSortInit = [
        { key: "id", value: false, sort: 3 },
        { key: "tenNhom", value: true, sort: 2 },
        { key: "maNhom", value: true, sort: 1 },
        { key: "mucTrichKhauHaoToiDa", value: true, sort: 0 },
        { key: "mucTrichKhauHaoToiThieu", value: true, sort: 0 },
    ];

    const history = useHistory();
    const location = useLocation();
    const qs = main.queryString.parse(location.search);

    const [pageKey] = useState(pageKeys.PAGE_KEY_TCB_NHOM);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => {
        dispatch(act.selectRow(rows_selected, pageKeys.PAGE_KEY_TCB_NHOM));
    };
    const getAllRequest = (object = {}) => {
        dispatch(actNhomTaiSan.getAllRequest({ ...object, pageKey: pageKeys.PAGE_KEY_TCB_NHOM }));
    };
    const getOneRequest = (object = {}) => {
        dispatch(actNhomTaiSan.getOneRequest(object));
    };
    const handleGetOne = (value = {}) => {
        dispatch(actNhomTaiSan.handleGetOne(value));
    };
    const deleteRequest = (object = {}) => {
        dispatch(actNhomTaiSan.deleteRequest(object));
    };

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (qs.action) {
            if (qs.action === actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_CREATE) {
                onCreate();
            }
            if (qs.action === actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_UPDATE && qs.id) {
                const id = qs.id;
                onEdit(id);
            }
            if (qs.action === actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_SEARCH) {
                onSearch();
            }
            if (qs.action === actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_LIST) {
                onList();
            }
        }
    }, [qs.action, qs.id])

    const handleSearch = () => {
        history.push({
            pathname: location.pathname,
            search: main.queryString.stringify({ action: actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_SEARCH }),
            hash: location.hash
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
            search: main.queryString.stringify({ action: actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_CREATE }),
            hash: location.hash
        });
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        history.push({
            pathname: location.pathname,
            search: main.queryString.stringify({ action: actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_UPDATE, id }),
            hash: location.hash
        });
    };

    const onEdit = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: { id },
            requestSuccess: () => {
                setIsVisiableForm(true);
                setIsVisiableList(false);
                setIsVisiableSearch(false);
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
        handleGetOne();
    };
    const handleBack = (handleList);

    const handleDelete = (delteAll = true, id) => {
        const list_delete = delteAll ? main.getItemSelected(rows_selected, pageKey) : [id]
        deleteRequest({
            data: list_delete,
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
            {!qs.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_LIST}`} />}
            <NhomTaiSanComponent
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
        </React.Fragment>
    );
}

export default Nhom;