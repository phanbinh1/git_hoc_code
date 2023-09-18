import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, getFormValues, arrayRemove } from 'redux-form';
import { Table, Button, Modal, ConfigProvider } from "antd";
import * as actLoaiHinhCoSo from "./../../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";

const LoaiHinhCoSo = ({ form }) => {
    const [visible, setVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const formValues = useSelector(state => getFormValues(form)(state));

    const loaiHinhCoSoTree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);
    const dispatch = useDispatch();
    const changeValue = (fieldName, value) => dispatch(change(form, fieldName, value));
    const getLoaiHinhCoSoTree = (object) => dispatch(actLoaiHinhCoSo.getTreeRequest(object))
    useEffect(() => {
        getLoaiHinhCoSoTree();
    }, []);

    const getData = useCallback(() => {
        return getDataChildren(loaiHinhCoSoTree) || [];
    }, [loaiHinhCoSoTree]);

    const getDataChildren = (list) => {
        if (list && Array.isArray(list) && list.length > 0) {
            return list.map((item) => {
                return {
                    ...item,
                    key: item.id,
                    ten: item.label,
                    ma: item.value,
                    children: getDataChildren(item.children)
                }
            })
        }
        else {
            return undefined;
        }

    }

    const getDataSource = useCallback(() => {
        if (formValues && formValues.loaiHinhCoSoKeHoachThanhKiemTras) {
            return formValues.loaiHinhCoSoKeHoachThanhKiemTras;
        }
        return [];
    }, [formValues && formValues.loaiHinhCoSoKeHoachThanhKiemTras])

    const rowSelection = useCallback(() => {
        return {
            selectedRowKeys: selectedRowKeys.map((item) => item.id),
            onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRowKeys(selectedRows);
            },
        }
    }, [selectedRowKeys]);

    const onAdd = useCallback(() => {
        setSelectedRowKeys(formValues && formValues.loaiHinhCoSoKeHoachThanhKiemTras ? formValues.loaiHinhCoSoKeHoachThanhKiemTras.map((item) => ({ ...item, id: item.idLoaiHinhCoSo })) : []);
        setVisible(true)
    }, [formValues && formValues.loaiHinhCoSoKeHoachThanhKiemTras]);
    const onRemove = (index) => dispatch(arrayRemove(form, "loaiHinhCoSoKeHoachThanhKiemTras", index))
    return <React.Fragment>
        <Modal
            title="Danh sách loại hình cơ sở"
            visible={visible}
            onCancel={() => {
                setVisible(false);
                setSelectedRowKeys([]);
            }}
            width={800}
            onOk={() => {
                changeValue("loaiHinhCoSoKeHoachThanhKiemTras", selectedRowKeys.map((item) => {
                    return {
                        maLoaiHinhCoSo: item.ma,
                        tenLoaiHinhCoSo: item.ten,
                        idLoaiHinhCoSo: item.id
                    }
                }));
                setVisible(false);
                setSelectedRowKeys([]);
            }}
            okText={<React.Fragment><i className="fa fa-pencil m-r-5" />Cập nhật</React.Fragment>}
            cancelText={<React.Fragment><i className="fa fa-times m-r-5" />Hủy</React.Fragment>}
            style={{ top: 50 }}
            destroyOnClose
        >
            <Table
                rowKey="id"
                key="tbl-loai-hinh-co-so-1"
                size="small"
                pagination={false}
                bordered
                rowSelection={rowSelection()}
                dataSource={getData()}
                columns={[
                    {
                        title: "Tên loại hình cơ sở",
                        render: (_, r) => {
                            return r.ten;
                        }
                    }
                ]}
            />
        </Modal>
        <div className="col-md-12">
            <ConfigProvider renderEmpty={() => "Chưa có loại hình cơ sở!"}>
                <Table
                    rowKey="idLoaiHinhCoSo"
                    key="tbl-loai-hinh-co-so-2"
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
                            title: "Tên loại hình cơ sở",
                            render: (_, r) => {
                                return r.tenLoaiHinhCoSo;
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
                                <i className="fa fa-plus m-r-5" />Thêm loại hình
                            </Button>
                        </React.Fragment>
                    }}
                />
            </ConfigProvider>
        </div>
    </React.Fragment>
}

export default LoaiHinhCoSo;