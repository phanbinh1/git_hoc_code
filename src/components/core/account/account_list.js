import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, List, Popconfirm, Switch } from 'antd';
import AccountSearch from "./account_search";
import { CommonTable, CommonTableAction } from "./../../common";
import * as actAccount from "./../../../actions/core/account";
import * as constants from "./../../../constants/constants";
import * as actID from "./../../../constants/action_id";
import * as apiUrl from "./../../../constants/api";
import * as main from "./../../../constants/main";
import * as message from "./../../../constants/message";
import { useLocation } from 'react-router';
import { get, post } from '../../../util/api_call';
import GroupAccounts from '../account_group/accounts';

const AccountList = ({ ...props }) => {
    const {
        dataSort,
        pageKey,
        dataLoading,
        dataSearch,
        getAllRequest,
        onSelectRow,
        handleEdit,
        handleDelete,
        handleEndLoadData,
        handleStartLoadData,
        isVisiableSearch
    } = props;

    const location = useLocation();
    const account_list = useSelector(state => state.core.account.list);
    const permission_priviliged = useSelector(state => main.getPriviligeds(state.core.permission.menu, location.pathname));
    const rows_selected = useSelector(state => state.core.rows_selected);

    const [visibleGroup, setVisibleGroup] = useState(false);
    const [visibleGroupAccounts, setVisibleGroupAccounts] = useState(false);
    const [groupAccounts, setGroupAccounts] = useState([]);
    const [groups, setGroups] = useState([]);

    const dispatch = useDispatch();
    const updateRequest = (object = {}) => {
        dispatch(actAccount.updateRequest(object));
    }

    const onUnlock = async (username) => {
        const res = await post({
            url: apiUrl.API_ACCOUNT_UNLOCK(username)
        })
        if (res && res.status) {
            message.success({ content: "Mở khoá thành công!" });
        }
        else {
            message.error({ content: "Mở khoá thất bại!" });
        }
    }
    const getGroups = async (username) => {
        const res = await get({
            url: apiUrl.API_ACCOUNT_GROUP + `/account/${username}`
        });
        if (res && res.status && Array.isArray(res.result)) {
            setGroups(res.result);
            setVisibleGroup(true);
        }
    }

    const columns = () => {
        return [
            {
                title: "STT",
                dataIndex: 'stt'
            },
            {
                title: "Tên đăng nhập",
                dataIndex: 'name',
                width: 150
            },
            {
                title: "Họ và tên",
                dataIndex: 'fullName',
                width: 150
            },
            {
                title: "Phòng ban",
                width: 150,
                render: (_, record) => {
                    const phongBan = constants.CONST_PHONG_BAN.options.find(item => item.value === record.managementDepartment);
                    return phongBan ? phongBan.label : "";
                }
            },
            {
                title: "Chức vụ",
                width: 120,
                render: (_, record) => {
                    const chucVu = constants.CONST_CHUC_VU.options.find(item => item.value === record.regency);
                    return chucVu ? chucVu.label : "";
                }
            },
            {
                title: 'ĐT di động',
                dataIndex: 'phoneNumber',
                width: 120
            },
            {
                title: 'ĐT cơ quan',
                dataIndex: 'desktopPhoneNumber',
                width: 120
            },
            {
                title: "Email",
                dataIndex: 'email',
                width: 190
            },
            {
                title: "Trạng thái",
                dataIndex: 'status',
                className: "td-t-c",
                width: 135
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: "right"
            }
        ];
    }

    const data = () => {
        var result = [];
        account_list.map((item, index) => {
            return result.push({
                ...item,
                key: item.id,
                stt: index + 1,
                status: renderSwitchActiveAccount(item),
                actions: renderAction(item),
                disabled: (constants.CONST_LIST_ACCOUNT_DEFAULT.indexOf(item.name) === -1 ? false : true)
            })
        });
        return result;
    }

    const renderSwitchActiveAccount = (account) => {
        const licensedChangeActive = permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_ACCOUNT.ACT_CHANGE_ACTIVE) !== -1 ? true : false;
        return <React.Fragment>
            {
                (licensedChangeActive && (constants.CONST_LIST_ACCOUNT_DEFAULT.indexOf(account.name) === -1 ? true : false)) ?
                    account.isEnable ?
                        <Popconfirm
                            title="Bạn chắc chắn muốn ngưng kích hoạt cho người dùng này?"
                            okText="Đồng ý"
                            okType="danger"
                            cancelText="Hủy"
                            onConfirm={() => handleChangeActive(!account.isEnable, account)}
                        >
                            <Switch
                                size="small"
                                disabled={!licensedChangeActive}
                                checkedChildren={<i className="fa fa-check" />}
                                unCheckedChildren={<i className="fa fa-times" />}
                                checked={account.isEnable === 1 ? true : false}
                            />
                        </Popconfirm> :
                        <Switch
                            size="small"
                            disabled={!licensedChangeActive}
                            checkedChildren={<i className="fa fa-check" />}
                            unCheckedChildren={<i className="fa fa-times" />}
                            checked={account.isEnable === 1 ? true : false}
                            onChange={(isActive) => handleChangeActive(isActive, account)}
                        />

                    :
                    <Switch
                        size="small"
                        disabled={true}
                        checkedChildren={<i className="fa fa-check" />}
                        unCheckedChildren={<i className="fa fa-times" />}
                        checked={account.isEnable === 1 ? true : false}
                    />
            }
        </React.Fragment>
    }

    const renderAction = (account) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        label: "Nhóm người dùng",
                        icon: "fa fa-users",
                        onClick: () => getGroups(account.name)
                    },
                    {
                        idChucNang: actID.ACT_ID_ACCOUNT.ACT_UNLOCK,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn mở khoá cho tài khoản này?",
                        onClick: () => onUnlock(account.name),
                        type: "success",
                    },
                    {
                        idChucNang: actID.ACT_ID_ACCOUNT.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, account.name),
                        type: "danger",
                        hidden: constants.CONST_LIST_ACCOUNT_DEFAULT.indexOf(account.name) !== -1
                    },
                    {
                        idChucNang: actID.ACT_ID_ACCOUNT.ACT_UPDATE,
                        onClick: () => handleEdit(account.name),
                        type: "success"
                    }
                ]}
            />
        </React.Fragment>
    }

    const handleGetAllRequest = (value = {}, object = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        let sortData = dataSort;
        const requestError = handleEndLoadData;
        if (object.hasOwnProperty("dataSort")) {
            sortData = { ...object.dataSort };
        }
        if (object.hasOwnProperty("requestSuccess") && typeof object.requestSuccess === "function") {
            requestSuccess = () => {
                object.requestSuccess();
                handleEndLoadData();
            }
        }
        value = { ...value, ...dataSearch, ...sortData };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });
    };

    const handleChangeActive = (isActive, item) => {
        isActive ? item.isEnable = 1 : item.isEnable = 0;
        handleStartLoadData();
        updateRequest({
            data: item,
            requestSuccess: handleEndLoadData,
            requestError: handleEndLoadData
        });
    }

    const handleSelectRow = (selectedRowKeys, selectedRows) => {
        let index = -1;
        let accountAdd = [];
        let accountRemove = [];
        let _selectedRows = main.getItemSelected(rows_selected, pageKey);
        account_list.map(account => {
            index = selectedRows.findIndex(item => item.id === account.id);
            index !== -1 ? accountAdd.push(account) : accountRemove.push(account);
            return null;
        })
        accountAdd.map(account => {
            index = _selectedRows.findIndex(item => item.id === account.id);
            if (index === -1) {
                _selectedRows.push(account);
            }
            return null;
        });
        accountRemove.map(account => {
            index = _selectedRows.findIndex(item => item.id === account.id);
            if (index !== -1) {
                _selectedRows.splice(index, 1);
            }
            return null;
        });
        onSelectRow(_selectedRows);
    }

    const _selectedRowKeys = main.getItemSelected(rows_selected, pageKey).map(item => item.id);
    return (
        <React.Fragment>
            <Drawer title="Danh sách nhóm người dùng tham gia" visible={visibleGroup} onClose={() => setVisibleGroup(false)} width={400}>
                <List
                    className="list-account-share c-pointer"
                    dataSource={groups}
                    renderItem={(group, i) => <List.Item.Meta key={i}
                        className="account-share-item"
                        title={group.name}
                        description={<Fragment>
                            Số người: <b>{group.accounts.length}</b>
                        </Fragment>}
                        onClick={() => {
                            setGroupAccounts(group.accounts);
                            setVisibleGroupAccounts(true);
                        }}
                    />}
                />
                <GroupAccounts
                    accounts={groupAccounts || []}
                    visible={visibleGroupAccounts}
                    onClose={() => setVisibleGroupAccounts(false)}
                />
            </Drawer>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                controllerKey={main.encode(apiUrl.API_ACCOUNT)}
                onSelectRow={(selectedRowKeys, selectedRows) => {
                    handleSelectRow(selectedRowKeys, selectedRows);
                }}
                selectedRowKeys={_selectedRowKeys}
                search={{
                    show: isVisiableSearch,
                    component: <AccountSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default AccountList;