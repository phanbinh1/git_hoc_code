import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThongBaoCongBoSanPhamList from "./thong_bao_cong_bo_san_pham_list";
import ThongBaoCongBoSanPhamForm from "./thong_bao_cong_bo_san_pham_form";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";

const ThongBaoCongBoSanPham = ({ ...props }) => {
    const {
        isVisiableForm,
        isVisiableList,
        isVisiableSearch,
        isVisibleUpdateList,
        pageKey,
        handleCreate,
        handleDelete,
        handleSearch,
        handleBack,
        history,
        queryVariable,
        onSelectRow,
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        onSetAction();
    }, [isVisiableList, isVisiableSearch, isVisibleUpdateList, main.getItemSelected(rows_selected, pageKey)])

    useEffect(() => {
        if (isVisibleUpdateList) {
            if (queryVariable.ke_hoach_id && !isNaN(queryVariable.ke_hoach_id) && !isNaN(parseInt(queryVariable.ke_hoach_id, 0))) {
                const arrIdStr = queryVariable.arr_id ? queryVariable.arr_id : "";
                const arrId = arrIdStr.split(",");
                let _arrId = [];
                arrId.map((idStr) => {
                    if (!isNaN(idStr) && !isNaN(parseInt(idStr, 0))) {
                        _arrId.push(parseInt(idStr, 0));
                    }
                    return null;
                })
                onSelectRow(_arrId);
            }
            else {
                history.go(-1);
            }
        }
    }, [isVisibleUpdateList])

    const onSetAction = () => {
        let arrAction = [
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH,
                hidden: true
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE,
                hidden: true
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_DELETE,
                hidden: true
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_THONGBAOCONGBO,
                hidden: true
            },
        ];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        setAction(arrAction);
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        const selected = main.getItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_DELETE;
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
        result.key = actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_SEARCH;
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
        result.handleClick = isVisibleUpdateList ? () => history.go(-1) : handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableForm && <ThongBaoCongBoSanPhamForm  {...props} />}
            {(isVisiableList || isVisibleUpdateList) && <ThongBaoCongBoSanPhamList {...props} />}
        </React.Fragment>
    );
}

export default ThongBaoCongBoSanPham;