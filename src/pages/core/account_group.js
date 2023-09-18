import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import AccountGroupComponent from "./../../components/core/account_group/account_group";
import * as actAccountGroup from "./../../actions/core/account_group";
import * as actAccount from "./../../actions/core/account";
import * as actPermission from "./../../actions/core/permission";
import * as act from "./../../actions/index";
import * as actID from "./../../constants/action_id";
import * as main from "./../../constants/main";
import * as pageKeys from "./../../constants/page_key";

const AccountGroup = (props) => {
    const { history, location, queryVariable } = props;
    const dataSortInit = {
        isCodeSort: true
    };

    const rows_selected = useSelector(state => state.core.rows_selected);

    const [pageKey] = useState(pageKeys.PAGE_KEY_ACCOUNT_GROUP);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [isVisiablePermissions, setIsVisiablePermissions] = useState(false);
    const [accountGroupCode, setAccountGroupCode] = useState("");
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const getAllRequest =(object = {}) => dispatch(actAccountGroup.getAllRequest({ ...object, pageKey }))
    const getOneRequest = (object = {}) => dispatch(actAccountGroup.getOneRequest(object));
    const handleGetOne = (value = {}) => dispatch(actAccountGroup.handleGetOne(value));
    const deleteRequest = (object = {}) => dispatch(actAccountGroup.deleteRequest(object));

    const getAllAccountRequest = (object = {}) => dispatch(actAccount.getAllRequest({ ...object }));
    const getPermissionsByAccountGroupCodeRequest = (object = {}) => dispatch(actAccountGroup.getPermissionsByAccountGroupCodeRequest(object));
    const getPermissionMenuRequest = () => dispatch(actPermission.getPermissionMenuRequest());

    useEffect(() => {
        onSelectRow([]);
    }, [])

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_ACCOUNT_GROUP.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_ACCOUNT_GROUP.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_ACCOUNT_GROUP.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_ACCOUNT_GROUP.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.id])

    const handleSearch = () => {
        delete queryVariable.username;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT_GROUP.ACT_SEARCH
            }
        }));
    };

    const onSearch = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(true);
    };

    const handleCreate = () => {
        delete queryVariable.id;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT_GROUP.ACT_CREATE
            }
        }));
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT_GROUP.ACT_UPDATE,
                id
            }
        }));
    };

    const onEdit = (id) => {
        handleStartLoadData();
        getOneRequest({
            data: { id },
            requestSuccess: () => {
                // getAllAccountRequest();
                setIsVisiableForm(true);
                setIsVisiableList(false);
                setIsVisiableSearch(false);
                handleEndLoadData();
            },
            requestError: () => {
                handleEndLoadData();
                history.go(-1);
            }
        });
    };

    const handleList = () => {
        delete queryVariable.id;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT_GROUP.ACT_LIST
            }
        }));
    };

    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
    };
    const handleBack = (handleList);
    const handleDelete = (delteAll = true, groupCode) => {
        const list_account_group_delete = delteAll ?
            main.getItemSelected(rows_selected, pageKey).map(item => item.groupCode) :
            [groupCode];
        deleteRequest({
            data: list_account_group_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => {
        onSelectRow();
    };

    const handleSharePermission = (accountGroupCode) => {
        getPermissionMenuRequest();
        getPermissionsByAccountGroupCodeRequest({
            data: { accountGroupCode },
            requestSuccess: () => {
                setAccountGroupCode(accountGroupCode);
                setIsVisiablePermissions(true)
            },
            requestError: () => {
            }
        });
    };
    const handleCancelSharePermission = () => setIsVisiablePermissions(false);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);
    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_ACCOUNT_GROUP.ACT_LIST}`} />}
            <AccountGroupComponent
                {...props}
                getAllAccountRequest={getAllAccountRequest}
                pageKey={pageKey}
                isVisiableForm={isVisiableForm}
                isVisiableList={isVisiableList}
                isVisiableSearch={isVisiableSearch}
                isVisiablePermissions={isVisiablePermissions}
                accountGroupCode={accountGroupCode}
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
                handleSharePermission={handleSharePermission}
                handleCancelSharePermission={handleCancelSharePermission}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleChangeDataSearch={handleChangeDataSearch}
                handleChangeDataSort={handleChangeDataSort}
            />
        </React.Fragment>
    );
}
export default AccountGroup;