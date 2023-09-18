import React, { useState, Fragment, useEffect } from "react";
import { Drawer, Collapse, Tooltip, Button, List, Descriptions, Empty, Input, Dropdown, Menu, Checkbox } from "antd";
import { get } from "./../../../../util/api_call"
import { API_HO_SO_TU_CONG_BO } from "./../../../../constants/api"
import { CONST_LOAI_CONG_BO_SAN_PHAM } from "./../../../../constants/constants"
import { URL_HO_SO_TU_CONG_BO_DETAIL, URL_HO_SO_BAN_CONG_BO_DETAIL } from "./../../../../constants/url"
import LuanChuyenHoSo from "./drawer_luan_chuyen";
import { Link } from "react-router-dom";
import { CommonFieldset } from "../../../common";

const DrawerListHoSo = ({
    visible = false,
    listHoSo = [],
    onClose
}) => {

    const [hoSo, setHoSo] = useState(null);
    const [search, setSearch] = useState(null);
    const [openAll, setOpenAll] = useState(true);

    const [visibleFilter, setVisibleFilter] = useState(false);
    const [filterBy, setFilterBy] = useState({
        tenDangKyKinhDoanh: true,
        diaDiemKinhDoanh: true,
        tenSanPham: true,
        xuatXu: true
    })

    const [activeKeys, setActiveKeys] = useState([]);

    const getHoSo = async (id) => {
        const res = await get({ url: API_HO_SO_TU_CONG_BO + `/${id}` });
        if (res && res.status) {
            setHoSo(res.result);
        }
    }

    useEffect(() => {
        setActiveKeys(!openAll ? [] : listHoSo.map(item => item.id));
    }, [listHoSo, openAll])

    useEffect(() => {
        if (!visible) {
            setVisibleFilter(false);
            setSearch(null);
        }
    }, [visible])

    return <Drawer
        title="Danh sách hồ sơ"
        visible={visible}
        onClose={onClose}
        width={400}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
    >
        <LuanChuyenHoSo
            hoSo={hoSo}
            onClose={() => setHoSo(null)}
        />
        <CommonFieldset className="m-t-0 t-right">
            <Input.Search
                className="input-round"
                placeholder="Tìm kiếm ..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "calc(100% - 68px)" }}
                allowClear
            />

            <Dropdown
                trigger={["click"]}
                visible={visibleFilter}
                onVisibleChange={visible => setVisibleFilter(visible)}
                overlay={<Menu>
                    <Menu.Item>
                        <Checkbox
                            onChange={e => setFilterBy(e.target.checked ?
                                {
                                    tenDangKyKinhDoanh: true,
                                    diaDiemKinhDoanh: true,
                                    tenSanPham: true,
                                    xuatXu: true
                                } :
                                {
                                    tenDangKyKinhDoanh: false,
                                    diaDiemKinhDoanh: false,
                                    tenSanPham: false,
                                    xuatXu: false
                                })}
                            checked={Object.keys(filterBy).filter(key => filterBy[key]).length === Object.keys(filterBy).length ? true : false}
                            indeterminate={Object.keys(filterBy).filter(key => filterBy[key]).length > 0 && Object.keys(filterBy).filter(key => filterBy[key]).length !== Object.keys(filterBy).length}
                        >
                            Tất cả
                        </Checkbox>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item><Checkbox checked={filterBy.tenDangKyKinhDoanh} onChange={e => setFilterBy(filter => ({ ...filter, tenDangKyKinhDoanh: e.target.checked }))}>Tên ĐKKD</Checkbox></Menu.Item>
                    <Menu.Item><Checkbox checked={filterBy.diaDiemKinhDoanh} onChange={e => setFilterBy(filter => ({ ...filter, diaDiemKinhDoanh: e.target.checked }))} >Địa chỉ</Checkbox></Menu.Item>
                    <Menu.Item><Checkbox checked={filterBy.tenSanPham} onChange={e => setFilterBy(filter => ({ ...filter, tenSanPham: e.target.checked }))} >Tên sản phẩm</Checkbox></Menu.Item>
                    <Menu.Item><Checkbox checked={filterBy.xuatXu} onChange={e => setFilterBy(filter => ({ ...filter, xuatXu: e.target.checked }))} >Xuất xứ</Checkbox></Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={() => setOpenAll(open => !open)}>
                        <i className={`fa fa-eye${openAll ? "-slash" : ""} m-r-10`} />{openAll ? "Thu gọn" : "Mở rộng"}
                    </Menu.Item>

                </Menu>}
            >
                <Button className="m-l-10"><i className="fa fa-sliders m-r-5" /><i className="fa fa-angle-down" /></Button>
            </Dropdown>
        </CommonFieldset>
        <div style={{ height: "calc(100vh - 104px)", overflow: "auto", borderBottom: "1px solid #ccc" }}>
            {
                listHoSo.length === 0 ?
                    <Empty description="Không có dữ liệu!" style={{ margin: "20px 0" }} /> :
                    <Collapse activeKey={activeKeys} bordered expandIconPosition="right" onChange={keys => setActiveKeys(!keys ? [] : Array.isArray(keys) ? keys : [keys])} style={{ borderTop: 0 }}>
                        {
                            listHoSo
                                .filter(item => search === null || search.trim() === "" ?
                                    true :
                                    (
                                        (filterBy.tenDangKyKinhDoanh && item.tenDangKyKinhDoanh && item.tenDangKyKinhDoanh.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                        || (filterBy.diaDiemKinhDoanh && item.diaDiemKinhDoanh && item.diaDiemKinhDoanh.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                        || item.danhSachSanPhamCongBo.findIndex(sp =>
                                            (filterBy.tenSanPham && sp.tenSanPham && sp.tenSanPham.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                            || (filterBy.xuatXu && sp.xuatXu && sp.xuatXu.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                        ) >= 0
                                    )
                                )
                                .map((item, i) => {
                                    return <Collapse.Panel
                                        key={item.id}
                                        header={<Fragment>
                                            <Tooltip title="Tên công ty" placement="left">
                                                <div>
                                                    <i className="fa fa-building-o m-r-10" />{item.tenDangKyKinhDoanh}
                                                </div>
                                            </Tooltip>
                                        </Fragment>}
                                    >
                                        <Tooltip title="Địa điểm kinh doanh" placement="left">
                                            <p><i className="fa fa-map-marker m-r-10" />{item.diaDiemKinhDoanh}</p>
                                        </Tooltip>
                                        <p>
                                            {
                                                item.loaiCongBo === CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO ?
                                                    <SanPhamBanCongBo id={item.id} danhSachSanPhamCongBo={item.danhSachSanPhamCongBo} /> :
                                                    <SanPhamTuCongBo id={item.id} sanPham={item.danhSachSanPhamCongBo[0]} />
                                            }
                                        </p>
                                        <p>
                                            <Button type="primary" disabled={!item.id ? true : false} onClick={() => getHoSo(item.id)}> <i className="fa fa-eye m-r-10" />Chi tiết luân chuyển</Button>
                                        </p>
                                    </Collapse.Panel>
                                })
                        }
                    </Collapse>
            }
        </div>
    </Drawer>;
}

const SanPhamTuCongBo = ({ id, sanPham }) => {
    return <Fragment>
        <Tooltip title="Thông tin sản phẩm" placement="left">
            <p><i className="fa fa-info-circle m-r-10" />Thông tin sản phẩm</p>
        </Tooltip>
        <Descriptions column={1} size="small" >
            <Descriptions.Item label="Tên sản phẩm">
                <Link to={`${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${id}`}>
                    {sanPham.tenSanPham}
                </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Nguồn gốc">
                {sanPham.nguonGoc}
            </Descriptions.Item>
            <Descriptions.Item label="Xuất xứ">
                {sanPham.xuatXu}
            </Descriptions.Item>
        </Descriptions>
    </Fragment>
}

const SanPhamBanCongBo = ({ id, danhSachSanPhamCongBo }) => {
    return <List
        bordered
        size="small"
        header="Danh sách sản phẩm công bố"
        dataSource={danhSachSanPhamCongBo}
        renderItem={(sp) => <List.Item>
            <Link to={`${URL_HO_SO_BAN_CONG_BO_DETAIL}?id=${id}`}>
                {sp.tenSanPham}
            </Link>
        </List.Item>}
    />
}

export default DrawerListHoSo;