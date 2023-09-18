import React, { Fragment } from 'react';
import { Descriptions, Tag, Badge, Popover } from 'antd';
import { CONST_PHE_DUYET } from "./../../../../../constants/constants";
import { CommonFieldset, CommonPhongBan } from '../../../../../components/common';

const DetailThongTinCuocGiamSat = ({ item }) => {
    const renderTrangThai = (keHoach) => {
        const trangThai = CONST_PHE_DUYET.thanhTraOptions.find(item => item.value === keHoach.trangThaiDuyet);
        if (trangThai && trangThai.value === CONST_PHE_DUYET.KHONGPHEDUYET) {
            return <Tag color={trangThai.color}>
                {trangThai.label.toLocaleUpperCase()}
                <Popover
                    title="Lý do không phê duyệt"
                    content={keHoach.lyDoKhongPheDuyet}
                    trigger={"click"}
                    overlayClassName="popover-warning"
                >
                    <Badge status="processing" color="red" className="m-l-10 c-pointer" />
                </Popover>
            </Tag>
        }
        else {
            return trangThai ? <Tag color={trangThai.color}>{trangThai.label.toLocaleUpperCase()}</Tag> : null;
        }
    }

    const renderPhongBanPhoiHop = () => {
        const phongBanPhoiHop = (item.phongBanPhoiHop || "").split(",");
        return phongBanPhoiHop.filter(pb => pb !== null && pb.trim() !== "").map(pb => <Tag className="c-pointer" color="#108ee9" ><CommonPhongBan maPhongBan={pb} /></Tag>)
    }

    return (
        <Fragment>
            <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-info-circle m-r-10" />Thông tin cuộc giám sát</Fragment>}>
                <Descriptions size="small" column={2}>
                    <Descriptions.Item label="Tên cuộc giám sát" span={2}>{item.tenCuocGiamSat}</Descriptions.Item>

                    <Descriptions.Item label="Năm">
                        <Tag color="blue">
                            <i className="fa fa-calendar m-r-10" />
                            {item.nam}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">{renderTrangThai(item)}</Descriptions.Item>


                    <Descriptions.Item label="Ngày bắt đầu" >{item.ngayBatDau}</Descriptions.Item>
                    <Descriptions.Item label="Ngày kết thúc" >{item.ngayKetThuc}</Descriptions.Item>

                    <Descriptions.Item label="Phòng" span={2}>
                        <Tag className="c-pointer" color="#0fa705" ><CommonPhongBan maPhongBan={item.keHoachPhong} /></Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Phòng ban phối hợp" span={2}>{renderPhongBanPhoiHop()}</Descriptions.Item>
                    <Descriptions.Item label="Nội dung giám sát" span={2}>{item.noiDungGiamSat}</Descriptions.Item>

                    <Descriptions.Item label="Ghi chú" span={2}>{item.ghiChu}</Descriptions.Item>
                </Descriptions>
            </CommonFieldset>
        </Fragment >
    );
}

export default DetailThongTinCuocGiamSat;