import React from 'react';
import { useSelector } from 'react-redux';
import { Tree, Skeleton } from 'antd';
import { Resizable } from 'react-resizable';
import ScrollArea from "react-perfect-scrollbar";
import * as main from "./../../../../constants/main";
import _ from 'lodash';
import * as actID from '../../../../constants/action_id';

const Menu = ({
    queryVariable,
    history,
    location,
    dataLoading,
    onResize,
    width,
    isLoadingSkeleton,
}) => {
    const idParent = (queryVariable && queryVariable.active_id) ? parseInt(queryVariable.active_id, 0) : 0;
    const menuData = useSelector(state => state.app.quan_ly_danh_muc_danh_gia_hang_sao.danhmuctieuchi.menu);

    const findPermissionById = (list, id, result = null) => {
        list.map((item) => {
            if (item.danhMucTieuChi.id === id) {
                return result = item;
            }
            else {
                return result = findPermissionById(item.childs, id, result);
            }
        });
        return result;
    };

    const renderContent = (list) => {
        return _.orderBy(list, ['sort'], ['asc']).map((item) => {
            var icon = item.type === 1 ? <i className="fa fa-link" /> : <i className="fa fa-pencil-square-o" />;
            return <Tree.TreeNode
                title={<span>{item.danhMucTieuChi.stt}. {item.danhMucTieuChi.noiDung}</span>}
                key={item.danhMucTieuChi.id}
                icon={icon}
            >
                {item.childs.length > 0 && renderContent(item.childs)}
            </Tree.TreeNode>;
        })
    };

    const onSelect = (selectedKey) => {
        const parentId = parseInt(selectedKey, 0);
        const permission = findPermissionById(menuData, parentId);
        if (permission !== null) {
        }
        if (idParent !== parentId) {
            history.push(main.formatUrl({
                pathname: location.pathname,
                objSearch: {
                    ...queryVariable,
                    active_id: parentId,
                    action: actID.ACT_DANH_MUC_HANG_SAO.ACT_LIST
                }
            }));
        }
    }

    const onExpand = (expandedKeys) => {
        history.push(main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...queryVariable,
                expanded_keys: expandedKeys.toString()
            }
        }));
    }

    const getExpandedKeys = () => {
        if (queryVariable && queryVariable.expanded_keys) {
            return queryVariable.expanded_keys.split(",");
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
                            <Tree.TreeNode title="" key={0}>
                                {renderContent(menuData)}
                            </Tree.TreeNode>
                        </Tree.DirectoryTree>
                    </Skeleton>
                </ScrollArea>
            </Resizable>
        </React.Fragment >
    );
}

export default Menu;