import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiaBanForm from "./dia_ban_form";
import DiaBanList from "./dia_ban_list";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban"
import * as act from "./../../../../actions"
import * as actID from "./../../../../constants/action_id";
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";

const DiaBan = ({ ...props }) => {
    const {
        pageKey,
        isVisiableForm,
        isVisiableList,
        handleCreate,
        handleDelete,
        handleBack,
        handleSync
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState([]);

    const dispatch = useDispatch();
    const getAllRequest = (value = {}) => dispatch(actDiaBan.getAllRequest(value));
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        var arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(renderActionSync());
        setAction(arrAction);
    }, [isVisiableList, main.getItemSelected(rows_selected, `${pageKey}_0`)])

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_DIA_BAN.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    };

    const renderActionDelete = () => {
        let result = {};
        const selected = main.getItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_DIA_BAN.ACT_DELETE;
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
    };

    const renderActionSync = () => {
        let result = {};
        result.key = actID.ACT_ID_DANH_MUC_DIA_BAN.ACT_SYNC;
        result.disabled = false;
        result.handleClick = handleSync;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    };

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    };

    return (
        <React.Fragment>
            {isVisiableForm && <DiaBanForm {...props} />}
            {isVisiableList && <DiaBanList
                {...props}
                getAllRequest={getAllRequest}
                defaultExpandedRowKeys={defaultExpandedRowKeys}
                setDefaultExpandedRowKeys={setDefaultExpandedRowKeys}
                key="0"
                level={0}
                parentCode="0"
                parentId={0}
                parentSelected={false}
                listIdParent={[]}
                defaultInitValue={{}}
            />}
        </React.Fragment>
    );
}

export default DiaBan;