import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import LoaiThucPhamComponent from "./../../../../components/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/loai_thuc_pham/loai_thuc_pham";
import * as actLoaiThucPham from "../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/loai_thuc_pham/loai_thuc_pham";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const LoaiThucPham = ({ ...props }) => {

    const dataSortInit = [
        { key: "id", value: false, sort: 2 },
        { key: "maLoaiThucPham", value: true, sort: 1 },
        { key: "tenLoaiThucPham", value: true, sort: 0 },
    ];

    const {
        queryVariable,
        location,
        history
    } = props;

    const [pageKey] = useState(pageKeys.PAGE_KEY_NHOM_THUC_PHAM);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => {
        dispatch(act.selectRow(rows_selected, pageKeys.PAGE_KEY_NHOM_THUC_PHAM));
    };
    const getAllRequest = (object = {}) => {
        dispatch(actLoaiThucPham.getAllRequest({ ...object, pageKey: pageKeys.PAGE_KEY_NHOM_THUC_PHAM }));
    };
    const getOneRequest = (object = {}) => {
        dispatch(actLoaiThucPham.getOneRequest(object));
    };
    const handleGetOne = (value = {}) => {
        dispatch(actLoaiThucPham.handleGetOne(value));
    };
    const deleteRequest = (object = {}) => {
        dispatch(actLoaiThucPham.deleteRequest(object));
    };

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_LIST) {
                onList();
            }

        }
    }, [queryVariable.action])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_SEARCH;
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
        objectQueryVariable.action = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_CREATE;
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
        objectQueryVariable.action = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_UPDATE;
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
        objectQueryVariable.action = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_LIST;
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
        let list_loai_thuc_pham_delete = [];
        delteAll ?
            list_loai_thuc_pham_delete = main.getItemSelected(rows_selected, pageKey) :
            list_loai_thuc_pham_delete = [id];
        deleteRequest({
            data: list_loai_thuc_pham_delete,
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
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_LIST}`} />}
            <LoaiThucPhamComponent
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

export default LoaiThucPham;