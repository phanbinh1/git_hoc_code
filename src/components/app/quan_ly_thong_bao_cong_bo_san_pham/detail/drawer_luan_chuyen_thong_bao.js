import React, { useEffect, useState, Fragment } from "react";
import { Drawer, Timeline, Descriptions, Tooltip, Tag, Popover, Empty } from "antd";
import { CONST_LUAN_CHUYEN } from "../../../../constants/constants";
import { CommonAccount } from "../../../common";
import { Markup } from "interweave";
import DrawerListHoSo from "./drawer_list_ho_so";

const LuanChuyenThongBao = ({ thongBao, onClose }) => {
    const [luanChuyen, setLuanChuyen] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
        let _luanChuyen = [];
        if (thongBao) {
            try {
                _luanChuyen = JSON.parse(thongBao.lichSuLuanChuyen);
            }
            catch (e) {
                _luanChuyen = [];
            }
        }
        setLuanChuyen(_luanChuyen || []);
    }, [thongBao])
    return <Drawer visible={thongBao ? true : false} title="Luân chuyển thông báo" onClose={onClose} width={400}>
        <DrawerListHoSo
            visible={item ? true : false}
            onClose={() => setItem(null)}
            listHoSo={item && Array.isArray(item.hoSos) ? item.hoSos : []}
        />
        {
            luanChuyen.length === 0 ?
                <Empty description="Không có dữ liệu!" style={{ margin: "20px 0" }} /> :
                <Timeline className="timeline-luan-chuyen">
                    {
                        luanChuyen.map((item, i) => {
                            const _item = { ...item, ...(CONST_LUAN_CHUYEN.description[item.maXuLy] || {}) }
                            return <Fragment>
                                <Timeline.Item key={i} color={_item.color} dot={_item.icon ? <i className={`${_item.icon}`} /> : undefined} >
                                    <Descriptions column={1} className="description-luan-chuyen" size="small">
                                        <Descriptions.Item
                                            label={<Tooltip placement="left" title="Thời gian xử lý"> <i className="fa fa-calendar c-pointer" /></Tooltip>}
                                            className="description-item-luan-chuyen-time"
                                            children={_item.thoiGian}
                                        />

                                        <Descriptions.Item
                                            label={<Tooltip placement="left" title="Cán bộ xử lý"> <i className="fa fa-user c-pointer" /></Tooltip>}
                                            className="description-item-luan-chuyen-user"
                                            children={<CommonAccount username={item.username}>{item.nguoiXyLy}</CommonAccount>}
                                        />

                                        <Descriptions.Item
                                            label={<Tooltip placement="left" title="Thao tác xử lý"> <i className="fa fa-hand-paper-o c-pointer" /></Tooltip>}
                                            className="description-item-luan-chuyen-text"
                                            children={<Fragment>
                                                <Tag color={_item.color}><i className={`${_item.icon} m-r-5`} />{_item.text}</Tag>
                                                {item.maXuLy === CONST_LUAN_CHUYEN.BACK &&
                                                    <Popover
                                                        title={<Fragment><i className="fa fa-question-circle-o m-r-5" />Lý do</Fragment>}
                                                        content={<Markup content={_item.lyDo} />}
                                                        trigger={"click"}
                                                        overlayClassName="popover-warning"
                                                    >
                                                        <i className="fa fa-question-circle-o m-l-5 c-pointer" />
                                                    </Popover>}
                                            </Fragment>}
                                        />
                                        <Descriptions.Item
                                            label={<Tooltip placement="left" title="Thông báo công bố sản phẩm"> <i className="fa fa-file-text-o c-pointer" /></Tooltip>}
                                            className="description-item-luan-chuyen-noti"
                                            children={_item.thongBaoCongBoSanPham ? _item.thongBaoCongBoSanPham.tieuDe : null}
                                        />
                                        <Descriptions.Item
                                            label={<Tooltip placement="left" title="Danh sách hồ sơ"> <i className="fa fa-bars c-pointer" /></Tooltip>}
                                            className="description-item-luan-chuyen-ho-so"
                                            children={<Fragment> Danh sách hồ sơ <Tooltip title="Chi tiết"><i onClick={() => setItem(_item)} className="fa fa-eye m-l-10 c-pointer" /></Tooltip></Fragment>}
                                        />
                                    </Descriptions>
                                </Timeline.Item>
                                {/* {_item.maXuLy === CONST_LUAN_CHUYEN.NEW && <Timeline.Item className="timeline-item-luan-chuyen-line" />} */}
                            </Fragment>
                        })
                    }
                </Timeline>
        }
    </Drawer >
}

export default LuanChuyenThongBao;