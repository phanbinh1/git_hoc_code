import React, { useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NhomTaiSanList from "./nhom_tai_san_list";
import NhomTaiSanForm from "./nhom_tai_san_form";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";

const NhomTaiSan = ({
    isVisiableList,
    isVisiableSearch,
    isVisiableForm,
    pageKey,
    handleBack,
    handleCreate,
    handleDelete,
    handleSearch,
    dataLoading,
    dataSearch,
    dataSort,
    getAllRequest,
    handleChangeDataSort,
    handleEdit,
    handleEndLoadData,
    handleStartLoadData,
    onSelectRow,
    handleChangeDataSearch
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
    }, [isVisiableList, isVisiableSearch, () => mainGetItemSelected(rows_selected, pageKey)]);

    const mainGetItemSelected = (rows_selected, pageKey) => main.getItemSelected(rows_selected, pageKey);

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    };

    const renderActionDelete = () => {
        let result = {};
        const selected = mainGetItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_DELETE;
        result.disabled = selected.length > 0 ? false : true;
        result.hidden = isVisiableList ? false : true;
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
        result.key = actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_SEARCH;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList || isVisiableSearch) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableForm && <NhomTaiSanForm handleBack={handleBack} />}
            {isVisiableList && <NhomTaiSanList
                pageKey={pageKey}
                dataLoading={dataLoading}
                dataSearch={dataSearch}
                dataSort={dataSort}
                getAllRequest={getAllRequest}
                handleChangeDataSort={handleChangeDataSort}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleEndLoadData={handleEndLoadData}
                handleStartLoadData={handleStartLoadData}
                isVisiableSearch={isVisiableSearch}
                onSelectRow={onSelectRow}
                handleChangeDataSearch={handleChangeDataSearch}
            />}
        </React.Fragment>
    );
}

export default NhomTaiSan;