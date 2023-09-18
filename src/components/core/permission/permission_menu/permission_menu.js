import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tree, Skeleton } from 'antd';
import { Resizable } from 'react-resizable';
import ScrollArea from "react-perfect-scrollbar";
import * as actPermission from "./../../../../actions/core/permission";
import * as main from "./../../../../constants/main";
import * as notification from "./../../../../constants/notification";
import _ from 'lodash';
import * as actID from '../../../../constants/action_id';

const PermissionMenu = ({
    queryVariable,
    history,
    location,
    dataLoading,
    onResize,
    width
}) => {

    const idParent = (queryVariable && queryVariable.permission_active_id) ? parseInt(queryVariable.permission_active_id, 0) : 0;

    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

    const permission_menu = useSelector(state => state.core.permission.permission_menu);

    const dispatch = useDispatch();
    const getMenuPermissionRequest = (object = {}) => dispatch(actPermission.getPermissionMenuRequest(object));

    useEffect(() => {
        getMenuPermissionRequest({
            requestSuccess: () => { setIsLoadingSkeleton(false) },
            requestError: () => { setIsLoadingSkeleton(false) }
        })
    }, [])

    const findPermissionById = (list, id, result = null) => {
        list.map((item) => {
            if (item.id === id) {
                return result = item;
            }
            else {
                return result = findPermissionById(item.children, id, result);
            }
        });
        return result;
    };

    const renderContent = (list) => {
        return _.orderBy(list, ['sort'], ['asc']).map((item) => {
            var icon = item.type === 1 ? <i className="fa fa-link" /> : <i className="fa fa-pencil-square-o" />;
            return <Tree.TreeNode
                title={item.name}
                key={item.id}
                icon={icon}
            >
                {item.children.length > 0 && renderContent(item.children)}
            </Tree.TreeNode>;
        })
    };

    const onSelect = (selectedKey) => {
        const parentId = parseInt(selectedKey, 0);
        const permission = findPermissionById(permission_menu, parentId);
        if (permission !== null && permission.type === 2) {
            const msgContent = <span >
                Quyền này thuộc loại <b><i><u>Thao tác</u></i></b> nên không thể chứa quyền bên trong nó.<br />
                Nếu muốn bạn có thể cập nhật lại loại quyền này thành
                <b onClick={() => {
                    history.push(main.formatUrl({
                        pathname: location.pathname,
                        objSearch: {
                            ...queryVariable,
                            id: permission.id,
                            permission_active_id: permission.idParent,
                            action: actID.ACT_ID_PERMISSION.ACT_UPDATE
                        }
                    }))
                    notification.close("PERMISSION_NOTIFI_UNABLE_TO_EXCUTE");
                }} style={{ cursor: "pointer" }}> <i> <u>
                    Đường dẫn
                </u> </i> </b>
            </span>
            notification.warning({
                content: msgContent,
                key: "PERMISSION_NOTIFI_UNABLE_TO_EXCUTE",
                duration: 5
            });
        }
        else if (idParent !== parentId) {
            history.push(main.formatUrl({
                pathname: location.pathname,
                objSearch: {
                    ...queryVariable,
                    permission_active_id: parentId,
                    action: actID.ACT_ID_PERMISSION.ACT_LIST
                }
            }));
        }
    }

    const onExpand = (expandedKeys) => {
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                permission_expanded_keys: expandedKeys.toString()
            }
        }));
    }

    const getExpandedKeys = () => {
        if (queryVariable && queryVariable.permission_expanded_keys) {
            return queryVariable.permission_expanded_keys.split(",");
        }
        else {
            return ["0"];
        }
    };

    return (
        <React.Fragment>
            <Resizable
                className="permission-menu-resize-wrapper"
                width={width}
                height={0}
                onResize={onResize}
            >
                <ScrollArea
                    className="scroll-area-permission-menu"
                    style={{
                        minHeight: "calc(100vh - 103px)",
                        height: "100%",
                        width: width,
                        float: "left",
                        padding: 0,
                        position: "relative",
                        background: "#f5f5f5"
                    }}
                >
                    <Skeleton loading={isLoadingSkeleton} active paragraph={{ rows: 5 }} >
                        <Tree.DirectoryTree
                            style={{ width: "auto", height: "100%" }}
                            multiple
                            onSelect={onSelect}
                            onExpand={onExpand}
                            expandedKeys={getExpandedKeys()}
                            selectedKeys={[`${idParent}`]}
                            expandAction="doubleClick"
                            className="tree-node-custom"
                            disabled={dataLoading}
                        >
                            <Tree.TreeNode title="Danh sách quyền" key={0}>
                                {renderContent(permission_menu)}
                            </Tree.TreeNode>
                        </Tree.DirectoryTree>
                    </Skeleton>
                </ScrollArea>
            </Resizable>
        </React.Fragment >
    );
}


export default PermissionMenu;