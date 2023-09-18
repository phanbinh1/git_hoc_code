import React, { useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoSoQuanHuyenList from "./quan_huyen_list";
import * as act from "../../../../actions/index";
import * as actID from "../../../../constants/action_id";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";

const CoSoQuanHuyen = (props) => {

    const {
        isVisiableList,
        isVisiableSearch,
        pageKey,
        handleBack,
        handleSearch
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        var arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        setAction(arrAction);
    }, [isVisiableList, isVisiableSearch, () => mainGetItemSelected(rows_selected, pageKey)]);

    const mainGetItemSelected = (rows_selected, pageKey) => main.getItemSelected(rows_selected, pageKey);
    const renderActionSearch = () => {
        let result = {};
        result.key = actID.ACT_ID_CSSXKD_QUAN_HUYEN.ACT_SEARCH;
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
            {isVisiableList && <CoSoQuanHuyenList {...props} />}
        </React.Fragment>
    );
}

export default CoSoQuanHuyen;