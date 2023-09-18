import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DotKiemTraList from "./dot_kiem_tra_list";
import DotKiemTraForm from "./dot_kiem_tra_form";
import ChiTieuGiamSat from "./dot_kiem_tra_chi_tiet_mau";
import * as act from "../../../../actions/index";
import * as actID from "../../../../constants/action_id";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";

const DotKiemTra = (props) => {

    const {
        isVisiableList,
        isVisiableSearch,
        isVisiableForm,
        pageKey,
        handleBack,
        handleCreate,
        handleDelete,
        handleSearch,
        isVisiableChiTietMau,
        setIsVisiableChiTietMau
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        const objectUpdate = {
            key: actID.ACT_ID_DOT_KIEM_TRA.ACT_UPDATE,
            hidden: true
        }
        const objectList = {
            key: actID.ACT_ID_DOT_KIEM_TRA.ACT_LIST,
            hidden: true
        }
        const objectCTGSCreate = {
            key: actID.ACT_ID_DOT_KIEM_TRA.ACT_CHI_TIEU_GIAM_SAT_CREATE,
            hidden: true
        }
        const objectCTGSDelete = {
            key: actID.ACT_ID_DOT_KIEM_TRA.ACT_CHI_TIEU_GIAM_SAT_DELETE,
            hidden: true
        }

        var arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(objectUpdate);
        arrAction.push(objectList);
        arrAction.push(objectCTGSCreate);
        arrAction.push(objectCTGSDelete);
        setAction(arrAction);
    }, [isVisiableList, isVisiableSearch, () => mainGetItemSelected(rows_selected, pageKey)]);

    const mainGetItemSelected = (rows_selected, pageKey) => main.getItemSelected(rows_selected, pageKey);

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_DOT_KIEM_TRA.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    };

    const renderActionDelete = () => {
        let result = {};
        const selected = mainGetItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_DOT_KIEM_TRA.ACT_DELETE;
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
        result.key = actID.ACT_ID_DOT_KIEM_TRA.ACT_SEARCH;
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
            <ChiTieuGiamSat
                de
                visible={isVisiableChiTietMau}
                onClose={() => setIsVisiableChiTietMau(false)}
            />
            {isVisiableForm && <DotKiemTraForm  {...props} />}
            {isVisiableList && <DotKiemTraList {...props} />}
        </React.Fragment>
    );
}

export default DotKiemTra;