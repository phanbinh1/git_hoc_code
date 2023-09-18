import React, { Fragment, useState, useEffect } from "react";
import AbortController from "abort-controller";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actHSCGCN from "./../../../../actions/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ho_so_cap_giay_chung_nhan/index";
import * as actKeHoachThamDinhGCN from "./../../../../actions/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ke_hoach_tham_dinh";
import * as url from "./../../../../constants/url";
import * as constants from "./../../../../constants/constants";
import { Dropdown, Menu, Badge } from "antd";

const DashboardPhongNghiepVu = () => {
    const [controller] = useState(new AbortController());
    const [controller1] = useState(new AbortController());

    const [countHoSo, setCountHoSo] = useState({
        total: 0,
        daXuLy: 0,
        chuaXuLy: 0
    })

    const [countKeHoach, setCountKeHoach] = useState({
        khongPheDuyet: 0,
        daPheDuyet: 0,
        dangHoanThien: 0,
        choPheDuyet: 0,
        total: 0
    })


    const dispatch = useDispatch();
    const countHoSoRequest = object => dispatch(actHSCGCN.countRequest(object));
    const countKeHoachRequest = object => dispatch(actKeHoachThamDinhGCN.countRequest(object));
    useEffect(() => {
        countHoSoRequest({
            controller,
            errorNotifi: false,
            requestSuccess: (res) => {
                const { total, daXuLy, chuaXuLy } = res;
                setCountHoSo({ total, daXuLy, chuaXuLy });
            }
        });
        countKeHoachRequest({
            controller1,
            errorNotifi: false,
            requestSuccess: (res) => {
                const { khongPheDuyet, daPheDuyet, dangHoanThien, choPheDuyet, total } = res;
                setCountKeHoach({ khongPheDuyet, daPheDuyet, dangHoanThien, choPheDuyet, total })
            }
        })
        return () => {
            controller.abort();
            controller1.abort();
        }
    }, [])

    const overlayHoSoGCN = () => {
        return <Menu>
            <Menu.Item>
                <Link to={url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}>
                    <Badge count={countHoSo.chuaXuLy} showZero className="badge-dashboard badge-warning">
                        <div>Hồ sơ chờ thẩm định</div>
                    </Badge>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_DA_XU_LY}>
                    <Badge count={countHoSo.daXuLy} showZero className="badge-dashboard badge-success">
                        <div>Hồ sơ đã thẩm định</div>
                    </Badge>
                </Link>
            </Menu.Item>
            <Menu.SubMenu
                className="link"
                title={<Fragment>Kế hoạch thẩm định</Fragment>}
            >
                <Menu.Item>
                    <Link to={url.URL_KE_HOACH_THAM_DINH_HO_SO_ATTP}>
                        <Badge count={countKeHoach.total} showZero className="badge-dashboard badge-primary">
                            <div>Tất cả</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_KE_HOACH_THAM_DINH_HO_SO_ATTP}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.CHOPHEDUYET}`}>
                        <Badge count={countKeHoach.choPheDuyet} showZero className="badge-dashboard badge-warning">
                            <div>Kế hoạch chờ phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item className="menu-dashboard-success">
                    <Link to={`${url.URL_KE_HOACH_THAM_DINH_HO_SO_ATTP}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DAPHEDUYET}`}>
                        <Badge count={countKeHoach.daPheDuyet} showZero className="badge-dashboard badge-success">
                            <div>Kế hoạch đã phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_KE_HOACH_THAM_DINH_HO_SO_ATTP}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.KHONGPHEDUYET}`}>
                        <Badge count={countKeHoach.khongPheDuyet} showZero className="badge-dashboard badge-danger">
                            <div>Kế hoạch không phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_KE_HOACH_THAM_DINH_HO_SO_ATTP}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DANGHOANTHIEN}`}>
                        <Badge count={countKeHoach.dangHoanThien} showZero className="badge-dashboard badge-default">
                            <div>Kế hoạch đang hoàn thiện</div>
                        </Badge>
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    }

    return <React.Fragment>
        <div className="dashboard-item-container" key={0}>
            <div className="dashboard-item">
                <img src="/static/image/nghiepvu.png" alt="Phòng nghiệp vụ" />
                <div style={{ marginTop: 10 }}>
                    <div>
                        <Dropdown overlay={overlayHoSoGCN()} trigger={["click"]}>
                            <Badge count={countHoSo.total} className="badge-dashboard badge-primary" showZero>
                                <span className="link">
                                    Hồ sơ cấp GCN ATTP
                                </span>
                            </Badge>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="dashboard-title">
                <Link to={url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}>
                    PHÒNG NGHIỆP VỤ
                </Link>
            </div>
        </div>
    </React.Fragment >
}

export default DashboardPhongNghiepVu;