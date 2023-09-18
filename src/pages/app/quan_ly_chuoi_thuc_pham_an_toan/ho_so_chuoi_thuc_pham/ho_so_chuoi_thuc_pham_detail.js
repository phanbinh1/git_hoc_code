import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Descriptions } from "antd";
import * as actHoSoChuoiThucPham from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";

const HoSoChuoiThucPhamDetail = ({
    queryVariable
}) => {
    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const getOneRequest = (object) => dispatch(actHoSoChuoiThucPham.getOneRequest(object));

    const ho_so = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ho_so_chuoi_thuc_pham.item)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    useEffect(() => {
        setAction([
            {
                key: actID.ACT_BACK,
                hidden: true
            }
        ]);
        if (queryVariable.id) {
            getOneRequest({
                data: { id: queryVariable.id },
                requestSuccess: (res) => {
                    if (res.status && res.result) {
                        setError(false);
                    }
                    setLoading(false);
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
        else {
            setLoading(false);
        }
    }, [queryVariable]);

    return (
        <React.Fragment>
            <div className="col-md-12" style={{ height: "100%", padding: "20px" }}>
                {loading ?
                    <Alert message="Đang tải dữ liệu..." type="info" showIcon /> :
                    (error ? <Alert
                        message="Không thể tìm thấy hồ sơ!"
                        type="error"
                        showIcon
                    /> :
                        <Descriptions size="small" bordered column={3}>
                            <Descriptions.Item label="Tên ĐKKD">{ho_so.tenDangKyKinhDoanh}</Descriptions.Item>
                            <Descriptions.Item label="Số giấy phép">{ho_so.soGiayPhepDkkd}</Descriptions.Item>
                            <Descriptions.Item label="Ngày cấp">{ho_so.ngayCapGiayPhepDkkd}</Descriptions.Item>

                            <Descriptions.Item label="Số chứng nhận ATTP">{ho_so.soChungNhanAttp}</Descriptions.Item>
                            <Descriptions.Item label="Ngày cấp">{ho_so.ngayCapChungNhanAttp}</Descriptions.Item>
                            <Descriptions.Item label="Ngày hết hạn">{ho_so.ngayHetHanChungNhanAttp}</Descriptions.Item>

                            <Descriptions.Item label="Tên sản phẩm" span={2}>{ho_so.tenSanPham}</Descriptions.Item>
                            <Descriptions.Item label="Ngày công bố">{ho_so.thoiDiemTuCongBo}</Descriptions.Item>

                            <Descriptions.Item label="Số giấy xác nhận" >{ho_so.soGiayXacNhanCongBo}</Descriptions.Item>
                            <Descriptions.Item label="Ngày cấp">{ho_so.ngayCapXacNhanCongBo}</Descriptions.Item>
                            <Descriptions.Item label="Ngày tiếp nhận">{ho_so.ngayTiepNhan}</Descriptions.Item>
                        </Descriptions>
                    )
                }
            </div>
        </React.Fragment>
    );
}

export default HoSoChuoiThucPhamDetail;