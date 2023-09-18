import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoaiThucPhamList from "./loai_thuc_pham_list";
import LoaiThucPhamForm from "./loai_thuc_pham_form";
import * as act from "./../../../../../actions/index";
import * as actID from "./../../../../../constants/action_id";
import * as constants from "./../../../../../constants/constants";
import * as main from "./../../../../../constants/main";

const LoaiThucPham = (props) => {

    const {
        isVisiableList,
        isVisiableSearch,
        isVisiableForm,
        pageKey,
        handleBack,
        handleCreate,
        handleDelete,
        handleSearch
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        const objectUpdate = {
            key: actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_UPDATE,
            hidden: true
        }
        const objectList = {
            key: actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_LIST,
            hidden: true
        }
        var arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(objectUpdate);
        arrAction.push(objectList);
        setAction(arrAction);
    }, [isVisiableList, isVisiableSearch, () => mainGetItemSelected(rows_selected, pageKey)]);

    const mainGetItemSelected = (rows_selected, pageKey) => main.getItemSelected(rows_selected, pageKey);

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    };

    const renderActionDelete = () => {
        let result = {};
        const selected = mainGetItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_DELETE;
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
        result.key = actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_SEARCH;
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
            {isVisiableForm && <LoaiThucPhamForm  {...props} />}
            {isVisiableList && <LoaiThucPhamList {...props} />}
        </React.Fragment>
    );
}

export default LoaiThucPham;