import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";
import _ from "lodash";
import { CommonTable, CommonTableAction } from "./../../common";
import PermissionTreeMove from "./permission_tree_move";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import * as actPermission from "./../../../actions/core/permission";

const PermissionList = ({
    handleEdit,
    handleDelete,
    onSelectRow,
    dataLoading,
    pageKey,
    width
}) => {

    const [loading, setLoading] = useState(false);
    const [itemActive, setItemActive] = useState({});
    const [showListPermission, setShowListPermission] = useState(false);
    const [permissionMove, setPermissionMove] = useState(null);

    const permission_list = useSelector(state => state.core.permission.list);

    const dispatch = useDispatch();
    const updateRequest = (object = {}) => dispatch(actPermission.updateRequest(object));

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
        },
        {
            title: "Tên",
            dataIndex: "name",
            width: 150,
        },
        {
            title: "Đường dẫn",
            dataIndex: "url",
            width: 200,
        },
        {
            title: "Icon",
            dataIndex: "icon",
            width: 70,
            allowResize: false
        },
        {
            title: "Sắp xếp",
            dataIndex: "sort",
            align: "center",
            width: 75
        },
        {
            title: "Thao tác",
            dataIndex: "actions",
            align: "center",
            width: 140,
            fixed: "right"
        }
    ]

    const endChangeSort = (e, item) => {
        if (e.target.value && !isNaN(e.target.value) && item.sort !== parseInt(e.target.value)) {
            if (!itemActive.menuLeft && itemActive.type === constants.CONST_PERMISSION_TYPE_URL) {
                itemActive.type = constants.CONST_PERMISSION_TYPE_URL_HIDDEN;
            }
            if (itemActive.hiddenAction && itemActive.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                itemActive.type = constants.CONST_PERMISSION_TYPE_ACTION_HIDDEN;
            }
            setLoading(true);
            updateRequest({
                data: {
                    ...itemActive,
                    sort: parseInt(e.target.value)
                },
                requestSuccess: () => {
                    setLoading(false);
                    setItemActive({});
                },
                requestError: () => {
                    setLoading(false);
                    setItemActive({});
                }
            })
        }
    }

    const startChangeSort = (e, item) => {
        setItemActive(item);
    }

    const changeSort = (e) => {
        if (e.target.value && (!isNaN(e.target.value) || e.target.value === "")) {
            setItemActive({ ...itemActive, sort: e.target.value });
        }
    }

    const keyDown = (e, item) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_PERMISSION.ACT_DELETE,
                        onClick: () => handleDelete(false, item.id),
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_PERMISSION.ACT_UPDATE,
                        onClick: () => handleEdit(item.id),
                        type: "success"
                    },
                    {
                        idChucNang: actID.ACT_ID_PERMISSION.ACT_MOVE,
                        onClick: () => onShowListPermission(item),
                    },
                    {
                        label: item.isMobile ? "Ẩn trên Mobile" : "Hiển thị trên Mobile",
                        icon: item.isMobile ? "fa fa-eye-slash" : "fa fa-eye",
                        onClick: () => {
                            if (!item.menuLeft && item.type === constants.CONST_PERMISSION_TYPE_URL) {
                                item.type = constants.CONST_PERMISSION_TYPE_URL_HIDDEN;
                            }
                            if (item.hiddenAction && item.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                                item.type = constants.CONST_PERMISSION_TYPE_ACTION_HIDDEN;
                            }
                            item.isMobile = item.isMobile ? 0 : 1;
                            setLoading(true);
                            updateRequest({
                                data: item,
                                requestSuccess: () => {
                                    setLoading(false);
                                },
                                requestError: () => {
                                    setLoading(false);
                                }
                            })
                        }
                    }
                ]}
            />
        </React.Fragment>
    };

    const data = _.orderBy(permission_list, ["sort"], ["asc"]).map((item, index) => {
        return {
            ...item,
            key: item.id,
            sort: <input
                className={`form-control input-sm input-sort-permission ${item.id === itemActive.id ? "active" : ""}`}
                required
                readOnly={!itemActive.id === item.id}
                value={item.id === itemActive.id ? itemActive.sort : item.sort}
                onChange={changeSort}
                onBlur={(e) => endChangeSort(e, item)}
                onFocus={(e) => startChangeSort(e, item)}
                onKeyDown={(e) => keyDown(e, item)}
            />,
            icon: <i className={`${item.icon}`} />,
            actions: renderAction(item)
        }
    });

    const onShowListPermission = (permissionMove) => {
        setShowListPermission(true);
        setPermissionMove(permissionMove);
    };

    const closeListPermission = () => {
        setShowListPermission(false);
    }

    return (
        <React.Fragment>
            <Drawer
                title="DANH SÁCH QUYỀN"
                placement="right"
                width={400}
                onClose={closeListPermission}
                visible={showListPermission}
                destroyOnClose
            >
                <PermissionTreeMove
                    permissionMove={permissionMove}
                    handleClose={closeListPermission}
                />
            </Drawer>
            <CommonTable
                style={{ width: `calc(100 % - ${width}px)`, left: width }}
                wrapperClassName="wrapper-list"
                columns={columns}
                dataSource={data}
                loading={dataLoading || loading}
                bordered={true}
                isPagination={false}
                onSelectRow={onSelectRow}
                pageKey={pageKey}
            />
        </React.Fragment>
    );
}

export default PermissionList;