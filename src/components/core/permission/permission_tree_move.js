import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tree, Checkbox, Button, Spin } from 'antd';
import _ from 'lodash';
import * as actPermission from "./../../../actions/core/permission";
import * as constants from "./../../../constants/constants";
import * as message from "./../../../constants/message";
import * as main from "./../../../constants/main";
import { useHistory, useLocation } from 'react-router';

const PermissionTreeMove = ({
    permissionMove,
    handleClose
}) => {

    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);

    const [idParent, setIdParent] = useState(permissionMove.idParent);
    const [isLoading, setIsLoading] = useState(false);

    const permission_menu = useSelector(state => state.core.permission.permission_menu);
    const dispatch = useDispatch();
    const getPermissionMenuRequest = (handleLoadSuccess) => dispatch(actPermission.getPermissionMenuRequest(handleLoadSuccess));

    const updateRequest = (object = {}) => dispatch(actPermission.updateRequest(object));
    const getMenuLeftRequest = () => dispatch(actPermission.getMenuLeftRequest());

    const renderContent = (list) => {
        return _.orderBy(list, ['sort'], ['asc']).map((item) => {
            if (item.type === constants.CONST_PERMISSION_TYPE_URL && item.id !== permissionMove.id) {
                return <Tree.TreeNode
                    title={
                        <span>
                            <Checkbox
                                className="m-r-10 checkbox-success"
                                checked={idParent === item.id ? true : false}
                                onChange={() => setIdParent(item.id)}
                            />
                            {item.name}
                        </span>
                    }
                    key={item.id}
                >
                    {(Array.isArray(item.children) && item.children.length) > 0 && renderContent(item.children)}
                </Tree.TreeNode>;
            }
            else {
                return null;
            }
        })
    };


    const handleSelect = (selectedKey) => {
        // var parentId = parseInt(selectedKey, 0);
        // handleChangeIdParent(parentId);
    }

    const onMove = () => {
        setIsLoading(true);
        if (isNaN(idParent)) {
            message.error({ content: "Vui lòng chọn quyền để di chuyển đến!" });
            setIsLoading(false)
        }
        else {
            updateRequest({
                data: { ...permissionMove, idParent },
                requestSuccess: handleUpdateSuccess,
                requestError: handleUpdateFail
            });
        }
    }

    const handleUpdateSuccess = () => {
        setIsLoading(false);
        history.push({
            search: main.queryString.stringify({ ...qs, permission_active_id: idParent })
        });
        getMenuLeftRequest();
        getPermissionMenuRequest();
        handleClose();
    };

    const handleUpdateFail = () => {
        setIsLoading(false);
    }

    return <Fragment>
        <Spin spinning={isLoading}>
            <Tree.DirectoryTree
                onSelect={handleSelect}
                defaultExpandedKeys={["0"]}
                expandAction="doubleClick"
                className="tree-node-custom"
            >
                <Tree.TreeNode
                    title={<Fragment>
                        <Checkbox className="m-r-10" checked={idParent === 0} onChange={() => setIdParent(0)} />Quyền</Fragment>}
                    key={0}
                >
                    {renderContent(permission_menu)}
                </Tree.TreeNode>
            </Tree.DirectoryTree>
            <Button
                type="success"
                block
                onClick={onMove}
                loading={isLoading}
                className="m-t-10 m-b-10"
            >
                <i className="fa fa-save m-r-10" />Xác nhận
            </Button>
        </Spin>
    </Fragment>
}

export default PermissionTreeMove;