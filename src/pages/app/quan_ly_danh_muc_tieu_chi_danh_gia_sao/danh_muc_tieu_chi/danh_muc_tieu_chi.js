import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import * as actDanhMucTieuChi from "./../../../../actions/app/quan_ly_danh_muc_chi_tieu_danh_gia_sao/danhmuctieuchi/index";
import * as act from "./../../../../actions/index";
import * as main from "./../../../../constants/main";
import * as actID from "./../../../../constants/action_id";
import * as pageKeys from "./../../../../constants/page_key";
import DanhMucTieuChiComponent from "../../../../components/app/quan_ly_danh_muc_chi_tieu_danh_gia_sao/danhmuctieuchi/danhmuctieuchi";

const DanhMucTieuChi = (props) => {
    const { queryVariable, location, history } = props;
    const rows_selected = useSelector(state => state.core.rows_selected);
    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const deleteRequest = (object = {}) => dispatch(actDanhMucTieuChi.deleteRequest(object));
    const handleGetOne = (idParent = 0) => dispatch(actDanhMucTieuChi.handleGetOne({ idParent }));
    const getOneRequest = (object = {}) => dispatch(actDanhMucTieuChi.getOneRequest(object));
    const getAllRequest = (object = {}) => dispatch(actDanhMucTieuChi.getAllRequest({ ...object, pageKey }));

    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [pageKey] = useState(pageKeys.PAGE_KEY_PERMISSION);
    const [dataLoading, setDataLoading] = useState(true);
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
    const getMenuRequest = (object = {}) => dispatch(actDanhMucTieuChi.getMenuRequest(object));

    useEffect(() => {
        getMenuRequest({
            requestSuccess: () => { setIsLoadingSkeleton(false) },
            requestError: () => { setIsLoadingSkeleton(false) }
        })
        onSelectRow();
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_DANH_MUC_HANG_SAO.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_DANH_MUC_HANG_SAO.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_DANH_MUC_HANG_SAO.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.id]);

    useEffect(() => {
        let idcha = 0;
        if (queryVariable.active_id) {
            idcha = parseInt(queryVariable.active_id, 0);
        }
        handleStartLoadData();
        getAllRequest({
            data: {
                idcha
            },
            requestSuccess: () => {
                onSelectRow();
                handleEndLoadData();
            },
            requestError: () => { handleEndLoadData(); }
        });
    }, [queryVariable.active_id])

    const findPermissionById = (list, id, result = null) => {
        list.map((item) => {
            if (item.id === id) {
                return result = item;
            }
            else {
                return result = findPermissionById(item.children, id, result);
            }
        });
        return result;
    }

    const handleCreate = () => {
        delete queryVariable.id;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_DANH_MUC_HANG_SAO.ACT_CREATE
            }
        }));
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_DANH_MUC_HANG_SAO.ACT_UPDATE,
                id
            }
        }))
    };

    const onEdit = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: {
                id
            },
            requestSuccess: () => {
                setIsVisiableForm(true);
                setIsVisiableList(false);
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleList = () => {
        delete queryVariable.id;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_DANH_MUC_HANG_SAO.ACT_LIST
            }
        }));
    };
    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
    };

    const handleBack = (handleList);
    const handleDelete = (delteAll = true, id) => {
        let list_tieuchi_delete = [];
        if (delteAll) {
            list_tieuchi_delete = main.getItemSelected(rows_selected, pageKey);
        }
        else {
            list_tieuchi_delete = [id];
        }
        deleteRequest({
            data: list_tieuchi_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => {
        onSelectRow([]);
        getMenuRequest({
            requestSuccess: () => { setIsLoadingSkeleton(false) },
            requestError: () => { setIsLoadingSkeleton(false) }
        })
    };

    const handleEndLoadData = () => setDataLoading(false);
    const handleStartLoadData = () => setDataLoading(true);

    return (
        <React.Fragment>
            {
                !queryVariable.action
                && <Redirect to={main.formatUrl({
                    pathname: location.pathname,
                    objSearch: {
                        ...queryVariable,
                        action: actID.ACT_DANH_MUC_HANG_SAO.ACT_LIST
                    }
                })} />
            }
            <DanhMucTieuChiComponent
                {...props}
                pageKey={pageKey}
                isVisiableForm={isVisiableForm}
                isVisiableList={isVisiableList}
                dataLoading={dataLoading}
                getAllRequest={getAllRequest}
                onSelectRow={onSelectRow}
                handleEdit={handleEdit}
                handleBack={handleBack}
                handleDelete={handleDelete}
                handleCreate={handleCreate}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                isLoadingSkeleton={isLoadingSkeleton}
                setIsLoadingSkeleton={setIsLoadingSkeleton}
                getMenuRequest={getMenuRequest}
            />
        </React.Fragment>
    );
}

export default DanhMucTieuChi;