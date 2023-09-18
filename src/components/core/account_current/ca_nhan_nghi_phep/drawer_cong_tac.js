import React, { Fragment, useEffect, useState } from "react";
import { Descriptions, Drawer, Dropdown, Timeline, Menu } from "antd";
import { CONST_PHE_DUYET } from "./../../../../constants/constants";
import { CommonTrangThaiPheDuyet } from "../../../common";

const { DAPHEDUYET, KHONGPHEDUYET } = CONST_PHE_DUYET

const DrawerDetailCongTac = ({
    children,
    congTacs = [],
    congTac,
    onEdit,
    onDelete
}) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                const timelineCongTacElm = document.querySelector(`.timeline-nghi-phep-${congTac.id}`);
                timelineCongTacElm && timelineCongTacElm.scrollIntoView();
            }, 300)
        }
    }, [visible, congTacs, congTac]);

    return <Fragment>
        <Drawer
            visible={visible}
            title="Chi tiết"
            onClose={() => setVisible(false)}
            width={400}
            destroyOnClose
        >
            <Timeline className="timeline-nghi-phep">
                {
                    congTacs.map(item => <Timeline.Item
                        className={`${congTac.id === item.id ? "active" : ""} timeline-nghi-phep-${item.id}`}
                        color={item.trangThaiDuyet === DAPHEDUYET ? "green" : item.trangThaiDuyet === KHONGPHEDUYET ? "red" : "blue"}

                    >
                        <Descriptions column={1} size="small">
                            <Descriptions.Item >Từ ngày {item.tuNgay} - đến ngày {item.denNgay}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái"><CommonTrangThaiPheDuyet trangThaiDuyet={item.trangThaiDuyet} lyDoKhongPheDuyet={item.lyDoKhongPheDuyet} /></Descriptions.Item>
                            <Descriptions.Item label="Số ngày công tác">{item.soNgayNghi}</Descriptions.Item>
                            <Descriptions.Item label="Người phê duyệt">{item.nguoiPheDuyet}</Descriptions.Item>

                        </Descriptions>

                    </Timeline.Item>)
                }
            </Timeline>

        </Drawer>
        <Dropdown trigger={["contextMenu"]} overlay={<Menu>
            <Menu.Item onClick={() => onEdit(congTac, 1)} disabled={congTac.trangThaiDuyet === CONST_PHE_DUYET.DAPHEDUYET || congTac.trangThaiDuyet === CONST_PHE_DUYET.KHONGPHEDUYET}>
                <i className="fa fa-pencil-square-o m-r-5" /> Cập nhật
            </Menu.Item>
            <Menu.Item onClick={() => onDelete(congTac, 1)}>
                <i className="fa fa-trash m-r-5" />Xoá
            </Menu.Item>
        </Menu>}>
            <div onClick={() => setVisible(true)}>
                {children}
            </div>
        </Dropdown>
    </Fragment>
}

export default DrawerDetailCongTac;