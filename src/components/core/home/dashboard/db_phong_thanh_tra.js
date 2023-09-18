import React, { useState, useEffect } from "react";
import AbortController from "abort-controller";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actKHTT from "./../../../../actions/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/ke_hoach_thanh_tra/ke_hoach_thanh_tra";
import * as actCTT from "./../../../../actions/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cuoc_thanh_tra/cuoc_thanh_tra";
import * as actPAKN from "./../../../../actions/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/ho_so/ho_so";
import * as url from "./../../../../constants/url";
import * as constants from "./../../../../constants/constants";
import { Badge, Dropdown, Menu } from "antd";

const DashboardPhongThanhTra = () => {
    const [controller1] = useState(new AbortController());
    const [controller2] = useState(new AbortController());
    const [controller3] = useState(new AbortController());
    const [countPAKN, setCountPAKN] = useState(0);

    const [countCuocThanhTra, setCountCuocThanhTra] = useState({
        total: 0,
        keHoach: {
            total: 0,
            choPheDuyet: 0,
            dangHoanThien: 0,
            daPheDuyet: 0,
            khongPheDuyet: 0
        },
        dotXuat: {
            total: 0,
            choPheDuyet: 0,
            dangHoanThien: 0,
            daPheDuyet: 0,
            khongPheDuyet: 0
        }
    });

    const [countKeHoach, setCountKeHoach] = useState({
        khongPheDuyet: 0,
        daPheDuyet: 0,
        dangHoanThien: 0,
        choPheDuyet: 0,
        total: 0
    })

    const dispatch = useDispatch();
    const countKeHoachRequest = object => dispatch(actKHTT.countRequest(object));
    const countCuocThanhTraRequest = object => dispatch(actCTT.countRequest(object));
    const getAllPAKN = object => dispatch(actPAKN.getAllRequest(object));
    useEffect(() => {
        countKeHoachRequest({
            controller: controller1,
            errorNotifi: false,
            requestSuccess: (res) => {
                setCountKeHoach(res);
            }
        })
        countCuocThanhTraRequest({
            controller: controller2,
            errorNotifi: false,
            requestSuccess: (res) => {
                setCountCuocThanhTra(res.result);
            }
        })
        getAllPAKN({
            controller: controller3,
            errorNotifi: false,
            currentPage: 1, pageSize: 1,
            requestSuccess: (res) => {
                if (res && res.pagination && res.pagination.total) {
                    setCountPAKN(res.pagination.total);
                }
            }
        })
        return () => {
            controller1.abort();
            controller2.abort();
            controller3.abort();
        }
    }, [])

    const overlayKeHoachThanhTra = () => {
        return <Menu>
            <Menu.Item>
                <Link to={url.URL_QTNVTT_KE_HOACH_THANH_TRA}>
                    <Badge count={countKeHoach.total} showZero className="badge-dashboard badge-primary">
                        <div>Tất cả</div>
                    </Badge>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={`${url.URL_QTNVTT_KE_HOACH_THANH_TRA}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.CHOPHEDUYET}`}>
                    <Badge count={countKeHoach.choPheDuyet} showZero className="badge-dashboard badge-warning">
                        <div>Chờ phê duyệt</div>
                    </Badge>
                </Link>
            </Menu.Item>
            <Menu.Item className="menu-dashboard-success">
                <Link to={`${url.URL_QTNVTT_KE_HOACH_THANH_TRA}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DAPHEDUYET}`}>
                    <Badge count={countKeHoach.daPheDuyet} showZero className="badge-dashboard badge-success">
                        <div>Đã phê duyệt</div>
                    </Badge>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={`${url.URL_QTNVTT_KE_HOACH_THANH_TRA}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.KHONGPHEDUYET}`}>
                    <Badge count={countKeHoach.khongPheDuyet} showZero className="badge-dashboard badge-danger">
                        <div>Không phê duyệt</div>
                    </Badge>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={`${url.URL_QTNVTT_KE_HOACH_THANH_TRA}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DANGHOANTHIEN}`}>
                    <Badge count={countKeHoach.dangHoanThien} showZero className="badge-dashboard badge-default">
                        <div>Đang hoàn thiện</div>
                    </Badge>
                </Link>
            </Menu.Item>
        </Menu>
    }

    const overlayCuocThanhTra = () => {
        return <Menu>
            <Menu.SubMenu title="Thanh - kiểm tra theo kế hoạch">
                <Menu.Item>
                    <Link to={url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH}>
                        <Badge count={countCuocThanhTra.keHoach.total} showZero className="badge-dashboard badge-primary">
                            <div>Tất cả</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.CHOPHEDUYET}`}>
                        <Badge count={countCuocThanhTra.keHoach.choPheDuyet} showZero className="badge-dashboard badge-warning">
                            <div>Chờ phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item className="menu-dashboard-success">
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DAPHEDUYET}`}>
                        <Badge count={countCuocThanhTra.keHoach.daPheDuyet} showZero className="badge-dashboard badge-success">
                            <div>Đã phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.KHONGPHEDUYET}`}>
                        <Badge count={countCuocThanhTra.keHoach.khongPheDuyet} showZero className="badge-dashboard badge-danger">
                            <div>Không phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DANGHOANTHIEN}`}>
                        <Badge count={countCuocThanhTra.keHoach.dangHoanThien} showZero className="badge-dashboard badge-default">
                            <div>Đang hoàn thiện</div>
                        </Badge>
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Thanh - kiểm tra đột xuất">
                <Menu.Item>
                    <Link to={url.URL_QTNVTT_CUOC_THANH_TRA_DOT_XUAT}>
                        <Badge count={countCuocThanhTra.dotXuat.total} showZero className="badge-dashboard badge-primary">
                            <div>Tất cả</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_DOT_XUAT}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.CHOPHEDUYET}`}>
                        <Badge count={countCuocThanhTra.dotXuat.choPheDuyet} showZero className="badge-dashboard badge-warning">
                            <div>Chờ phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item className="menu-dashboard-success">
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_DOT_XUAT}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DAPHEDUYET}`}>
                        <Badge count={countCuocThanhTra.dotXuat.daPheDuyet} showZero className="badge-dashboard badge-success">
                            <div>Đã phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_DOT_XUAT}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.KHONGPHEDUYET}`}>
                        <Badge count={countCuocThanhTra.dotXuat.khongPheDuyet} showZero className="badge-dashboard badge-danger">
                            <div>Không phê duyệt</div>
                        </Badge>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`${url.URL_QTNVTT_CUOC_THANH_TRA_DOT_XUAT}?trangThaiPheDuyet=${constants.CONST_PHE_DUYET.DANGHOANTHIEN}`}>
                        <Badge count={countCuocThanhTra.keHoach.dangHoanThien} showZero className="badge-dashboard badge-default">
                            <div>Đang hoàn thiện</div>
                        </Badge>
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    }

    return <React.Fragment>
        <div className="dashboard-item-container" key={0}>
            <div className="dashboard-item">
                <img src="/static/image/thanhtra.png" alt="Phòng thanh tra" />
                <div style={{ marginTop: 10 }}>
                    <Dropdown overlay={overlayKeHoachThanhTra()} trigger={["click"]}>
                        <div className="dashboard-item-line">
                            <Badge count={countKeHoach.total} showZero className="badge-dashboard badge-primary">
                                <div className="link">Kế hoạch thanh tra</div>
                            </Badge>
                        </div>
                    </Dropdown>
                    <Dropdown overlay={overlayCuocThanhTra()} trigger={["click"]}>
                        <div className="dashboard-item-line">
                            <Badge count={countCuocThanhTra.total} showZero className="badge-dashboard badge-primary">
                                <div className="link">Cuộc thanh tra</div>
                            </Badge>
                        </div>
                    </Dropdown>
                    <div className="dashboard-item-line">
                        <Badge count={countPAKN} showZero className="badge-dashboard badge-primary">
                            <Link to={url.URL_PAKN_HO_SO}>Hồ sơ phản ánh kiến nghị</Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="dashboard-title">
                <Link to={url.URL_QTNVTT_KE_HOACH_THANH_TRA}>
                    PHÒNG THANH TRA
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default DashboardPhongThanhTra;