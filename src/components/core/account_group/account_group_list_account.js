import React from 'react';
import { Transfer, Table, ConfigProvider, Empty } from 'antd';
import difference from 'lodash/difference';
import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import * as formName from "./../../../constants/form_name";
import * as constants from "./../../../constants/constants";
import { CommonAccount } from '../../common';

// Customize Table Transfer
const TableTransfer = ({ columns, getAllAccountRequest, ...restProps }) => (
    <Transfer  {...restProps} showSelectAll={false} titles={["Danh sách tất cả", "Danh sách đã chọn"]}>
        {({
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const rowSelection = {
                columnWidth: 30,
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        className="table-custom"
                        scroll={{ x: "100%", y: "calc(100vh - 200px)" }}
                        pagination={{ size: "default" }}
                    />
                </ConfigProvider>
            );
        }}
    </Transfer>
);

class AccountGroupListAccount extends React.Component {
    componentDidMount() {
        const { getAllAccountRequest } = this.props;
        getAllAccountRequest({
            data: {
                pageSize: 1000,
                currentPage: 1,
                sort: false
            },
            pageKey: "ACCOUNT_GROUP_LIST_ACCOUNT",
        })
    }
    onChange = nextTargetKeys => {
        var { changeValueForm } = this.props;
        changeValueForm("listAccount", nextTargetKeys);
    };

    getAllData = () => {
        var data = [];
        var { account_list } = this.props;
        const { account_group } = this.props;
        const inListGroup = constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.findIndex(item => account_group && item === account_group.groupCode) > -1;
        account_list.map((account) => {
            const phongBan = constants.CONST_PHONG_BAN.options.find(item => item.value === account.managementDepartment);
            return data.push({
                disabled: (inListGroup && constants.CONST_LIST_ACCOUNT_DEFAULT.findIndex(item => item === account.name) > -1) || account.isEnable === 0,
                key: `${account.name}`,
                isEnable: account.isEnable,
                fullName: account.fullName,
                email: account.email,
                username: account.name,
                phongBan: phongBan ? phongBan.label : account.managementDepartment
            });
        })
        return data;
    }

    originTargetKeys = () => {
        var data = [];
        var { formValue } = this.props;
        var accounts = [];
        if (formValue("listAccount") !== undefined) {
            accounts = formValue("listAccount");
        }
        accounts.map((account) => {
            return data.push(`${account}`);
        })
        return data;
    }

    render() {
        return (
            <div className="col-md-12">
                <TableTransfer
                    getAllAccountRequest={this.props.getAllAccountRequest}
                    dataSource={this.getAllData().filter(item => item.isEnable === 1)}
                    targetKeys={this.originTargetKeys()}
                    showSearch={true}
                    onChange={this.onChange}
                    filterOption={(inputValue, item) => {
                        return (item.fullName.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
                            item.phongBan.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0)
                    }}
                    columns={[
                        {
                            title: 'Họ và tên',
                            width: 200,
                            render: (_, record) => {
                                return <CommonAccount username={record.username}>{record.fullName}</CommonAccount>
                            }
                        },
                        {
                            title: 'Phòng ban',
                            dataIndex: "phongBan",
                            width: 150
                        }
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account_list: state.core.account.list,
    account_group_list: state.core.account_group.list,
    account_group: state.core.account_group.item,
    formValue: (fieldName) => formValueSelector(formName.FORM_NAME_ACCOUNT_GROUP)(state, fieldName)
});
const mapDispatchToProps = (dispatch) => ({
    changeValueForm: (field, value) => {
        dispatch(change(formName.FORM_NAME_ACCOUNT_GROUP, field, value));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountGroupListAccount);
