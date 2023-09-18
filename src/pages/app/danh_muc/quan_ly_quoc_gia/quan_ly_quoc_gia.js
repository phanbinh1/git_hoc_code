
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import QuocGiaComponent from "./../../../../components/app/danh_muc/quan_ly_quoc_gia/quan_ly_quoc_gia";
import * as actQuocGia from "./../../../../actions/app/danh_muc/quan_ly_quoc_gia/quan_ly_quoc_gia";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const QuanLyQuocGia = ({ ...props }) => {

    const dataSortInit = [
        { key: "maQuocGia", value: true, sort: 1 },
        { key: "tenQuocGia", value: true, sort: 0 },
    ];

    const {
        queryVariable,
        location,
        history
    } = props;

    const [pageKey] = useState(pageKeys.PAGE_KEY_QUAN_LY_QUOC_GIA);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => {
        dispatch(act.selectRow(rows_selected, pageKeys.PAGE_KEY_QUAN_LY_QUOC_GIA));
    };
    const getAllRequest = (object = {}) => {
        dispatch(actQuocGia.getAllRequest({ ...object, pageKey: pageKeys.PAGE_KEY_QUAN_LY_QUOC_GIA }));
    };
    const getOneRequest = (object = {}) => {
        dispatch(actQuocGia.getOneRequest(object));
    };
    const handleGetOne = (value = {}) => {
        dispatch(actQuocGia.handleGetOne(value));
    };
    const deleteRequest = (object = {}) => {
        dispatch(actQuocGia.deleteRequest(object));
    };

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_LIST) {
                onList();
            }

        }
    }, [queryVariable.action])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_SEARCH;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onSearch = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(true);
    };

    const handleCreate = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_CREATE;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_UPDATE;
        objectQueryVariable.id = id;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
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
        objectQueryVariable.action = actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_LIST;
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
        let list_quoc_gia_delete = [];
        delteAll ?
            list_quoc_gia_delete = main.getItemSelected(rows_selected, pageKey) :
            list_quoc_gia_delete = [id];
        deleteRequest({
            data: list_quoc_gia_delete,
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
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_LIST}`} />}
            <QuocGiaComponent
                {...props}
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

export default QuanLyQuocGia;