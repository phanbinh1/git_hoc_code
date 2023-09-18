import React, { Fragment } from "react";
import { Drawer, List, Avatar, Descriptions, ConfigProvider, Empty } from "antd";
import * as constants from "./../../../constants/constants";
import { CommonAccount } from "../../common";

const GroupAccounts = ({ visible, onClose, accounts }) => {

    return <Fragment>
        <Drawer
            title={<Fragment><i className="fa fa-user m-r-10" />Danh sách người dùng ({accounts.length})</Fragment>}
            visible={visible}
            onClose={onClose}
            width={400}
            destroyOnClose
        >
            <ConfigProvider renderEmpty={() => <Empty description="Không có người dùng!" />}>
                <List
                    className="list-account-share"
                    dataSource={accounts}
                    renderItem={(account, i) => {
                        const phongBan = constants.CONST_PHONG_BAN.options.find(item => item.value === account.managementDepartment);
                        const chucVu = constants.CONST_CHUC_VU.options.find(item => item.value === account.regency);
                        return <List.Item.Meta key={i}
                            className="account-share-item c-pointer"
                            avatar={<Avatar size={60} src={account.avatar || constants.CONST_AVATAR_DEFAULT}>{(account.hasOwnProperty("fullName") && account.fullName.length > 0) ? account.fullName.substring(0, 1) : "A"}</Avatar>}
                            title={<CommonAccount username={account.name}><b>{account.fullName}</b></CommonAccount>}
                            description={<Fragment>
                                <Descriptions column={1} size="small" style={{ fontSize: "10px" }}>
                                    <Descriptions.Item label="Phòng ban">{phongBan ? phongBan.label : account.managementDepartment}</Descriptions.Item>
                                    <Descriptions.Item label="Chức vụ">{chucVu ? chucVu.label : account.regency}</Descriptions.Item>
                                </Descriptions>
                            </Fragment>}
                        />
                    }}
                />
            </ConfigProvider>
        </Drawer>
    </Fragment>

}

export default GroupAccounts;