import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, DatePicker, Checkbox, Popconfirm, Modal, Tooltip, Select, Tree, Table } from "antd";
import * as actBienBanThamDinh from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/bien_ban_tham_dinh";
import * as actDMNhomThucPham from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/loai_thuc_pham/loai_thuc_pham";
import { dateFormat } from "./../../../../constants/controll";
import _ from 'lodash';
import moment from "moment";

const DanhSachMau = ({ danhSachMauThamDinhChuoiThucPham = [], bienBan, setDsBienBan, dsBienBan, onClose }) => {
    const [nhomThucPhams, setNhomThucPhams] = useState([]);
    const [data, setData] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [tableKey, setTableKey] = useState(1);
    const [visibleModal, setVisibleModal] = useState(false);
    const [tieuChis, setTieuChis] = useState([])

    const dispatch = useDispatch();
    const update = (object) => dispatch(actBienBanThamDinh.updateRequest(object));
    const getAllNhomThucPham = object => dispatch(actDMNhomThucPham.getAllRequest(object));

    useEffect(() => {
        getAllNhomThucPham({
            isPagination: false,
            requestSuccess: (res) => {
                if (res && res.result) {
                    setNhomThucPhams(res.result);
                }
            }
        })
        let _tieuChis = [], index = -1;
        danhSachMauThamDinhChuoiThucPham.map((item) => {
            item.danhSachDanhGiaMauThamDinhChuoiThucPham.map((tieuChi) => {
                index = _tieuChis.findIndex(val => val.idTieuChi === tieuChi.idTieuChi);
                if (index === -1) {
                    _tieuChis.push(tieuChi);
                }
                return _tieuChis;
            })
            return _tieuChis;
        })
        setTieuChis(_tieuChis);

        let _data = [], _item;
        danhSachMauThamDinhChuoiThucPham.map((item) => {
            _item = {
                id: item.id,
                tenMau: item.tenMau,
                ngayLayMau: item.ngayLayMau,
                nguoiLayMau: item.nguoiLayMau,
                nguonGocXuatXu: item.nguonGocXuatXu,
                idNhomThucPham: item.idNhomThucPham,
                ghiChu: item.ghiChu,
            }
            _tieuChis.map((tieuChi) => {
                index = item.danhSachDanhGiaMauThamDinhChuoiThucPham.findIndex(val => val.idTieuChi === tieuChi.idTieuChi);
                if (index === -1) {
                    _item[tieuChi.idTieuChi] = {
                        idTieuChi: tieuChi.idTieuChi,
                        value: null
                    }
                }
                else {
                    _item[tieuChi.idTieuChi] = {
                        idTieuChi: tieuChi.idTieuChi,
                        value: item.danhSachDanhGiaMauThamDinhChuoiThucPham[index].danhGiaTieuChi
                    }
                }
                return _item;
            })
            return _data.push(_item);
        })
        setData(_data);
        setFirstLoad(false);
    }, []);

    useEffect(() => {
        if (!firstLoad) {
            let _data = [], _item;
            data.map((item) => {
                _item = {
                    id: item.id,
                    tenMau: item.tenMau,
                    ngayLayMau: item.ngayLayMau,
                    nguoiLayMau: item.nguoiLayMau,
                    nguonGocXuatXu: item.nguonGocXuatXu,
                    idNhomThucPham: item.idNhomThucPham,
                    ghiChu: item.ghiChu,
                }
                tieuChis.map((tieuChi) => {
                    if (item.hasOwnProperty(tieuChi.idTieuChi)) {
                        _item[tieuChi.idTieuChi] = {
                            idTieuChi: tieuChi.idTieuChi,
                            value: item[tieuChi.idTieuChi].value
                        }
                    }
                    else {
                        _item[tieuChi.idTieuChi] = {
                            idTieuChi: tieuChi.idTieuChi,
                            value: null
                        }
                    }
                    return _item;
                })
                return _data.push(_item);
            })
            setData(_data);
            setTableKey(tableKey + 1);
        }
    }, [tieuChis, nhomThucPhams, firstLoad]);

    const childrenTieuChi = () => {
        return _.orderBy(tieuChis, ['idTieuChi'], ['asc']).map((tieuChi) => {
            return {
                title: tieuChi.tenTieuChi,
                width: 100,
                dataIndex: `${tieuChi.idTieuChi}`,
                align: "center"
            };
        })
    };

    const onAdd = () => {
        let item = {};
        tieuChis.map((tieuChi) => {
            item[tieuChi.idTieuChi] = {
                idTieuChi: tieuChi.idTieuChi,
                value: null
            }
            return item;
        })
        setData([
            ...data,
            item
        ]);
    };

    const onRemove = (index) => {
        let _data = [...data];
        _data.splice(index, 1)
        setData(_data);
    }

    const getNhomThucPhamById = (id) => {
        const index = nhomThucPhams.findIndex(item => item.id === id);
        return nhomThucPhams[index];
    }

    const onSave = () => {
        let nhomThucPham;
        const _data = data.map((item) => {
            nhomThucPham = getNhomThucPhamById(item.idNhomThucPham);
            return {
                ...(item.id ? { id: item.id } : {}),
                ...(nhomThucPham ?
                    {
                        idNhomThucPham: nhomThucPham.id,
                        tenNhomThucPham: nhomThucPham.tenLoaiThucPham
                    } : {}),
                tenMau: item.tenMau,
                ngayLayMau: item.ngayLayMau,
                nguoiLayMau: item.nguoiLayMau,
                nguonGocXuatXu: item.nguonGocXuatXu,
                ghiChu: item.ghiChu,
                danhSachDanhGiaMauThamDinhChuoiThucPham: tieuChis.map((tc) => {
                    return {
                        idTieuChi: tc.idTieuChi,
                        tenTieuChi: tc.tenTieuChi,
                        danhGiaTieuChi: item[tc.idTieuChi].value
                    }
                })
            }
        })

        if (bienBan && bienBan.id) {
            const values = {
                ...bienBan,
                danhSachMauThamDinhChuoiThucPham: [..._data]
            };
            update({
                data: values,
                requestSuccess: (res) => {
                    typeof onClose === "function" && onClose();
                    setDsBienBan(dsBienBan.map((item) => item.id === res.result.id ? res.result : item
                    ));
                },
                requestError: () => { }
            })
        }
        else {
            alert("Lỗi");
        }
    }

    const renderAction = (item, index) => {
        return <div style={{ textAlign: "center" }}>
            <Popconfirm
                title="Bạn chắc chắn muốn xóa?"
                okText="Đồng ý"
                onConfirm={() => onRemove(index)}
                cancelText="Hủy"
                okType="danger"
            >
                <Button type="danger" className="m-r-5"><i className="fa fa-trash m-r-5" />Xóa</Button>
            </Popconfirm>
        </div>
    }

    const renderOptions = () => {
        return nhomThucPhams.map((nhomTP, i) => {
            return <Select.Option key={i} value={nhomTP.id}>
                {nhomTP.tenLoaiThucPham}
            </Select.Option>
        })
    }

    const renderData = () => {
        let val = {};
        return data.map((item, i) => {
            val = {
                key: i,
                action: renderAction(item, i),
                tenMau: <Input
                    value={item.tenMau}
                    onChange={(e) => onChange({ ...item, tenMau: e.target.value }, i)}
                    placeholder="Tên mẫu"
                />,
                ngayLayMau: <DatePicker
                    format={dateFormat}
                    value={moment(item.ngayLayMau, dateFormat).isValid() ? moment(item.ngayLayMau, dateFormat) : undefined}
                    onChange={(_, value) => {
                        onChange({ ...item, ngayLayMau: value }, i)
                    }}
                    placeholder="Ngày lấy"
                />,
                nguoiLayMau: <Input
                    value={item.nguoiLayMau}
                    onChange={(e) => onChange({ ...item, nguoiLayMau: e.target.value }, i)}
                    placeholder="Người lấy"
                />,
                nguonGocXuatXu: <Input.TextArea
                    autosize
                    value={item.nguonGocXuatXu}
                    onChange={(e) => onChange({ ...item, nguonGocXuatXu: e.target.value }, i)}
                    placeholder="Nguồn gốc xuất xứ"
                />,
                idNhomThucPham: <Select
                    value={item.idNhomThucPham}
                    style={{ width: "100%" }}
                    placeholder="Nhóm thực phẩm"
                    onChange={(value) => onChange({ ...item, idNhomThucPham: value }, i)}
                >
                    {renderOptions()}
                </Select>,
                ghiChu: <Input.TextArea
                    autosize
                    value={item.ghiChu}
                    onChange={(e) => onChange({ ...item, ghiChu: e.target.value }, i)}
                    placeholder="Ghi chú"
                />,
            }
            tieuChis.map((tieuChi) => {
                val[tieuChi.idTieuChi] = <CheckboxCustom
                    value={item[tieuChi.idTieuChi] ? item[tieuChi.idTieuChi].value : false}
                    onChange={(value) => {
                        let _item = { ...item };
                        _item[tieuChi.idTieuChi].value = value;
                        onChange(_item, i)
                    }}
                />
                return val;
            })
            return val;
        })
    }

    const onChange = (item, index) => {
        let _data = [...data];
        _data[index] = item;
        setData(_data);
    }

    const onAddChiTieu = (() => {
        setVisibleModal(true);
    })

    return <React.Fragment>
        <FormTieuChi
            nhomThucPhams={nhomThucPhams}
            tieuChis={tieuChis}
            visible={visibleModal}
            onOk={(tieuChis) => {
                setTieuChis(tieuChis);
                setVisibleModal(false)
            }}
            onCancel={() => setVisibleModal(false)}
        />
        <div className="form-group">
            <div className="row">
                <div className="col-md-12">
                    <div className="pull-left">
                        <b>Tổng cộng: </b> {data.length} đánh giá
                        </div>
                    <div className="pull-right">
                        <Button onClick={onAddChiTieu} className="m-r-5" type="success">
                            <i className="fa fa-pencil-square-o m-r-5" />Cập nhật tiêu chí
                        </Button>
                        <Button onClick={onAdd} className="m-r-5">
                            <i className="fa fa-plus m-r-5" />Thêm đánh giá
                        </Button>
                        <Button type="primary" onClick={onSave}>
                            <i className="fa fa-save m-r-5" />Lưu thay đổi
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <Table
            key={tableKey}
            columns={[
                { title: "STT", dataIndex: "stt", width: 50, align: "center", render: (t, r, i) => i + 1 },
                { title: "Tên mẫu", width: 150, dataIndex: "tenMau" },
                { title: "Ngày lấy", width: 150, dataIndex: "ngayLayMau" },
                { title: "Người lấy", width: 130, dataIndex: "nguoiLayMau" },
                { title: "Nhóm thực phẩm", width: 130, dataIndex: "idNhomThucPham" },
                { title: "Nguồn gốc xuất xứ", width: 170, dataIndex: "nguonGocXuatXu" },
                { title: "Kết quả giám sát các tiêu chí", width: childrenTieuChi().length * 100, children: childrenTieuChi() },
                { title: "Ghi chú", dataIndex: "ghiChu" },
                { title: "Thao tác", width: 100, fixed: "right", dataIndex: "action" }
            ]}
            scroll={{ x: 1100 + childrenTieuChi().length * 100 }}
            bordered
            size="small"
            pagination={false}
            dataSource={renderData()}
        />
    </React.Fragment >
}

