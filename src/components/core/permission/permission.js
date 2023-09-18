import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from "antd";
import PermissionMenu from "./permission_menu";
import PermissionList from "./permission_list";
import PermissionForm from "./permission_form";
import * as act from "./../../../actions/index";
import * as actPermission from "./../../../actions/core/permission";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";

const Permission = (props) => {
    const {
        isVisiableList,
        isVisiableForm,
        pageKey,
        handleCreate,
        handleDelete,
        handleBack,
        queryVariable
    } = props;

    const [width, setWidth] = useState(300);
    const rows_selected = useSelector(state => state.core.rows_selected);
    const priviliged = useSelector(state => state.core.permission.priviliged);
    const permission_list = useSelector(state => state.core.permission.list);
    const selected = main.getItemSelected(rows_selected, pageKey);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const updatesRequest = (data) => dispatch(actPermission.updatesRequest(data));

    useEffect(() => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(renderActionUpdate());
        setAction(arrAction);
    }, [
        isVisiableList,
        main.getItemSelected(rows_selected, pageKey),
        priviliged
    ])

    const onResize = (e, { size }) => {
        setWidth(size.width);
    }

    const renderActionUpdate = () => {
        const data = permission_list.filter(item => selected.findIndex(id => id === item.id) >= 0);

        const hides = data.filter(item => item.isMobile === 1);
        const shows = data.filter(item => item.isMobile !== 1);

        const onClick = (list) => {
            updatesRequest({
                data: list.map(item => {
                    if (!item.menuLeft && item.type === constants.CONST_PERMISSION_TYPE_URL) {
                        item.type = constants.CONST_PERMISSION_TYPE_URL_HIDDEN;
                    }
                    if (item.hiddenAction && item.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                        item.type = constants.CONST_PERMISSION_TYPE_ACTION_HIDDEN;
                    }
                    item.isMobile = item.isMobile ? 0 : 1;
                    return item;
                })
            })
        }

        const onMouseEnter = (list) => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            let i = 0;
            trs.forEach(tr => {
                if (list.findIndex(item => `${item.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    i === 0 && tr.scrollIntoView();
                    i++;
                    tr.classList.add("row-active")
                }
            })
        }

        const onMouseLeave = (list) => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            trs.forEach(tr => {
                if (list.findIndex(item => `${item.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    tr.classList.remove("row-active")
                }
            })
        }

        let result = {};
        result.key = actID.ACT_ID_PERMISSION.ACT_VIEW_MOBILE;
        result.disabled = selected.length <= 0;
        result.type = constants.CONST_TYPE_BTN_EDIT;
        result.hidden = !isVisiableList;
        result.dropdown = {
            overlay: <Menu mode="vertical">
                <Menu.Item onMouseEnter={() => onMouseEnter(shows)} onMouseLeave={() => onMouseLeave(shows)} onMouseL disabled={shows.length === 0} onClick={() => onClick(shows)} ><i className="fa fa-eye m-r-5" /> ({shows.length})  Hiển thị</Menu.Item>
                <Menu.Item onMouseEnter={() => onMouseEnter(hides)} onMouseLeave={() => onMouseLeave(hides)} disabled={hides.length === 0} onClick={() => onClick(hides)} ><i className="fa fa-eye-slash m-r-5" /> ({hides.length}) Ẩn</Menu.Item>
            </Menu>,
        }
        return result;
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_PERMISSION.ACT_CREATE;
        result.disabled = false;
        result.hidden = isVisiableList ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    };

    const renderActionDelete = () => {
        let result = {};
        result.key = actID.ACT_ID_PERMISSION.ACT_DELETE;
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

    const renderActionBack = () => {
        var result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = !isVisiableList ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    };
    return (
        <React.Fragment>
            <PermissionMenu {...props} width={width} setWidth={setWidth} onResize={onResize} />
            {isVisiableList && <PermissionList {...props} width={width} />}
            {isVisiableForm && <PermissionForm
                key={queryVariable.id ? queryVariable.id : "create"}
                {...props}
                width={width}
            />}
        </React.Fragment>
    );
}

export default Permission;