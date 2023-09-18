import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeHoachThamDinhList from "./ke_hoach_tham_dinh_list";
import KeHoachThamDinhForm from "./ke_hoach_tham_dinh_form";
import KeHoachThamDinhHoSoList from './ke_hoach_tham_dinh_ho_so_list';
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as url from "./../../../../constants/url";

const KeHoachThamDinh = (props) => {
    const {
        isVisiableForm,
        isVisiableList,
        isVisiableSearch,
        isVisiableReport,
        isVisiableHoSoList,
        pageKey,
        handleCreate,
        handleDelete,
        handleSearch,
        getSelection,
        handleConfirm,
        handleNotConfirm,
        handleBack,
        history
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);
    const ke_hoach_tham_dinh = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ke_hoach_tham_dinh.item);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    };

    useEffect(() => {
        onSetAction();
    }, [
        isVisiableList,
        isVisiableHoSoList,
        isVisiableSearch,
        isVisiableReport,
        main.getItemSelected(rows_selected, pageKey),
        main.getItemSelected(rows_selected, `${pageKey}_HO_SO`),
        (ke_hoach_tham_dinh && ke_hoach_tham_dinh.trangThaiPheDuyet),
        (ke_hoach_tham_dinh && ke_hoach_tham_dinh.ho_so_tham_dinh_list)
    ])

    const onSetAction = () => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(renderActionHoSoCreate());
        arrAction.push(renderActionConfirm());
        arrAction.push(renderActionNotConfirm());
        setAction(arrAction);
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch && !isVisiableReport) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionHoSoCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_HOSO_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableHoSoList && !isVisiableSearch)
            && (ke_hoach_tham_dinh && (ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DANGHOANTHIEN || ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.CHOPHEDUYET)) ? false : true;
        result.handleClick = () => {
            const listId = ke_hoach_tham_dinh && ke_hoach_tham_dinh.ho_so_tham_dinh_list ? ke_hoach_tham_dinh.ho_so_tham_dinh_list.map(item => item.id) : [];
            const href = main.formatUrl({
                pathname: url.URL_HO_SO_CHUOI_THUC_PHAM,
                objSearch: {
                    action: actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_KE_HOACH_UPDATE_LIST,
                    arr_id: listId,
                    ke_hoach_id: ke_hoach_tham_dinh.id
                }
            })
            history.push(href);
        };
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        const selected = main.getItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_DELETE;
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
        result.key = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_SEARCH;
        result.disabled = false;
        result.hidden = !(isVisiableList && !isVisiableSearch) || isVisiableReport;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionConfirm = () => {
        var result = {};
        var selected = main.getItemSelected(rows_selected, pageKey);
        var cnt = getSelection(selected).length;
        result.key = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_CONFIRM;
        result.disabled = cnt > 0 ? false : true;
        result.hidden = !(isVisiableList && !isVisiableSearch);
        result.handleClick = handleConfirm;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        result.isConfirm = true;
        result.confirmTitle = "Bạn chắc chắn muốn Phê duyệt?"
        result.confirmOkText = "Đồng ý"
        result.confirmOkType = "danger"
        result.confirmCancelText = "Hủy"
        result.text = `Phê duyệt ${cnt > 0 ? `(${cnt})` : ""}`;
        return result;
    };

    const renderActionNotConfirm = () => {
        var result = {};
        var selected = main.getItemSelected(rows_selected, pageKey);
        var cnt = getSelection(selected, false).length;
        result.key = actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_NOTCONFIRM;
        result.disabled = cnt > 0 ? false : true;
        result.hidden = !(isVisiableList && !isVisiableSearch);
        result.handleClick = handleNotConfirm;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.isConfirm = true;
        result.confirmTitle = "Bạn chắc chắn muốn Không phê duyệt?"
        result.confirmOkText = "Đồng ý"
        result.confirmOkType = "danger"
        result.confirmCancelText = "Hủy"
        result.text = `Không phê duyệt ${cnt > 0 ? `(${cnt})` : ""}`;
        return result;
    };

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList || isVisiableSearch || isVisiableReport) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableForm && <KeHoachThamDinhForm  {...props} />}
            {isVisiableList && <KeHoachThamDinhList {...props} />}
            {isVisiableHoSoList && <KeHoachThamDinhHoSoList {...props} />}
        </React.Fragment>
    );
}

export default KeHoachThamDinh;