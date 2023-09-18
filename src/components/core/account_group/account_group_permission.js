import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tree, Button, Popover } from "antd";
import ScrollArea from "react-perfect-scrollbar";
import _ from 'lodash';
import * as actAccountGroup from "./../../../actions/core/account_group";
import * as actPermission from "./../../../actions/core/permission";
import * as constants from "./../../../constants/constants";
import * as message from "./../../../constants/message";

const AccountGroupPermission = ({
    handleBack,
    setAction,
    handleCancelSharePermission,
    isLoading,
    setIsLoading
}) => {
    const [listKey, setListKey] = useState([]);
    const [listInit, setListInit] = useState([]);

    const [expandedKeys, setExpandedKeys] = useState(["0"]);

    const account_group_permissions = useSelector(state => state.core.account_group.permissions);
    const permission_menu = useSelector(state => state.core.permission.permission_menu);

    const dispatch = useDispatch();
    const updatePermissionAccountGroupRequest = (object = {}) => dispatch(actAccountGroup.updatePermissionAccountGroupRequest(object));
    const getMenuLeftRequest = (object = {}) => dispatch(actPermission.getMenuLeftRequest(object));

    useEffect(() => {
        let _listKey = [];
        account_group_permissions.systemPermissions.map((item) => {
            return _listKey.push(`${item.id}`);
        });
        if (isCheckAll()) {
            _listKey.indexOf("0") === -1 && _listKey.push("0")
        }
        else {
            _listKey.indexOf("0") !== -1 && _listKey.splice(_listKey.indexOf("0"), 1);
        }
        setListKey(_listKey);
        setListInit(_listKey);
    }, [account_group_permissions.systemPermissions]);

    useEffect(() => {

    }, [])

    useEffect(() => {
        let _expandedKeys = [];
        expandedKeys.map((key) => {
            if (key !== "0" && listKey.indexOf(key) === -1) {
                return null;
            }
            else {
                return _expandedKeys.push(key);
            }
        })
        setExpandedKeys(_expandedKeys);
    }, [listKey])

    const isCheckAll = () => {
        let isAll = true;
        const allKey = getAllKey(permission_menu, []);
        const keyOfGroup = account_group_permissions.systemPermissions;
        allKey.map((key) => {
            if ((keyOfGroup || []).findIndex(item => `${item.id}` === `${key}`) === -1) {
                isAll = false;
            }
            return null;
        });
        return isAll;
    };

    const handleOnCheck = (checkedKeys, e) => {
        const { checked } = checkedKeys;
        if (listKey.indexOf("0") !== -1 && checked.indexOf("0") === -1) { //un check all
            setListKey([]);
        }
        else if (listKey.indexOf("0") === -1 && checked.indexOf("0") !== -1) { //check all
            setListKey([...getAllKey(permission_menu, []), "0"]);
        }
        else { // check item
            setListKey(checked);
        }
    };

    const getAllKey = (list, result = []) => {
        list.map((item) => {
            if (item.children.length > 0) {
                result.push(`${item.id}`);
                return getAllKey(item.children, result);
            }
            else {
                return result.push(`${item.id}`);
            }
        })
        return result;
    };

    const handleSubmit = () => {
        setIsLoading(true);
        const systemPermissions = listKey
            .filter(item => !(isNaN(parseInt(item, 0)) || parseInt(item, 0) === 0))
            .map((item) => ({ id: parseInt(item, 0) }))
        const data = {
            ...account_group_permissions,
            systemPermissions,
            isEnable: account_group_permissions.isEnable ? 1 : 0
        }
        updatePermissionAccountGroupRequest({
            data,
            requestSuccess: () => {
                handleUpdateSuccess();
            },
            requestError: () => {
                handleUpdateFail();
            }
        });
    }

    const handleUpdateSuccess = () => {
        setIsLoading(false);
        handleBack();
        getMenuLeftRequest({
            requestSuccess: () => {
                setAction();
                handleCancelSharePermission();
            },
            requestError: () => {
            }
        });
    };

    const handleUpdateFail = () => {
        setIsLoading(false);
    };

    const handleReset = () => setListKey(listInit);

    const renderContent = (list) => {
        let permissionDefault = [];
        if (constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.indexOf(account_group_permissions.groupCode) === -1) {
            permissionDefault = constants.CONST_LIST_PERMISSION_DEFAULT;
        }
        return _.orderBy(list, ['sort'], ['asc']).map((item) => {
            if (permissionDefault.indexOf(item.permission) === -1) {
                return <Tree.TreeNode
                    icon={<Popover title="Chú thích" content={item.note}>
                        <i className="fa fa-question-circle-o m-r-5 m-l-5 group-permission-note" />
                    </Popover>}
                    className="group-permission-item"
                    title={item.name}
                    key={`${item.id}`}
                >
                    {item.children.length > 0 && renderContent(item.children)}
                </Tree.TreeNode>;
            }
            else {
                return null;
            }
        })
    };

    const onExpand = (expandedKeys) => {
        var invalid = false;
        expandedKeys.map((key) => {
            if (listKey.indexOf(key) === -1 && key !== "0") {
                invalid = true;
            }
            return null
        });
        if (!invalid) {
            setExpandedKeys(expandedKeys);
        }
        else {
            message.warning({
                content: "Quyền này không được cho phép nên không thể phân quyền bên trong!",
                key: "NOT_UPDATE"
            });
        }
    }

    const selectAllChild = ({ node }) => {
        let list = [...listKey];
        let check;
        if (list.indexOf(node.props.eventKey) === -1) {
            list = [...list, node.props.eventKey];
            check = true;
        }
        else {
            const index = list.indexOf(node.props.eventKey)
            list.splice(index, 1);
            check = false;
        }
        list = onCheck(
            node.props.children && Array.isArray(node.props.children) ? node.props.children : [],
            [...list],
            check
        );
        setListKey(list);
    }

    const onCheck = (listPermission, list, check = true) => {
        listPermission.map((item) => {
            if (item) {
                if (check) {
                    if (list.indexOf(item.key) === -1) {
                        list = [...list, item.key];
                    }
                }
                else {
                    if (list.indexOf(item.key) !== -1) {
                        list.splice(list.indexOf(item.key), 1);
                    }
                }
                list = onCheck(
                    item.props.children && Array.isArray(item.props.children) ? item.props.children : [],
                    [...list],
                    check
                );
            }
            return list
        })
        return list;
    }

    return (
        <React.Fragment>
            <div className="row" >
                <ScrollArea
                    style={{
                        minHeight: "calc(100vh - 140px)",
                        maxHeight: "calc(100vh - 140px)",
                        height: "100%",
                        width: "100%",
                        float: "left",
                        padding: 0,
                        position: "relative"
                    }}
                >
                    <Tree.DirectoryTree
                        expandedKeys={expandedKeys}
                        onExpand={onExpand}
                        checkedKeys={listKey}
                        expandAction="doubleClick"
                        checkable
                        autoExpandParent={true}
                        checkStrictly={true}
                        onCheck={handleOnCheck}
                        className="tree-node-custom"
                        disabled={isLoading}
                        onRightClick={selectAllChild}
                    >
                        <Tree.TreeNode
                            title={<span> Chọn tất cả </span>}
                            key="0"
                        >
                            {renderContent(permission_menu)}
                        </Tree.TreeNode>
                    </Tree.DirectoryTree>
                </ScrollArea>
            </div>
            <div className="row" style={{ margin: "15px" }}>
                <div className="col-md-6">
                    <Button
                        block
                        onClick={handleSubmit}
                        loading={isLoading}
                        disabled={isLoading}
                        type={constants.CONST_TYPE_BTN_SUBMIT}
                    >
                        <i className="fa fa-save m-r-10" />
                        Cập nhật
                    </Button>
                </div>
                <div className="col-md-6">
                    <Button
                        block
                        onClick={handleReset}
                        loading={isLoading}
                        disabled={isLoading}
                        type={constants.CONST_TYPE_BTN_CANCEL}
                    >
                        <i className="fa fa-refresh m-r-10" />
                        Làm mới
                    </Button>
                </div>
            </div>
        </React.Fragment >
    );
}

export default AccountGroupPermission;
