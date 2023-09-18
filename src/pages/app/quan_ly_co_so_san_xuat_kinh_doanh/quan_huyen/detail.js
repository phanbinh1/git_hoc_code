import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Tag } from 'antd';
import * as actBieuMau from "./../../../../actions/app/quan_ly_bieu_mau/bieu_mau";
import * as act from "./../../../../actions";
import { CommonViewPdf } from '../../../../components/common';
import { AntIcon } from '../../../../components/antd';

const BieuMauDetail = ({ queryVariable }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorLabel, setErrorLabel] = useState("Có lỗi xảy ra!");
    const dispatch = useDispatch();
    const getOneRequest = (obj) => dispatch(actBieuMau.getOneRequest(obj));

    const [url, setUrl] = useState(null);

    const getItem = () => {
        setLoading(true);
        if (queryVariable.id && !isNaN(queryVariable.id)) {
            const id = parseInt(queryVariable.id, 0);
            getOneRequest({
                data: { id },
                requestSuccess: async (res) => {
                    if (res.result) {
                        setError(false);
                        const res1 = await act.ConvertHtmlToPdfBase64({ data: { fileName: "a", html: `${res.result.maHtml}<p><center><img src="${res.result.qrCode}"/></center></p>` } })
                        setUrl(res1.result)
                        setLoading(false)
                    }
                    else {
                        setErrorLabel(<Fragment>Không tìm thấy văn bản có id là <b>{id}</b></Fragment>)
                        setError(true);
                        setLoading(false);
                    }
                },
                requestError: () => {
                    setError(true);
                    setErrorLabel("Có lỗi xảy ra!");
                    setLoading(false)
                }
            })
        }
        else {
            setLoading(false);
            setError(true);
            setErrorLabel("Có lỗi xảy ra!");
        }
    }
    useEffect(() => {
        getItem();
    }, [queryVariable.id]);

    return (
        <React.Fragment>
            {
                loading ?
                    <Alert style={{ margin: 20 }} icon={<AntIcon type="loading" />} type="info" message="Đang tải dữ liệu..." showIcon /> :
                    error ?
                        <Alert
                            style={{ margin: 20 }}
                            type="error"
                            showIcon
                            icon={<i className="fa fa-exclamation-circle " />}
                            message="Thông báo lỗi!"
                            description={
                                <div className="row">
                                    <div className="col-md-12">
                                        {errorLabel}
                                        <div className="pull-right">
                                            <Tag
                                                color="blue"
                                                className="c-pointer"
                                                onClick={getItem}
                                            >
                                                <i className="fa fa-refresh m-r-5" />Thử lại
                                                </Tag>
                                        </div>
                                    </div>
                                </div>
                            }
                        /> :
                        <Fragment>
                            <CommonViewPdf
                                url={url}
                                height="calc(100vh - 52px)"
                            />
                            {/* <CommonEditor
                                content={`${item.maHtml}<p><center><img src='${item.qrCode}'/></center></p>`}
                                readOnly
                                height="calc(100vh - 54px)"
                                width="793px"
                            /> */}
                        </Fragment>
            }
        </React.Fragment >
    );
}

export default BieuMauDetail;