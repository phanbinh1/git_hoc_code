import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AccountList from "./account_list";
import AccountForm from "./account_form";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";

const Account = ({ ...props }) => {

    const {
        pageKey,
        isVisiableForm,
        isVisiableList,
        isVisiableSearch,
        handleCreate,
        handleDelete,
        handleSearch,
        handleBack
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        setAction(arrAction);
    }, [isVisiableList, isVisiableSearch, main.getItemSelected(rows_selected, pageKey), main.getItemSelected(rows_selected, pageKey).length])

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_ACCOUNT.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        const selected = main.getItemSelected(rows_selected, pageKey);
        let result = {};
        result.key = actID.ACT_ID_ACCOUNT.ACT_DELETE;
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
        result.key = actID.ACT_ID_ACCOUNT.ACT_SEARCH;
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
            {isVisiableForm && <AccountForm  {...props} />}
            {isVisiableList && <AccountList {...props} />}
        </React.Fragment>
    );
}

export default Account;