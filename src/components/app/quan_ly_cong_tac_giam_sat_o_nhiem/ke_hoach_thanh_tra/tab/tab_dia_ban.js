import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, getFormValues, arrayRemove } from 'redux-form';
import { Table, Button, Modal, ConfigProvider } from "antd";
import * as actDiaBan from "./../../../../../actions/app/danh_muc/dia_ban/dia_ban";
import * as constants from "./../../../../../constants/constants";

const TabDiaBan = ({ form }) => {
    const [visible, setVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const formValues = useSelector(state => getFormValues(form)(state));

    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const dispatch = useDispatch();
    const changeValue = (fieldName, value) => dispatch(change(form, fieldName, value));
    const getDiaBan = (object) => dispatch(actDiaBan.getAllRequest(object));
    useEffect(() => {
        getDiaBan({
            data: {
                parentCode: constants.CONST_DEFAULT_TINHTHANH.ma
            },
            requestSuccess: (res) => {
                setListQuanHuyen(res.result);
            }
        })
    }, []);

    const getDataSource = useCallback(() => {
        if (formValues && formValues.diaBanKeHoachThanhKiemTras) {
            return formValues.diaBanKeHoachThanhKiemTras;
        }
        return [];
    }, [formValues && formValues.diaBanKeHoachThanhKiemTras])

    const rowSelection = useCallback(() => {
        return {
            selectedRowKeys: selectedRowKeys.map((item) => item.id),
            onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRowKeys(selectedRows);
            }
        }
    }, [selectedRowKeys]);

    const onAdd = useCallback(() => {
        setSelectedRowKeys(formValues && formValues.diaBanKeHoachThanhKiemTras ? formValues.diaBanKeHoachThanhKiemTras.map((item) => ({ ...item, id: item.idDiaBan })) : []);
        setVisible(true)
    }, [formValues && formValues.diaBanKeHoachThanhKiemTras]);

    const onRemove = (index) => dispatch(arrayRemove(form, "diaBanKeHoachThanhKiemTras", index))

    return <React.Fragment>
        <Modal
            title="Danh Quận/ Huyện"
            visible={visible}
            onCancel={() => {
                setVisible(false);
                setSelectedRowKeys([]);
            }}
            width={800}
            onOk={() => {
                changeValue("diaBanKeHoachThanhKiemTras", selectedRowKeys.map((item) => {
                    return {
                        cap: item.cap,
                        ghiChu: item.ghiChu,
                        idDiaBan: item.id,
                        ma: item.ma,
                        maDiaBanCha: item.maDiaBanCha,
                        ten: item.ten,
                        tenTiengAnh: item.tenTiengAnh,
                    }
                }));
                setVisible(false);
                setSelectedRowKeys([]);
            }}
            okText={<React.Fragment><i className="fa fa-pencil m-r-5" />Cập nhật</React.Fragment>}
            cancelText={<React.Fragment><i className="fa fa-times m-r-5" />Hủy</React.Fragment>}
            destroyOnClose
        >
            <Table
                rowKey="id"
                key="tbl-dia-ban-1"
                size="small"
                pagination={false}
                bordered
                rowSelection={rowSelection()}
                dataSource={listQuanHuyen}
                columns={[
                    {
                        title: "Quận/Huyện",
                        render: (_, r) => {
                            return r.ten;
                        }
                    }
                ]}
            />
        </Modal>
        <div className="col-md-12">
            <ConfigProvider renderEmpty={() => "Chưa có Quận/Huyện!"}>
                <Table
                    rowKey="idDiaBan"
                    key="tbl-dia-ban-2"
                    size="small"
                    pagination={false}
                    bordered
                    columns={[
                        {
                            title: "STT",
                            width: 50,
                            render: (_, r, index) => (index + 1),
                            align: "center"
                        },
                        {
                            title: "Quận/Huyện",
                            render: (_, r) => {
                                return r.ten;
                            }
                        },
                        {
                            title: "Thao tác",
                            width: 80,
                            align: "center",
                            render: (_, r, index) => {
                                return <Button className="ant-btn-dangerous" onClick={() => onRemove(index)} size="small">
                                    <i className="fa fa-trash m-r-5" />Xóa
                                </Button>
                            }
                        }
                    ]}
                    dataSource={getDataSource()}
                    title={() => {
                        return <React.Fragment>
                            <Button
                                type="primary"
                                onClick={onAdd}
                            >
                                <i className="fa fa-plus m-r-5" />Thêm Quận/Huyện
                            </Button>
                        </React.Fragment>
                    }}
                />
            </ConfigProvider>
        </div>
    </React.Fragment>
}

export default TabDiaBan;