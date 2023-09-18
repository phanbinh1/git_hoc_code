import React, { useEffect, useState, Fragment } from "react";
import { Drawer, Timeline, Descriptions, Tooltip, Tag, Popover, Empty } from "antd";
import { CONST_LUAN_CHUYEN, CONST_CHUC_VU, CONST_PHONG_BAN, CONST_PHE_DUYET, CONST_TRANG_THAI_HO_SO } from "../../../../constants/constants";
import { CommonAccount } from "../../../common";
import { Markup } from "interweave";
import { useSelector } from "react-redux";
import { AntIcon } from "../../../antd";

const DrawerLuanChuyen = ({ visible, coSo, onClose }) => {
    const [luanChuyen, setLuanChuyen] = useState([]);
    const [dangXuLy, setDangXuLy] = useState(null);
    const account_current = useSelector(state => state.core.account_current);
    const { managementDepartment, regency, name } = account_current;
    const { DAPHEDUYET, KHONGPHEDUYET } = CONST_PHE_DUYET;

    useEffect(() => {
        let _luanChuyen = [];
        if (coSo) {
            if (coSo.trangThaiChuyenHoSo) {
                const { chucVu, phongBan, nguoiXuLy } = coSo.trangThaiChuyenHoSo;
                const { trangThaiPheDuyet } = coSo;
                if ((chucVu !== regency || phongBan !== managementDepartment || nguoiXuLy !== name) && (trangThaiPheDuyet !== DAPHEDUYET && trangThaiPheDuyet !== KHONGPHEDUYET)) {
                    setDangXuLy({
                        chucVu: CONST_CHUC_VU.label[chucVu] || chucVu,
                        phongBan: CONST_PHONG_BAN.label[phongBan] || phongBan,
                        nguoiXuLy
                    })
                }
            }
            try { _luanChuyen = JSON.parse(coSo.lichSuLuanChuyen); }
            catch (e) { _luanChuyen = []; }
        }
        setLuanChuyen(_luanChuyen || []);
    }, [coSo])

    return <Drawer visible={visible} title="Luân chuyển hồ sơ" onClose={onClose} width={400}>
        {
            luanChuyen.length === 0 ?
                <Empty description="Không có dữ liệu!" style={{ margin: "20px 0" }} /> :
                <Timeline className="timeline-luan-chuyen">
                    {
                        dangXuLy &&
                        <Timeline.Item dot={<AntIcon type="loading" />}>
                            <p style={{ marginLeft: 15, marginBottom: 30 }}>
                                <div>Đang xử lý...</div>
                                <div>{dangXuLy.nguoiXuLy && <CommonAccount username={dangXuLy.nguoiXuLy} />}</div>
                                <div><b>{dangXuLy.chucVu}</b> - <b>{dangXuLy.phongBan}</b></div>
                            </p>
                        </Timeline.Item>
                    }
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
                                    </Descriptions>
                                </Timeline.Item>
                            </Fragment>
                        })
                    }
                </Timeline>
        }
    </Drawer >
}

export default DrawerLuanChuyen;