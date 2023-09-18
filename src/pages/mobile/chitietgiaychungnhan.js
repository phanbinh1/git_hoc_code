import { Icon, Alert, Descriptions } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { get } from "../../util/api_call";
import { API_CO_SO_SAN_XUAT_KINH_DOANH1 } from "../../constants/api";
import { useLocation } from "react-router-dom";
import { queryString } from "../../constants/main";

const ChiTietGiayChungNhan = () => {
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [status, setStatus] = useState(!qs.id || isNaN(qs.id) ? -1 : 0);
    const [item, setItem] = useState(null);
    const getById = async (id) => {
        setStatus(0);
        const res = await get({
            url: `${API_CO_SO_SAN_XUAT_KINH_DOANH1}/${id}`
        })
        if (res && res.status && res.result) {
            setItem(res.result);
            setStatus(1);
        }
        else {
            setStatus(-1);
        }
    }

    useEffect(() => {
        if (!qs.id || isNaN(qs.id)) {
            setStatus(-1);
        }
        else {
            getById(qs.id);
        }
    }, [qs.id])

    return <Fragment>
        {
            status === 0 ?
                <Alert type="info" icon={<Icon type="loading" />} message="Đang tải..." style={{ margin: 20 }} /> :
                (status === -1 || !item) ?
                    <Alert type="error" message="Không tìm thấy cơ sở!" style={{ margin: 20 }} /> :
                    <Fragment>
                        <Descriptions column={1} size="small" className="des-chi-tiet-giay-chung-nhan" style={{ margin: 10 }}>
                            <Descriptions.Item label="Tên cơ sở">{item.tenCoSo}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">
                                {item.diaDiemKinhDoanh}
                                {item.xaPhuong && item.xaPhuong.ten && ` - ${item.xaPhuong.ten}`}
                                {item.quanHuyen && item.quanHuyen.ten && ` - ${item.quanHuyen.ten}`}
                                {item.tinhThanh && item.tinhThanh.ten && ` - ${item.tinhThanh.ten}`}
                            </Descriptions.Item>

                            <Descriptions.Item label="Đơn vị cấp">
                                Ban Quản lý An toàn thực phẩm thành phố Đà Nẵng
                            </Descriptions.Item>

                            <Descriptions.Item label="Số chứng nhận">
                                {item.soChungNhanAttp}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày cấp">
                                {item.ngayCapChungNhanAttp}
                            </Descriptions.Item>
                        </Descriptions>
                    </Fragment>
        }
    </Fragment>
}
export default ChiTietGiayChungNhan;