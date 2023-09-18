import React, { Fragment, useEffect, useState } from "react";
import { Avatar, Button, Checkbox, ConfigProvider, Dropdown, Empty, Input, List, Menu, Modal } from "antd";
import { useSelector } from "react-redux";
import { deduplicate } from "../../../../../constants/main";

const ShareAccount = ({
    visible,
    onCancel,
    onOk,
    data = []
}) => {
    const accounts = useSelector(state => state.core.account.profiles);

    const [search, setSearch] = useState(null);
    const [index, setIndex] = useState(0);
    const [accountSelected, setAccountSelected] = useState([]);
    /**
     *  Tất cả :0
     *  Đã chọn :1
     *  Chưa chọn :2
     */
    const [view, setView] = useState(0);

    useEffect(() => {
        if (visible) {
            setAccountSelected([]);
            setSearch(null);
            setAccountSelected(data);
        }
    }, [visible])

    const getLabel = () => {
        switch (view) {
            case "1":
                return <Fragment> Đã chọn ({accountSelected.length})</Fragment>
            case "2":
                return <Fragment> Chưa chọn ({accounts.length - accountSelected.length})</Fragment>
            default:
                return <Fragment> Tất cả ({accounts.length})</Fragment>
        }
    }

    const filterDataSource = () => {
        return accounts.filter(acc =>
            !search
            || (acc.name.indexOf(search) >= 0 || search.indexOf(acc.name) >= 0)
            || (acc.fullName.indexOf(search) >= 0 || search.indexOf(acc.fullName) >= 0)
        ).filter(acc => {
            switch (view) {
                case "1":
                    return accountSelected.findIndex(a => a.name === acc.name) >= 0;
                case "2":
                    return accountSelected.findIndex(a => a.name === acc.name) < 0;
                default: return true
            }
        })
    }
    return <Fragment>
        <Modal
            visible={visible}
            onCancel={onCancel}

            style={{ top: 50 }}
            bodyStyle={{
                padding: "0px 20px 20px 20px",
                maxHeight: "calc(100vh - 300px)",
                overflow: "auto",
                position: "relative"
            }}
            width={600}
            maskClosable={false}
            destroyOnClose
            closable={false}
            onOk={() => { onOk && onOk(accountSelected) }}
            cancelText={<Fragment><i className="fa fa-times m-r-5" />Đóng</Fragment>}
            okText={<Fragment><i className="fa fa-share-alt m-r-5" />Chia sẻ</Fragment>}
            title={<Fragment>
                <div >
                    <div className="m-b-10">
                        <Input.Search
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                setIndex(0);
                            }}
                            className="input-search"
                            allowClear
                            onSearch={() => {
                                setIndex(() => {
                                    const listElm = document.querySelectorAll(".account-share-item");
                                    let i = 0;
                                    if (listElm.length > 0) {
                                        i = (index % listElm.length) + 1;
                                        listElm[index] && listElm[index].scrollIntoView();
                                    }
                                    return i;
                                });
                            }}
                        />
                    </div>
                    <div>
                        <Button type="primary" className="m-r-5" disabled={accountSelected.length === accounts.length} onClick={() => setAccountSelected(accounts)}>
                            <i className="fa fa-check m-r-5" />Chọn tất cả
                        </Button>
                        <Button type="danger" className="m-r-5" disabled={accountSelected.length === 0} onClick={() => setAccountSelected([])}>
                            <i className="fa fa-times m-r-5" />Bỏ chọn tất cả
                        </Button>
                        <Dropdown
                            trigger={["click"]}
                            overlay={<Menu onClick={({ key }) => setView(key)} selectedKeys={[`${view}`]}>
                                <Menu.Item key={0}>
                                    Tất cả ({accounts.length})
                            </Menu.Item>
                                <Menu.Item key={1}>
                                    Đã chọn ({accountSelected.length})
                            </Menu.Item>
                                <Menu.Item key={2}>
                                    Chưa chọn ({accounts.length - accountSelected.length})
                            </Menu.Item>
                            </Menu>}
                        >
                            <Button type="success">
                                <i className="fa fa-eye m-r-5" />Hiển thị {getLabel()} <i className="fa fa-angle-down" />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </Fragment>}
        >
            <ConfigProvider renderEmpty={() => <Empty description="Không có người dùng" />}>
                <List
                    style={{ margin: "10px 0" }}
                    className="list-account-share"
                    dataSource={filterDataSource()}
                    renderItem={(item) => {
                        const itemSelected = accountSelected.find(acc => acc.name === item.name);
                        const isActive = itemSelected ? true : false;
                        return <Fragment>
                            <List.Item.Meta
                                className={`account-share-item ${isActive ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                                avatar={<Avatar src={item.avatar} size={50}>{`${item.fullName || "A"}`.substr(0, 1).toUpperCase()}</Avatar>}
                                title={item.fullName}
                                description={<DescriptionAccount account={item} setAccountSelected={setAccountSelected} />}
                                onClick={() => setAccountSelected(accs => isActive ? accs.filter(acc => acc.name !== item.name) : deduplicate([...accs, item], "name"))}
                            />
                            <div className={`account-share-item-action ${isActive ? "active" : ""}`}>
                                {
                                    itemSelected &&
                                    <Fragment>
                                        <Checkbox
                                            checked={itemSelected.isUpdate ? true : false}
                                            onChange={e => setAccountSelected(accs => accs.map(acc => acc.name === item.name ? { ...acc, isUpdate: e.target.checked } : acc))}
                                            style={{ color: "#fff" }}
                                        >
                                            Cho phép cập nhật
                                    </Checkbox>
                                        <Checkbox
                                            checked={itemSelected.isDownload ? true : false}
                                            onChange={e => setAccountSelected(accs => accs.map(acc => acc.name === item.name ? { ...acc, isDownload: e.target.checked } : acc))}
                                            style={{ color: "#fff" }}
                                        >
                                            Cho phép tải xuống
                                    </Checkbox>
                                        <Checkbox
                                            checked={itemSelected.isDelete ? true : false}
                                            onChange={e => setAccountSelected(accs => accs.map(acc => acc.name === item.name ? { ...acc, isDelete: e.target.checked } : acc))}
                                            style={{ color: "#fff" }}
                                        >
                                            Cho phép xoá
                                    </Checkbox>
                                    </Fragment>
                                }

                            </div>
                        </Fragment>
                    }}
                />
            </ConfigProvider>
        </Modal>
    </Fragment>
}

const DescriptionAccount = ({ account, setAccountSelected }) => {
    const phongBans = useSelector(state => state.core.account.phong_bans);
    const phongBan = phongBans.find(pb => account && account.managementDepartment && account.managementDepartment === pb.ma);

    return <Fragment>
        <div>Phòng ban: {phongBan ? phongBan.ten : "Không xác định"}</div>
    </Fragment>
}
export default ShareAccount;