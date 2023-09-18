import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import ThongBaoCongBoSanPhamComponent from "./../../../components/app/quan_ly_thong_bao_cong_bo_san_pham/thong_bao_cong_bo_san_pham";
import * as actThongBaoCongBoSanPham from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham";
import * as main from "./../../../constants/main";
import * as act from "./../../../actions/index";
import * as pageKeys from "./../../../constants/page_key";
import * as actID from "./../../../constants/action_id";

export const loaiCongBo = {
    TUCONGBO: "TUCONGBO",
    BANCONGBO: "BANCONGBO",
    options: [{ value: "TUCONGBO", label: "Hồ sơ tự công bố" }, { value: "BANCONGBO", label: "Hồ sơ bản công bố" }]
}
const ThongBaoCongBoSanPham = ({
    queryVariable,
    location,
    history,
}) => {

    const dataSortInit = [
        { key: "id", value: false, sort: 6 },
        { key: "soThongBao", value: true, sort: 5 },
        { key: "tieuDe", value: true, sort: 4 },
        { key: "tuNgay", value: true, sort: 3 },
        { key: "denNgay", value: true, sort: 2 },
        { key: "ngayKyThongBao", value: true, sort: 1 },
        { key: "loaiCongBo", value: true, sort: 0 },
    ]

    const [pageKey] = useState(pageKeys.PAGE_KEY_THONG_BAO_HO_SO_TU_CONG_BO);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(false);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [isVisibleUpdateList, setIsVisiableUpdateList] = useState(false);
    const [allowUpdateList, setAllowUpdateList] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const getAllRequest = (object = {}) => dispatch(actThongBaoCongBoSanPham.getAllRequest({ ...object, pageKey }));
    const getOneRequest = (object = {}) => dispatch(actThongBaoCongBoSanPham.getOneRequest(object));
    const handleGetOne = (value = {}) => dispatch(actThongBaoCongBoSanPham.handleGetOne(value));
    const deleteRequest = (object = {}) => dispatch(actThongBaoCongBoSanPham.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.id])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_SEARCH;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onSearch = () => {
        setAllowUpdateList(allowUpdateList)
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(true);
        setIsVisiableUpdateList(false);
    };

    const handleCreate = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_CREATE;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onCreate = () => {
        setAllowUpdateList(false);
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        setIsVisiableUpdateList(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_UPDATE;
        objectQueryVariable.id = id;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onEdit = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: { id },
            requestSuccess: () => {
                setAllowUpdateList(false);
                setIsVisiableForm(true);
                setIsVisiableList(false);
                setIsVisiableSearch(false);
                setIsVisiableUpdateList(false);
                handleEndLoadData();
            },
            requestError: () => {
                handleEndLoadData();
            }
        });
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList =() => {
        setAllowUpdateList(false);
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
        setIsVisiableUpdateList(false);
    };

    const handleBack = (handleList);

    const handleDelete = (delteAll = true, id) => {
        const list = delteAll ?
            main.getItemSelected(rows_selected, pageKey) :
            [id];
        deleteRequest({
            data: list,
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
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_LIST}`} />}
            <ThongBaoCongBoSanPhamComponent
                loaiCongBo={loaiCongBo}
                queryVariable={queryVariable}
                location={location}
                history={history}
                pageKey={pageKey}
                isVisiableForm={isVisiableForm}
                isVisibleUpdateList={isVisibleUpdateList}
                isVisiableList={isVisiableList}
                isVisiableSearch={isVisiableSearch}
                allowUpdateList={allowUpdateList}
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

export default ThongBaoCongBoSanPham;