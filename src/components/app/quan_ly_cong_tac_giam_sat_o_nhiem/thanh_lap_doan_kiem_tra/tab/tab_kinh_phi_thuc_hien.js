import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, arrayPush, arrayRemove, formValueSelector } from 'redux-form';
import { Table, Button, Divider, ConfigProvider, Empty } from "antd";
import { FieldCurrency, FieldTextArea } from "./../../../../../constants/controll";
import * as main from "./../../../../../constants/main";
import * as validate from "./../../../../../constants/validate";
import * as constants from "./../../../../../constants/constants";

const KinhPhiThucHien = ({ form }) => {
    const fChiTietKinhPhis = useSelector(state => formValueSelector(form)(state, "chiTietKinhPhis")) || [];
    const dispatch = useDispatch();
    const onAdd = () => dispatch(arrayPush(form, "chiTietKinhPhis", {}))
    const onRemove = (index) => dispatch(arrayRemove(form, "chiTietKinhPhis", index))
    const renderData = () => {
        return fChiTietKinhPhis.map((item, i) => {
            return {
                key: i,
                ...item,
            };
        })
    };

    const sumTongTien = () => {
        let res = 0;
        fChiTietKinhPhis.map((item) => {
            if (item.kinhPhi && !isNaN(item.kinhPhi)) {
                res += parseInt(item.kinhPhi, 0);
            }
            return res;
        })
        return {
            number: res,
            currency: main.convertNumberToCurrency(res)
        };
    };

    return <React.Fragment>
        <div className="col-md-12">
            <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                <Table
                    rowKey={record => {
                        return record.key;
                    }}
                    key="tbl-kinh-phi"
                    size="small"
                    pagination={false}
                    bordered
                    dataSource={renderData()}
                    columns={[
                        {
                            title: "STT",
                            width: 50,
                            align: "center",
                            render: (_, r, index) => {
                                return index + 1;
                            }
                        },
                        {
                            title: "Nội dung",
                            render: (_, r, index) => {
                                return <React.Fragment>
                                    <Field
                                        component={FieldTextArea}
                                        name={`chiTietKinhPhis[${index}].noiDung`}
                                        placeholder="Nội dung"
                                        checkValid={true}
                                        autoSize={true}
                                        validate={validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_NOIDUNG_REQUIRED}
                                    />
                                </React.Fragment>
                            }
                        },
                        {
                            title: "Kinh phí (VNĐ)",
                            width: 300,
                            render: (_, r, index) => {
                                return <React.Fragment>
                                    <Field
                                        component={FieldCurrency}
                                        name={`chiTietKinhPhis[${index}].kinhPhi`}
                                        placeholder="Kinh phí"
                                        checkValid={true}
                                        validate={validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_KINHPHI_REQUIRED}
                                    />
                                </React.Fragment>
                            }
                        },
                        {
                            title: "Thao tác",
                            width: 80,
                            align: "center",
                            render: (_, r, index) => {
                                return <React.Fragment>
                                    <Button className="ant-btn-dangerous" onClick={() => onRemove(index)} size={constants.CONST_BTN_SIZE_DEFAULT}>
                                        <i className="fa fa-trash" />
                                    </Button>
                                </React.Fragment>
                            }
                        }
                    ]}
                    title={() => {
                        return <React.Fragment>
                            <Button type="primary" onClick={onAdd} size={constants.CONST_BTN_SIZE_DEFAULT}>
                                <i className="fa fa-plus m-r-5" />Thêm kinh phí
                            </Button>
                        </React.Fragment>
                    }}
                />
            </ConfigProvider>
            <Divider orientation="right">Tổng kinh phí: <b>{sumTongTien().currency} VNĐ</b></Divider>
        </div>
    </React.Fragment>
}

export default KinhPhiThucHien;