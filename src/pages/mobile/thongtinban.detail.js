import { Alert, Descriptions } from "antd";
import { Markup } from "interweave";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { queryString } from "../../constants/main";
import { getDetail } from "./web-api";

export default () => {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState(0);
    const location = useLocation();
    const _qs = queryString.parse(location.search);
    useEffect(() => {
        const getChiTiet = async (id) => {
            setStatus(0);
            const res = await getDetail(id);
            if (res.errorCode === 0) {
                setItem(res.data);
                setStatus(1);
            }
            else {
                setStatus(-1);
            }
        }
        getChiTiet(_qs.id);
    }, [_qs.id])

    return <Fragment>
        <div style={{ padding: 20, height: "calc(100vh - 60px)", overflow: "auto" }}>
            {
                status === 0 ?
                    <Alert message="Loading..." /> :
                    (status === 1 && item) ?
                        <Fragment>
                            <h5 color="#027be3">{item.title}</h5>
                            <div className="ttb-detail">
                                <Markup content={item.content} />
                            </div>
                        </Fragment> :
                        <Alert type="error" message="Lỗi" />
            }
        </div>
    </Fragment>
}