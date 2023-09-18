import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import DotKiemTraComponent from "../../../../components/app/quan_ly_cong_tac_giam_sat_o_nhiem/dot_kiem_tra/dot_kiem_tra";
import * as actDotKiemTra from "../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/dot_kiem_tra/dot_kiem_tra";
import * as main from "../../../../constants/main";
import * as act from "../../../../actions/index";
import * as pageKeys from "../../../../constants/page_key";
import * as actID from "../../../../constants/action_id";

const ketQuaOptions = [
    { value: "DAT", label: "Đạt" },
    { value: "KHONGDAT", label: "Không đạt" },
    { value: "CHUACOKETQUA", label: "Chưa có kết quả" },
]

const DotKiemTra = ({ ...props }) => {

    const dataSortInit = [
        { key: "id", value: false, sort: 2 },
        { key: "maDotKiemTra", value: true, sort: 1 },
        { key: "tenDotKiemTra", value: true, sort: 0 },
    ];

    const {
        queryVariable,
        location,
        history
    } = props;

    const [pageKey] = useState(pageKeys.PAGE_KEY_DOT_KIEM_TRA);
    const [isVisiableChiTietMau, setIsVisiableChiTietMau] = useState(false);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(false);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => {
        dispatch(act.selectRow(rows_selected, pageKeys.PAGE_KEY_DOT_KIEM_TRA));
    };
    const getAllRequest = (object = {}) => {
        dispatch(actDotKiemTra.getAllRequest({ ...object, pageKey: pageKeys.PAGE_KEY_DOT_KIEM_TRA }));
    };
    const getOneRequest = (object = {}) => {
        dispatch(actDotKiemTra.getOneRequest(object));
    };
    const handleGetOne = (value = {}) => {
        dispatch(actDotKiemTra.handleGetOne(value));
    };
    const deleteRequest = (object = {}) => {
        dispatch(actDotKiemTra.deleteRequest(object));
    };

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_DOT_KIEM_TRA.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_DOT_KIEM_TRA.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_DOT_KIEM_TRA.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_DOT_KIEM_TRA.ACT_LIST) {
                onList();
            }

        }
    }, [queryVariable.action])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_DOT_KIEM_TRA.ACT_SEARCH;
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
        objectQueryVariable.action = actID.ACT_ID_DOT_KIEM_TRA.ACT_CREATE;
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
        objectQueryVariable.action = actID.ACT_ID_DOT_KIEM_TRA.ACT_UPDATE;
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

    const onGetChiTietMau = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: { id },
            requestSuccess: () => {
                setIsVisiableChiTietMau(true)
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_DOT_KIEM_TRA.ACT_LIST;
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
        let list_dot_kiem_tra_delete = [];
        delteAll ?
            list_dot_kiem_tra_delete = main.getItemSelected(rows_selected, pageKey) :
            list_dot_kiem_tra_delete = [id];
        deleteRequest({
            data: list_dot_kiem_tra_delete,
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
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_DOT_KIEM_TRA.ACT_LIST}`} />}
            <DotKiemTraComponent
                {...props}
                ketQuaOptions={ketQuaOptions}
                pageKey={pageKey}
                isVisiableChiTietMau={isVisiableChiTietMau}
                setIsVisiableChiTietMau={setIsVisiableChiTietMau}
                isVisiableForm={isVisiableForm}
                isVisiableList={isVisiableList}
                isVisiableSearch={isVisiableSearch}
                dataLoading={dataLoading}
                dataSearch={dataSearch}
                dataSort={dataSort}
                getAllRequest={getAllRequest}
                onSelectRow={onSelectRow}
                onGetChiTietMau={onGetChiTietMau}
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

export default DotKiemTra;