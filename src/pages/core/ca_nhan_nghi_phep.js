import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CaNhanNghiPhepComponent from "./../../components/core/account_current/ca_nhan_nghi_phep/ca_nhan_nghi_phep";
import * as pageKeys from "../../constants/page_key";
import * as actID from "../../constants/action_id";
import * as act from "./../../actions/index";
import * as constants from './../../constants/constants';
import * as api from "./../../util/api_call";
import * as apiUrl from "./../../constants/api";

const CaNhanNghiPhep = ({ ...props }) => {

    const [pageKey] = useState(pageKeys.PAGE_KEY_THONG_TIN_NGHI_PHEP);
    const [isVisiableForm, setIsVisiableForm] = useState(false);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [dataSearch, setDataSearch] = useState({ nam: 2020 });
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const [itemUpdate, setItemUpdate] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        const delAllAct = renderActionCreate();
        setAction([{ ...delAllAct }]);
    }, [permission_priviliged, isVisiableForm])

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.type = isVisiableForm ? constants.CONST_TYPE_BTN_DEFAULT : constants.CONST_TYPE_BTN_CREATE;
        result.text = isVisiableForm ? "Quay lại" : "Thêm mới";
        result.handleClick = isVisiableForm ? () => {
            setIsVisiableForm(false);
            setIsVisiableList(true);
            setItemUpdate({});
        } : onCreate;
        result.iconClass = `fa fa-${isVisiableForm ? "reply" : "plus"} m-r-10`;
        return result;
    };

    const renderActionThemMoi = () => {
        setItemUpdate({});
        setIsVisiableForm(false);
        setIsVisiableList(true);
    };

    const onEdit = (item) => {
        setItemUpdate(item);
        setIsVisiableForm(true);
        setIsVisiableList(false);
    }

    const onDelete = async (nghiPhep, callback) => {
        const res = await api.del({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data: [nghiPhep.id] });
        if (callback && typeof callback === "function") {
            callback(res.status);
        }
    }

    const onCreate = () => {
        setIsVisiableForm(true);
        setIsVisiableList(false);
    };

    return <Fragment>
        <CaNhanNghiPhepComponent
            {...props}
            itemUpdate={itemUpdate}
            onEdit={onEdit}
            onDelete={onDelete}
            pageKey={pageKey}
            renderActionThemMoi={renderActionThemMoi}
            isVisiableForm={isVisiableForm}
            isVisiableList={isVisiableList}
            dataSearch={dataSearch}
            handleChangeDataSearch={handleChangeDataSearch}
        />
    </Fragment>
}

export default CaNhanNghiPhep;