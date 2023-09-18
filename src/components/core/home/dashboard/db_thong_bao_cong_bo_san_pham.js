import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actThongBaoCongBoSanPham from "./../../../../actions/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham";
import * as url from "./../../../../constants/url";
import { Badge } from "antd";

const DashboardThongBaoCongBoSanPham = () => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const getAllRequest = (object = {}) => dispatch(actThongBaoCongBoSanPham.getAllRequest(object));
    useEffect(() => {
        getAllRequest({
            errorNotifi: false,
            requestSuccess: (res) => {
                if (res && res.pagination && res.pagination.total) {
                    setCount(res.pagination.total);
                }
            },

        })
    }, [])
    return <React.Fragment>
        <div className="dashboard-item-container" key={0}>
            <div className="dashboard-item">
                <img src="/static/image/thongbao.png" alt="Thông báo công bố sản phẩm" className="dashboard-img" />
                <div style={{ marginTop: 10 }}>
                    <div>
                        <Badge count={count} showZero className="badge-dashboard badge-primary">
                            <Link to={url.URL_THONG_BAO_HO_SO_TU_CONG_BO}>
                                Thông báo công bố sản phẩm
                            </Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="dashboard-title">
                <Link to={url.URL_THONG_BAO_HO_SO_TU_CONG_BO}>
                    THÔNG BÁO <br />CÔNG BỐ SẢN PHẨM
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default DashboardThongBaoCongBoSanPham;