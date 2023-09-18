import React, { useEffect, useState } from "react";
import AbortController from "abort-controller";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actCoSoSanXuatKinhDoanh from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as url from "./../../../../constants/url";
import { Badge } from "antd";

const DashboardCoSoSanXuat = () => {
    const [controller] = useState(new AbortController());
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const countRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.countRequest(object));
    useEffect(() => {
        countRequest({
            controller,
            errorNotifi: false,
            requestSuccess: (res) => {
                if (res && res.total) {
                    setCount(res.total);
                }
            },
        });
        return () => {
            controller.abort();
        }
    }, [])
    return <React.Fragment>
        <div className="dashboard-item-container" key={0} >
            <div className="dashboard-item">
                <img src="/static/image/cososanxuat.png" alt="Cơ sở sản xuất kinh doanh" className="dashboard-img" />
                <div style={{ marginTop: 10 }}>
                    <div>
                        <Badge count={count} showZero className="badge-dashboard badge-primary">
                            <Link to={url.URL_CO_SO_SAN_XUAT_KINH_DOANH}>
                                Cơ sở sản xuất-kinh doanh
                            </Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="dashboard-title">
                <Link to={url.URL_CO_SO_SAN_XUAT_KINH_DOANH}>
                    CƠ SỞ <br />SẢN XUẤT - KINH DOANH
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default DashboardCoSoSanXuat;