import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import ServiceComponent from "./../../components/core/service/service";
import * as actService from "./../../actions/core/service";
import * as main from "./../../constants/main";
import * as act from "./../../actions/index";
import * as pageKeys from "./../../constants/page_key";
import * as actID from "./../../constants/action_id";

const Service = ({ ...props }) => {

    const { history, queryVariable, location } = props;

    const [pageKey] = useState(pageKeys.PAGE_KEY_SERVICE);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);

    const rows_selected = useSelector(state => state.core.rows_selected);
    const service_list = useSelector(state => state.core.service.list);

    const dispatch = useDispatch();
    const onSelectRow = (rows = []) => dispatch(act.selectRow(rows, pageKey));
    const getAllRequest = (object = {}) => dispatch(actService.getAllRequest({ ...object, pageKey }));
    const getOneRequest = (object = {}) => dispatch(actService.getOneRequest(object));
    const handleGetOne = (value = {}) => dispatch(actService.handleGetOne(value));
    const deleteRequest = (object = {}) => dispatch(actService.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_SERVICE.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_SERVICE.ACT_UPDATE && queryVariable.clientId) {
                const clientId = queryVariable.clientId;
                onEdit(clientId);

            }
            if (queryVariable.action === actID.ACT_ID_SERVICE.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.clientId])

    const handleCreate = () => {
        delete queryVariable.clientId;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_SERVICE.ACT_CREATE
            }
        }));
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        handleGetOne();
    };

    const handleEdit = (clientId) => {
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_SERVICE.ACT_UPDATE,
                clientId
            }
        }));
    };

    const onEdit = (clientId) => {
        handleStartLoadData();
        getOneRequest({
            data: {
                clientId
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
        delete queryVariable.clientId;
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                action: actID.ACT_ID_SERVICE.ACT_LIST
            }
        }));
    };

    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
    };

    const handleBack = (handleList);

    const handleDelete = (delteAll = true, clientId) => {
        let list_service_delete = [];
        if (delteAll) {
            let item_selected = main.getItemSelected(rows_selected, pageKey);
            item_selected.map((item) => {
                var key = service_list.findIndex(c => item.clientId === c.clientId);
                if (key !== -1) {
                    list_service_delete.push(service_list[key].clientId);
                }
                return list_service_delete;
            })
        }
        else {
            list_service_delete = [clientId];
        }
        deleteRequest({
            data: list_service_delete,
            requestSuccess: this.handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => {
        onSelectRow([]);
    };

    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_SERVICE.ACT_LIST}`} />}
            <ServiceComponent
                {...props}
                pageKey={pageKey}
                isVisiableForm={isVisiableForm}
                isVisiableList={isVisiableList}
                handleDeleteSuccess={handleDeleteSuccess}
                onSelectRow={onSelectRow}
                getAllRequest={getAllRequest}
                dataLoading={dataLoading}
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

export default Service;