import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HoSoChuoiThucPhamList from "./ho_so_chuoi_thuc_pham_list";
import HoSoChuoiThucPhamForm from "./ho_so_chuoi_thuc_pham_form";
import * as act from "./../../../../actions/index";
import * as actKeHoach from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";

const HoSoChuoiThucPham = (props) => {

    const {
        isVisiableForm,
        isVisiableList,
        isVisiableSearch,
        isVisiableReport,
        pageKey,
        handleCreate,
        handleDelete,
        handleSearch,
        allowUpdateList,
        handleBack,
        queryVariable,
        history,
        onSelectRow
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);
    const selected = main.getItemSelected(rows_selected, pageKey);
    const dispatch = useDispatch();
    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    };
    const updateListCoSo = (object = {}) => dispatch(actKeHoach.updateListCoSo(object));

    useEffect(() => {
        if (allowUpdateList) {
            if (queryVariable.hasOwnProperty("arr_id") && queryVariable.ke_hoach_id) {
                const arrIdStr = queryVariable.arr_id.split(",");
                let arrId = [];
                arrIdStr.map((idStr) => {
                    if (idStr && !isNaN(idStr.trim())) {
                        arrId.push(parseInt(idStr.trim(), 0));
                    }
                    return null;
                })
                onSelectRow(arrId);
            }
            else {
                history.go(-1);
            }
        }
    }, [allowUpdateList]);

    useEffect(() => {
        onSetAction();
    }, [
        isVisiableList,
        isVisiableSearch,
        isVisiableReport,
        allowUpdateList,
        selected
    ]);

    const updateListHoSo_KeHoach = () => {
        updateListCoSo({
            data: {
                idKeHoach: parseInt(queryVariable.ke_hoach_id, 0),
                hoSoCapGiayChungNhanIds: selected
            },
            requestSuccess: () => {
                history.go(-1);
            }
        })
    }

    const onSetAction = () => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(renderActionUpdateList());
        setAction(arrAction);
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch && !isVisiableReport) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_DELETE;
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
        result.key = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_SEARCH;
        result.disabled = false;
        result.hidden = !(isVisiableList && !isVisiableSearch) || isVisiableReport;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionUpdateList = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_KE_HOACH_UPDATE_LIST;
        result.disabled = false;
        result.hidden = !allowUpdateList;
        result.handleClick = updateListHoSo_KeHoach;
        result.type = constants.CONST_TYPE_BTN_SUBMIT;
        result.text = "Cập nhật";
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList || isVisiableSearch || isVisiableReport) ? false : !allowUpdateList ? true : false;
        result.handleClick = allowUpdateList ? () => history.go(-1) : handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableForm && <HoSoChuoiThucPhamForm handleBack={handleBack} />}
            {(isVisiableList || allowUpdateList) && <HoSoChuoiThucPhamList {...props} />}
        </React.Fragment>
    );
}

export default HoSoChuoiThucPham;