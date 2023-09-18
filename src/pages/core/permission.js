import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import PermissionComponent from "./../../components/core/permission/permission";
import * as actPermission from "./../../actions/core/permission";
import * as act from "./../../actions/index";
import * as main from "./../../constants/main";
import * as actID from "./../../constants/action_id";
import * as pageKeys from "./../../constants/page_key";

const Permission = (props) => {
    const { queryVariable, location, history } = props;
    
    const rows_selected = useSelector(state => state.core.rows_selected);
    
    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const deleteRequest = (object = {}) => dispatch(actPermission.deleteRequest(object));
    const handleGetOne = (idParent = 0) => dispatch(actPermission.handleGetOne({ idParent }));
    const getOneRequest = (object = {}) => dispatch(actPermission.getOneRequest(object));
    const getAllRequest = (object = {}) => dispatch(actPermission.getAllRequest({ ...object, pageKey }));
    
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [pageKey] = useState(pageKeys.PAGE_KEY_PERMISSION);
    const [dataLoading, setDataLoading] = useState(true);
    
    useEffect(() => {
        onSelectRow();
    }, []);
    
    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_PERMISSION.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_PERMISSION.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_PERMISSION.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.id]);
    
    useEffect(() => {
        let idParent = 0;
        if (queryVariable.permission_active_id) {
            idParent = parseInt(queryVariable.permission_active_id, 0);
        }
        handleStartLoadData();
        getAllRequest({
            data: {
                idParent
            },
            requestSuccess: () => {
                onSelectRow();
                handleEndLoadData();
            },
            requestError: () => { handleEndLoadData(); }
        });
    }, [queryVariable.permission_active_id])

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
                action: actID.ACT_ID_PERMISSION.ACT_CREATE
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
                action: actID.ACT_ID_PERMISSION.ACT_UPDATE,
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
                action: actID.ACT_ID_PERMISSION.ACT_LIST
            }
        }));
    };
    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
    };
    const handleBack = (handleList);
    const handleDelete = (delteAll = true, id) => {
        let list_permission_delete = [];
        if (delteAll) {
            list_permission_delete = main.getItemSelected(rows_selected, pageKey);
        }
        else {
            list_permission_delete = [id];
        }
        deleteRequest({
            data: list_permission_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => {
        onSelectRow([]);
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
                        action: actID.ACT_ID_PERMISSION.ACT_LIST
                    }
                })} />
            }
            <PermissionComponent
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
            />
        </React.Fragment>
    );
}

export default Permission;