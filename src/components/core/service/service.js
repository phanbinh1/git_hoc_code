import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServiceList from "./service_list";
import ServiceForm from "./service_form";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";

const Service = ({ ...props }) => {

    const {
        isVisiableForm,
        isVisiableList,
        isVisiableSearch,
        pageKey,
        handleCreate,
        handleDelete,
        handleSearch,
        handleBack
    } = props;

    const dispatch = useDispatch();

    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    }

    const rows_selected = useSelector(state => state.core.rows_selected);

    useEffect(() => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        setAction(arrAction);
    }, [isVisiableList, isVisiableSearch, main.getItemSelected(rows_selected, pageKey)]);

    const renderActionCreate = () => {
        var result = {};
        result.key = actID.ACT_ID_SERVICE.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        let selected = main.getItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_SERVICE.ACT_DELETE;
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
        var result = {};
        result.key = actID.ACT_ID_SERVICE.ACT_SEARCH;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        var result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList || isVisiableSearch) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableForm && <ServiceForm {...props} />}
            {isVisiableList && <ServiceList {...props} />}
        </React.Fragment>
    );
}

export default Service;