export default DanhSachMau;

const CheckboxCustom = ({ value, onChange }) => {
    const [checked, setChecked] = useState(value);
    const change = (e) => {
        const val = e.target.checked ? (checked === null ? true : null) : (checked === true ? false : null);
        setChecked(val);
        onChange(val);
    }
    return <Tooltip title={
        checked === true ? <React.Fragment><i className="fa fa-check-circle m-r-5" />Đạt</React.Fragment> :
            checked === false ? <React.Fragment><i className="fa fa-times-circle m-r-5" />Không Đạt</React.Fragment> :
                <React.Fragment><i className="fa fa-minus-circle m-r-5" />Không đánh giá</React.Fragment>
    }>
        <Checkbox
            className="cb-3-op"
            checked={checked === true ? true : false}
            onChange={change}
            indeterminate={checked === false}
        />
    </Tooltip >
}

const FormTieuChi = ({ onOk, onCancel, visible, nhomThucPhams, tieuChis }) => {
    const [treeData, setTreeData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [defaultTreeData, setDefaultTreeData] = useState([])
    const [defaultCheckedItems, setDefaultCheckedItems] = useState([]);

    useEffect(() => {
        const _treeData = nhomThucPhams.map((item) => {
            return {
                title: item.tenLoaiThucPham,
                idNhom: `nhom-${item.id}`,
                key: item.id,
                children: item.listChiTieu.map((tc) => {
                    return {
                        key: tc.id,
                        idTieuChi: tc.id,
                        title: tc.tenChiTieu,
                        tenTieuChi: tc.tenChiTieu,
                        value: null
                    }
                })
            }
        });
        setTreeData(_treeData);
        setDefaultTreeData(_treeData);
    }, [nhomThucPhams]);
    useEffect(() => {
        setCheckedItems(tieuChis);
        setDefaultCheckedItems(tieuChis);
    }, [tieuChis])

    const onCheck = (checkedKeys, info) => {
        setCheckedItems(
            info.checkedNodes.map((item) => {
                return item.props;
            })
        )
    }

    return <React.Fragment>
        <Modal
            visible={visible}
            onCancel={() => {
                onCancel();
                setTreeData(defaultTreeData);
                setCheckedItems(defaultCheckedItems);
            }}
            onOk={() => {
                let data = [];
                checkedItems.map((item) => {
                    if (item.idTieuChi) {
                        data.push(item);
                    }
                    return data;
                })
                onOk(data);
                setTreeData(defaultTreeData);
                setCheckedItems(defaultCheckedItems);
            }}
            okText={<React.Fragment><i className="fa fa-save m-r-5" />Cập nhật</React.Fragment>}
            cancelText={<React.Fragment><i className="fa fa-times m-r-5" />Đóng</React.Fragment>}
            destroyOnClose
            title={<React.Fragment><i className="fa fa-square-plus m-r-5" />Thêm chỉ tiêu đánh giá</React.Fragment>}
        >
            <Tree.DirectoryTree
                defaultExpandAll
                checkable
                selectedKeys={[]}
                checkedKeys={checkedItems.map((item) => (`${item.idTieuChi ? item.idTieuChi : item.idNhom}`))}
                onCheck={onCheck}
                treeData={treeData}
            />
        </Modal>

    </React.Fragment>
}