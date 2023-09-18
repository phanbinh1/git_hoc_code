import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router";
import NguonKinhPhiComponent from "./../../../../components/app/danh_muc/nguon_kinh_phi/nguon_kinh_phi";
import * as actNguonKinhPhi from "./../../../../actions/app/danh_muc/nguon_kinh_phi/nguon_kinh_phi";
import { getItemSelected, queryString } from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const NguonKinhPhi = () => {

    const dataSortInit = [
        { key: "ma", value: true, sort: 1 },
        { key: "ten", value: true, sort: 2 },
        { key: "id", value: true, sort: 3 }

    ];

    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);

    const [pageKey] = useState(pageKeys.PAGE_KEY_NGUON_KINH_PHI);
    const [isVisibleForm, setIsVisibleForm] = useState(false);
    const [isVisibleList, setIsVisibleList] = useState(true);
    const [isVisibleListDetail, setIsVisibleListDetail] = useState(false);
    const [isVisibleSearch, setIsVisibleSearch] = useState(false);

    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState();
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKeys.PAGE_KEY_NGUON_KINH_PHI));
    const getAllRequest = (object = {}) => dispatch(actNguonKinhPhi.getAllRequest({ ...object, pageKey: pageKeys.PAGE_KEY_NGUON_KINH_PHI }));
    const getOneRequest = (object = {}) => dispatch(actNguonKinhPhi.getOneRequest({ ...object }));
    const handleGetOne = (value = {}) => dispatch(actNguonKinhPhi.handleGetOne({ ...value }))
    const deleteRequest = (object = {}) => dispatch(actNguonKinhPhi.deleteRequest({ ...object }))

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        switch (qs.action) {
            case actID.ACT_ID_NGUON_KINH_PHI.ACT_CREATE:
                onCreate();
                break;
            case actID.ACT_ID_NGUON_KINH_PHI.ACT_UPDATE:
                qs.id && onEdit(qs.id);
                break;
            case actID.ACT_ID_NGUON_KINH_PHI.ACT_SEARCH:
                onSearch();
                break;
            case actID.ACT_ID_NGUON_KINH_PHI.ACT_LIST:
                onList();
                break;
            default: break;
        }
    }, [qs.action, qs.id])

    const handleSearch = () => {
        history.push({
            pathname: location.pathname,
            search: queryString.stringify({ action: actID.ACT_ID_NGUON_KINH_PHI.ACT_SEARCH })
        });
    };

    const onSearch = () => {
        setIsVisibleForm(false);
        setIsVisibleList(true);
        setIsVisibleSearch(true);
        setIsVisibleListDetail(false);
    };

    const handleCreate = () => {
        history.push({
            pathname: location.pathname,
            search: queryString.stringify({ action: actID.ACT_ID_NGUON_KINH_PHI.ACT_CREATE })
        });
    };

    const onCreate = () => {
        setIsVisibleForm(true);
        setIsVisibleList(false);
        setIsVisibleSearch(false);
        setIsVisibleListDetail(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        history.push({
            pathname: location.pathname,
            search: queryString.stringify({ action: actID.ACT_ID_NGUON_KINH_PHI.ACT_UPDATE, id })
        });
    };

    const onEdit = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: { id },
            requestSuccess: () => {
                setIsVisibleForm(true);
                setIsVisibleList(false);
                setIsVisibleSearch(false);
                setIsVisibleListDetail(false);
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };


    const handleList = () => {
        history.push({
            pathname: location.pathname,
            search: queryString.stringify({ action: actID.ACT_ID_NGUON_KINH_PHI.ACT_LIST })
        });
    };

    const onList = () => {
        setIsVisibleForm(false);
        setIsVisibleList(true);
        setIsVisibleSearch(false);
        setIsVisibleListDetail(false);
        handleGetOne();
    };
    const handleBack = (handleList);

    const handleDelete = (delteAll = true, id) => {
        let nguon_kinh_phi_delete = [];
        delteAll ?
            nguon_kinh_phi_delete = getItemSelected(rows_selected, pageKey) :
            nguon_kinh_phi_delete = [id];
        deleteRequest({
            data: nguon_kinh_phi_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    return <Fragment>
        {!qs.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_NGUON_KINH_PHI.ACT_LIST}`} />}
        <NguonKinhPhiComponent
            pageKey={pageKey}
            isVisibleForm={isVisibleForm}
            isVisibleList={isVisibleList}
            isVisibleSearch={isVisibleSearch}
            isVisibleListDetail={isVisibleListDetail}
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

export default NguonKinhPhi;