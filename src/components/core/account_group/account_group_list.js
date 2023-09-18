import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm, Switch } from 'antd';
import AccountGroupSearch from "./account_group_search";
import { CommonTable, CommonTableAction } from "./../../common";
import * as actAccountGroup from "./../../../actions/core/account_group";
import * as constants from "./../../../constants/constants";
import * as actID from "./../../../constants/action_id";
import * as main from "./../../../constants/main";
import * as message from "./../../../constants/message";
import GroupAccounts from './accounts';
import { useLocation } from 'react-router';

const AccountGroupList = props => {

    const {
        pageKey,
        dataLoading,
        dataSort,
        dataSearch,
        onSelectRow,
        getAllRequest,
        handleEdit,
        handleDelete,
        handleSharePermission,
        handleChangeDataSort,
        handleStartLoadData,
        handleEndLoadData,
        isVisiableSearch
    } = props;

    const location = useLocation();
    const account_group_list = useSelector(state => state.core.account_group.list);
    const rows_selected = useSelector(state => state.core.rows_selected);
    const permission_priviliged = useSelector(state => main.getPriviligeds(state.core.permission.menu, location.pathname));
    const [accountGroupActive, setAccountGroupActive] = useState(null);

    const dispatch = useDispatch();
    const updateRequest = (object = {}) => dispatch(actAccountGroup.updateRequest(object));

    const onChangeDataSort = (dataSort) => {
        handleGetAllRequest({}, {
            dataSort,
            requestSuccess: () => handleChangeDataSort(dataSort),
            requestError: () => message.error({ content: constants.CONST_FAILED_ACTION })
        });
    }

    const columns = () => {
        const { isNameSort } = dataSort;
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: 'Mã nhóm',
                dataIndex: 'groupCode',
                width: 460
            },
            {
                title: <div onClick={() => onChangeDataSort({ ...dataSort, isNameSort: !isNameSort })} >
                    <span> Tên nhóm </span>
                    <i className={`fa fa-sort-amount-${isNameSort ? "asc" : "desc"}`} />
                </div >,
                dataIndex: 'name',
                width: 500
            },
            {
                title: <center>Trạng thái</center>,
                dataIndex: 'status',
                className: "td-t-c",
                width: 175,
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                fixed: "right",
                align: "center",
                width: 140
            }
        ];
    };

    const data = () => {
        let result = [];
        account_group_list.map((item, index) => {
            return result.push({
                ...item,
                key: item.id,
                status: renderSwitchActiveAccount(item),
                actions: renderAction(item),
                disabled: constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.indexOf(item.groupCode) === -1 ? false : true
            })
        });
        return result;
    };

    const renderSwitchActiveAccount = (account_group) => {
        var licensedChangeActive = permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_ACCOUNT_GROUP.ACT_CHANGE_ACTIVE) !== -1 ? true : false;
        return <React.Fragment>
            {
                (licensedChangeActive && (constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.indexOf(account_group.groupCode) === -1 ? true : false)) ?
                    account_group.isEnable ?
                        <Popconfirm
                            title="Bạn chắc chắn muốn ngưng kích hoạt cho nhóm người dùng này?"
                            okText="Đồng ý"
                            okType="danger"
                            cancelText="Hủy"
                            onConfirm={() => handleChangeActive(!account_group.isEnable, account_group)}
                        >
                            <Switch
                                size="small"
                                disabled={!licensedChangeActive}
                                checkedChildren={<i className="fa fa-check" />}
                                unCheckedChildren={<i className="fa fa-times" />}
                                checked={account_group.isEnable}
                            />
                        </Popconfirm> :
                        <Switch
                            size="small"
                            disabled={!licensedChangeActive}
                            checkedChildren={<i className="fa fa-check" />}
                            unCheckedChildren={<i className="fa fa-times" />}
                            checked={account_group.isEnable}
                            onChange={(isActive) => handleChangeActive(isActive, account_group)}
                        />

                    :
                    <Switch
                        size="small"
                        disabled={true}
                        checkedChildren={<i className="fa fa-check" />}
                        unCheckedChildren={<i className="fa fa-times" />}
                        checked={account_group.isEnable}
                    />
            }
        </React.Fragment>
    };

    const renderAction = (account_group) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        label: "Tài khoản",
                        icon: "fa fa-user",
                        onClick: () => setAccountGroupActive(account_group)
                    },
                    {
                        idChucNang: actID.ACT_ID_ACCOUNT_GROUP.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, account_group.groupCode),
                        type: "danger",
                        hidden: constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.indexOf(account_group.groupCode) !== -1
                    },
                    {
                        idChucNang: actID.ACT_ID_ACCOUNT_GROUP.ACT_UPDATE,
                        onClick: () => handleEdit(account_group.id),
                    },
                    {
                        idChucNang: actID.ACT_ID_ACCOUNT_GROUP.ACT_DECENTRALIZATION,
                        onClick: () => handleSharePermission(account_group.groupCode)
                    }
                ]}
            />
        </React.Fragment>
    };

    const handleChangeActive = (isActive, item) => {
        isActive ? item.isEnable = 1 : item.isEnable = 0;
        handleStartLoadData();
        updateRequest({
            data: item,
            requestSuccess: handleEndLoadData,
            requestError: handleEndLoadData
        });
    };

    const handleGetAllRequest = (value = {}, object = {}) => {
        handleStartLoadData();
        let _dataSort = dataSort;
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        if (object.hasOwnProperty("dataSort")) {
            _dataSort = { ...object.dataSort };
        }
        if (object.hasOwnProperty("requestSuccess") && typeof object.requestSuccess === "function") {
            requestSuccess = () => {
                object.requestSuccess();
                handleEndLoadData();
            }
        }
        value = { ...value, ...dataSearch, ..._dataSort };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });
    };

    const handleSelectRow = (selectedRowKeys, selectedRows) => {
        let index = -1;
        let accountGroupAdd = [];
        let accountGroupRemove = [];
        let _selectedRows = main.getItemSelected(rows_selected, pageKey);
        account_group_list.map(account => {
            index = selectedRows.findIndex(item => item.id === account.id);
            index !== -1 ? accountGroupAdd.push(account) : accountGroupRemove.push(account);
            return null;
        })
        accountGroupAdd.map(account => {
            index = _selectedRows.findIndex(item => item.id === account.id);
            if (index === -1) {
                _selectedRows.push(account);
            }
            return null;
        });
        accountGroupRemove.map(account => {
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
            <GroupAccounts
                visible={accountGroupActive ? true : false}
                onClose={() => setAccountGroupActive(null)}
                accounts={accountGroupActive ? accountGroupActive.accounts : []}
            />
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={(selectedRowKeys, selectedRows) => {
                    handleSelectRow(selectedRowKeys, selectedRows);
                }}
                selectedRowKeys={_selectedRowKeys}
                search={{
                    show: isVisiableSearch,
                    component: <AccountGroupSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default AccountGroupList;