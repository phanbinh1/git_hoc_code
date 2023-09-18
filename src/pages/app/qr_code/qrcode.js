import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "antd";
import * as actQrcode from "./../../../actions/app/qrcode/qrcode";
import * as url from "./../../../constants/url";
import * as actID from "./../../../constants/action_id";
import { useHistory } from "react-router";
import { queryString } from "../../../constants/main";
import { getCauHinh } from "../../../util/api_call";

const QRCode = ({
    queryVariable,
}) => {
    const [cauHinhs, setCauHinhs] = useState(null);
    const auth = useSelector(state => state.core.auth);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const qrcodeValid = (object) => dispatch(actQrcode.qrcodeValidPublic(object));
    useEffect(async () => {
        const res = await getCauHinh({ ma: "qrcode_redirect" });
        if (res.status) {
            const { result } = res;
            let cauHinhs = [];
            try {
                const _cauHinhs = JSON.parse(result.giaTri);
                if (_cauHinhs && Array.isArray(_cauHinhs)) {
                    cauHinhs = _cauHinhs;
                }
            }
            catch (e) { }
            setCauHinhs(cauHinhs);
        }
    }, [])
    useEffect(() => {
        if (queryVariable.url) {
            const url = new URL(decodeURIComponent(queryVariable.url || ""));
            if (url.hostname === window.location.hostname) {
                history.replace(`${url.pathname}${url.search}${url.hash}`);
            }
            else {
                setLoading(false);
            }
        }
        else if (queryVariable.id && !isNaN(queryVariable.id) && cauHinhs !== null) {
            qrcodeValid({
                data: { id: parseInt(queryVariable.id, 0) },
                requestSuccess: (res) => {
                    const { result } = res;
                    const loaiDoiTuong = result.loaiDoiTuong;
                    const cauHinh = cauHinhs.filter(item => item.loaiDoiTuong === loaiDoiTuong);
                    switch (cauHinh.length) {
                        case 0:
                            setLoading(false);
                            break;
                        case 1:
                            const { pathname, search } = cauHinh[0];
                            if (!cauHinh[0].auth && (!auth || !auth.authenticated)) {
                                history.replace({
                                    pathname,
                                    search: queryString.stringify({
                                        id: result.idDoiTuong,
                                        qrcode_redirect: 1,
                                        qrcode_number_of_scans: result.soLanQuet || 0,
                                        qrcode_id: result.id,
                                        ...(queryString.parse(search || ""))
                                    })
                                })
                                setLoading(false);
                                break;
                            }
                            else {
                                history.replace({
                                    pathname,
                                    search: queryString.stringify({
                                        id: result.idDoiTuong,
                                        qrcode_redirect: 1,
                                        qrcode_number_of_scans: result.soLanQuet || 0,
                                        qrcode_id: result.id,
                                        ...(queryString.parse(search || ""))
                                    })
                                })
                                setLoading(false);
                                break;
                            }
                        default:
                            const cauHinhAuth = cauHinh.find(item => item.auth);
                            const cauHinhNotAuth = cauHinh.find(item => !item.auth);
                            if (!auth || !auth.authenticated) {
                                history.replace({
                                    pathname: cauHinhNotAuth.pathname,
                                    search: queryString.stringify({
                                        id: result.idDoiTuong,
                                        qrcode_redirect: 1,
                                        qrcode_number_of_scans: result.soLanQuet || 0,
                                        qrcode_id: result.id,
                                        ...(queryString.parse(cauHinhNotAuth.search || ""))
                                    })
                                })
                                setLoading(false);
                                break;
                            }
                            else {
                                history.replace({
                                    pathname: cauHinhAuth.pathname,
                                    search: queryString.stringify({
                                        id: result.idDoiTuong,
                                        qrcode_redirect: 1,
                                        qrcode_number_of_scans: result.soLanQuet || 0,
                                        qrcode_id: result.id,
                                        ...(queryString.parse(cauHinhAuth.search || ""))
                                    })
                                })
                                setLoading(false);
                                break;
                            }
                    }
                    return;
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
    }, [queryVariable.id, queryVariable.url, auth, cauHinhs]);

    return <React.Fragment>
        <div className="col-md-12" style={{ height: "100%", padding: "20px" }}>
            {
                loading ?
                    <Alert message="Đang tải dữ liệu..." type="info" showIcon /> :
                    <Alert message="Mã QR-Code không hợp lệ" type="error" showIcon />
            }
        </div>
    </React.Fragment>
}

export default QRCode;