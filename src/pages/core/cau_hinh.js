import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import CauHinhComponent from "./../../components/core/cau_hinh/cau_hinh";
import * as actCauHinh from "./../../actions/core/cau_hinh";
import * as act from "./../../actions/index";
import * as main from "./../../constants/main";
import * as pageKeys from "./../../constants/page_key";
import * as actID from "./../../constants/action_id";

const CauHinh = ({ ...props }) => {

    const {
        queryVariable,
        location,
        history
    } = props;

    const [pageKey] = useState(pageKeys.PAGE_KEY_CAU_HINH);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => {
        dispatch(act.selectRow(rows_selected, pageKey));
    };
    const getAllRequest = (object = {}) => {
        dispatch(actCauHinh.getAllRequest({ ...object, pageKey }));
    }
    const getOneRequest = (object = {}) => {
        dispatch(actCauHinh.getOneRequest(object));
    };
    const handleGetOne = (value = {}) => {
        dispatch(actCauHinh.handleGetOne(value));
    }
    const deleteRequest = (object = {}) => {
        dispatch(actCauHinh.deleteRequest(object));
    };

    useEffect(() => {
        onSelectRow([]);
    }, [])

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_CAU_HINH.ACT_CREATE) {
                onCreate();
            }
            if (queryVariable.action === actID.ACT_ID_CAU_HINH.ACT_UPDATE && queryVariable.id) {
                const id = queryVariable.id;
                onEdit(id);
            }
            if (queryVariable.action === actID.ACT_ID_CAU_HINH.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action])

    const handleCreate = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_CAU_HINH.ACT_CREATE;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
        handleGetOne();
    };

    const handleEdit = (id) => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_CAU_HINH.ACT_UPDATE;
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
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_CAU_HINH.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList = () => {
        setIsVisiableForm(false);
        setIsVisiableList(true);
        handleGetOne();
    };

    const handleBack = (handleList);
    const handleDelete = (delteAll = true, id) => {
        let list_cau_hinh_delete = [];
        if (delteAll) {
            list_cau_hinh_delete = main.getItemSelected(rows_selected, this.state.pageKey);
        }
        else {
            list_cau_hinh_delete = [id];
        }
        deleteRequest({
            data: list_cau_hinh_delete,
            requestSuccess: handleDeleteSuccess
        });
    }
    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_CAU_HINH.ACT_LIST}`} />}
            <CauHinhComponent
                {...props}
                pageKey={pageKey}
                isVisiableForm={isVisiableForm}
                isVisiableList={isVisiableList}
                dataLoading={dataLoading}
                getAllRequest={getAllRequest}
                onSelectRow={onSelectRow}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleEdit={handleEdit}
                handleBack={handleBack}
                handleDelete={handleDelete}
                handleCreate={handleCreate}
            />
        </React.Fragment>
    );
}

export default CauHinh;