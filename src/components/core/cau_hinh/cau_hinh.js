import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CauHinhList from "./cau_hinh_list";
import CauHinhForm from "./cau_hinh_form";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";

const CauHinh = ({ ...props }) => {

    const {
        isVisiableForm,
        isVisiableList,
        pageKey,
        handleCreate,
        handleDelete,
        handleBack
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    }

    useEffect(() => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        setAction(arrAction);
    }, [isVisiableList, main.getItemSelected(rows_selected, pageKey)])

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_CAU_HINH.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        let selected = main.getItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_CAU_HINH.ACT_DELETE;
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

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableForm && <CauHinhForm {...props} />}
            {isVisiableList && <CauHinhList {...props} />}
        </React.Fragment>
    );
}

export default CauHinh;