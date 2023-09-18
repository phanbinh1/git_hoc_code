import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DanhMucChoList from "./danh_muc_cho_list";
import DanhMucChoForm from "./danh_muc_cho_form";
import * as act from "../../../../actions/index";
import * as actID from "../../../../constants/action_id";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";

const DanhMucCho = ({
    isVisibleList,
    isVisibleSearch,
    isVisibleForm,
    pageKey,
    handleBack,
    handleCreate,
    handleDelete,
    handleSearch,
    handleChangeDataSearch,
    onSelectRow,
    dataSearch,
    handleStartLoadData,
    handleEndLoadData,
    getAllRequest,
    handleEdit,
    dataSort,
    handleChangeDataSort,
    dataLoading,
}) => {

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        var arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        setAction(arrAction);
    }, [isVisibleList, isVisibleSearch, () => mainGetItemSelected(rows_selected, pageKey)]);

    const mainGetItemSelected = (rows_selected, pageKey) => main.getItemSelected(rows_selected, pageKey);

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_DANH_MUC_CHO.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisibleList && !isVisibleSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    };

    const renderActionDelete = () => {
        let result = {};
        const selected = mainGetItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_DANH_MUC_CHO.ACT_DELETE;
        result.disabled = selected.length > 0 ? false : true;
        result.hidden = isVisibleList ? false : true;
        result.handleClick = handleDelete;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.isConfirm = true;
        result.confirmTitle = "Bạn chắc chắn muốn xóa"
        result.confirmOkText = "Đồng ý"
        result.confirmOkType = "danger"
        result.confirmCancelText = "Hủy"
        result.text = `Xóa ${selected.length > 0 ? `(${selected.length})` : ""}`;
        return result;
    }

    const renderActionSearch = () => {
        let result = {};
        result.key = actID.ACT_ID_DANH_MUC_CHO.ACT_SEARCH;
        result.disabled = false;
        result.hidden = (isVisibleList && !isVisibleSearch) ? false : true;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisibleList || isVisibleSearch) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return <Fragment>
        {isVisibleForm && <DanhMucChoForm handleBack={handleBack} />}
        {isVisibleList && <DanhMucChoList
            pageKey={pageKey}
            dataLoading={dataLoading}
            dataSort={dataSort}
            handleChangeDataSort={handleChangeDataSort}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            getAllRequest={getAllRequest}
            handleEndLoadData={handleEndLoadData}
            handleStartLoadData={handleStartLoadData}
            dataSearch={dataSearch}
            onSelectRow={onSelectRow}
            isVisibleSearch={isVisibleSearch}
            handleChangeDataSearch={handleChangeDataSearch}
        />}
    </Fragment>
}

export default DanhMucCho;