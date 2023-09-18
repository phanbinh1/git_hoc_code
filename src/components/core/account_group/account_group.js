import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Popover, Badge } from "antd";
import AccountGroupForm from "./account_group_form";
import AccountGroupList from "./account_group_list";
import AccountGroupPermission from "./account_group_permission";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";

const AccountGroup = (props) => {
    const {
        pageKey,
        accountGroupCode,
        isVisiableForm,
        isVisiableList,
        isVisiableSearch,
        isVisiablePermissions,
        handleCreate,
        handleDelete,
        handleSearch,
        handleBack,
        handleCancelSharePermission
    } = props;

    const rows_selected = useSelector(state => state.core.rows_selected);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        onSetAction();
    }, [isVisiableList, isVisiableSearch, main.getItemSelected(rows_selected, pageKey), main.getItemSelected(rows_selected, pageKey).length])
    const onSetAction = () => {
        var arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        setAction(arrAction);
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_ACCOUNT_GROUP.ACT_CREATE;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableSearch) ? false : true;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        result.key = actID.ACT_ID_ACCOUNT_GROUP.ACT_DELETE;
        result.disabled = main.getItemSelected(rows_selected, pageKey).length > 0 ? false : true;
        result.hidden = isVisiableList ? false : true;
        result.handleClick = handleDelete;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.isConfirm = true;
        result.confirmTitle = "Bạn chắc chắn muốn xóa"
        result.confirmOkText = "Đồng ý"
        result.confirmOkType = "danger"
        result.confirmCancelText = "Hủy"
        result.text = `Xóa ${main.getItemSelected(rows_selected, pageKey).length > 0 ? `(${main.getItemSelected(rows_selected, pageKey).length})` : ""}`;
        return result;
    };

    const renderActionSearch = () => {
        let result = {};
        result.key = actID.ACT_ID_ACCOUNT_GROUP.ACT_SEARCH;
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
    };

    return (
        <React.Fragment>
            {isVisiableForm && <AccountGroupForm {...props} />}
            {isVisiableList && <AccountGroupList {...props} />}
            <Drawer
                title={<React.Fragment>
                    PHÂN QUYỀN NGƯỜI DÙNG"
                    <Popover
                        overlayClassName="popover-tutorial-overlay danger"
                        content={<React.Fragment>
                            *** Nhấp chuột phải vào tên quyền <br />
                            để có thể chọn/bỏ chọn tất cả các quyền bên trong
                        </React.Fragment>}
                        placement="left"
                    >
                        <Badge color="red" status="processing" className="m-l-10 c-pointer" />
                    </Popover>
                </React.Fragment>}
                placement="right"
                width={400}
                onClose={handleCancelSharePermission}
                visible={isVisiablePermissions}
                maskClosable={false}
                destroyOnClose={true}
                closable={!isLoading}
            >
                <AccountGroupPermission
                    {...props}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    key={accountGroupCode}
                    accountGroupCode={accountGroupCode}
                    setAction={onSetAction}
                />
            </Drawer>
        </React.Fragment >
    );
}

export default AccountGroup;