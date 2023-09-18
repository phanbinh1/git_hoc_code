import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import AccountComponent from "./../../components/core/account/account";
import * as actAccount from "./../../actions/core/account";
import * as main from "./../../constants/main";
import * as act from "./../../actions/index";
import * as actID from "./../../constants/action_id";
import * as pageKeys from "./../../constants/page_key";

const Account = (props) => {

    const dataSortInit = {
        sort: false
    };
    const { queryVariable, location, history } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const [pageKey] = useState(pageKeys.PAGE_KEY_ACCOUNT);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const handleChangeLayout = (value = {}) => dispatch(act.handleChangeLayout(value));
    const getAllRequest = (object = {}) => dispatch(actAccount.getAllRequest({ ...object, pageKey }))
    const getOneRequest = (object = {}) => dispatch(actAccount.getOneRequest(object));
    const handleGetOne = (value = {}) => dispatch(actAccount.handleGetOne(value));
    const deleteRequest = (object = {}) => dispatch(actAccount.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_ACCOUNT.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_ACCOUNT.ACT_UPDATE && queryVariable.username) {
                const username = queryVariable.username;
                onEdit(username);
            }
            if (queryVariable.action === actID.ACT_ID_ACCOUNT.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_ACCOUNT.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.username])

    const handleSearch = () => {
        delete queryVariable.username;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT.ACT_SEARCH
            }
        }));
    };

    const onSearch = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(true);
    };

    const handleCreate = () => {
        delete queryVariable.username;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT.ACT_CREATE
            }
        }));
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        setIsVisiableSearch(false);
        handleGetOne();
    };

    const handleEdit = (username) => {
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT.ACT_UPDATE,
                username
            }
        }));
    };

    const onEdit = (username) => {
        handleStartLoadData();
        getOneRequest({
            data: { username },
            requestSuccess: () => {
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
        delete queryVariable.username;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_ACCOUNT.ACT_LIST
            }
        }));
    };

    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        setIsVisiableSearch(false);
    };

    const handleBack = (handleList);
    const handleDelete = (delteAll = true, username) => {
        let list_account_delete = [];
        list_account_delete = delteAll ? main.getItemSelected(rows_selected, pageKey).map(item => item.name) : [username];
        deleteRequest({
            data: list_account_delete,
            requestSuccess: handleDeleteSuccess
        });
    }

    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort)

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_ACCOUNT.ACT_LIST}`} />}
            <AccountComponent
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
                handleChangeLayout={handleChangeLayout}
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

export default Account;