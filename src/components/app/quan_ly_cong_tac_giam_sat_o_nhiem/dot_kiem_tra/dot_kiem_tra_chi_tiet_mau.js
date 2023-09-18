import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Button, Input, DatePicker, Checkbox, Popconfirm } from "antd";
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actDotKiemTra from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/dot_kiem_tra/dot_kiem_tra";
import { dateFormat } from "./../../../../constants/controll";
import moment from "moment";

const ChiTieuGiamSat = ({ visible, onClose }) => {
    const [chiTieuGiamSat, setChiTieuGiamSat] = useState([]);
    const [tieuChis, setTieuChis] = useState([]);
    const [listDanhGia, setListDanhGia] = useState([]);
    const [tieuChiVisible, setTieuChiVisible] = useState(false);
    const [idChiTieuGiamSat, setIdChiTieuGiamSat] = useState(null);
    const dotKiemTra = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.dot_kiem_tra.item);

    const dispatch = useDispatch();
    const getTieuChiByIdChiTieu = (object) => dispatch(actDotKiemTra.getTieuChiByIdChiTieu(object));

    useEffect(() => {
        setChiTieuGiamSat(Array.isArray(dotKiemTra.chiTieuGiamSatfkid) ? dotKiemTra.chiTieuGiamSatfkid : []);
    }, [dotKiemTra]);



    return <React.Fragment>
        <Drawer
            destroyOnClose
            visible={visible}
            onClose={onClose}
            width={1000}
            title="Chỉ tiêu giám sát"
        >
            <Drawer
                destroyOnClose
                visible={tieuChiVisible}
                onClose={() => setTieuChiVisible(false)}
                width={1000}
                title="Danh sách mẫu"
            >
                <DanhSachMau
                    tieuChis={tieuChis}
                    idChiTieuGiamSat={idChiTieuGiamSat}
                    listDanhGia={listDanhGia}
                />
            </Drawer>
            <CommonTable
                columns={[
                    {
                        title: "STT",
                        dataIndex: "stt",
                        width: 50,
                        align: "center"
                    },
                    {
                        title: "Nhóm thực phẩm",
                        dataIndex: "loaiThucPham.tenLoaiThucPham",
                        className: "v-a-top",
                        width: 160
                    },
                    {
                        title: "Số mẫu đã lấy",
                        dataIndex: "soMauDaLay",
                        width: 160,
                        align: "center"
                    },
                    {
                        title: "Số mẫu chưa lấy",
                        dataIndex: "soMauChuaLay",
                        className: "v-a-top",
                        width: 160
                    },
                    {
                        title: "Số mẫu đạt chuẩn",
                        dataIndex: "soMauDatChuan",
                        width: 150,
                        align: "center"
                    },
                    {
                        title: "Số mẫu chưa đạt chuẩn",
                        dataIndex: "soMauChuaDatChuan",
                        className: "v-a-top",
                        width: 150
                    },
                    {
                        title: "Trạng thái",
                        dataIndex: "trangThai",
                        className: "v-a-top",
                        width: 160
                    },
                    {
                        title: "Kết luận",
                        dataIndex: "ketLuan",
                        className: "v-a-top",
                        width: 160
                    },
                    {
                        title: "Ghi chú",
                        dataIndex: "ghiChu",
                        width: 150,
                        align: "center"
                    },
                    {
                        title: "Thao tác",
                        className: "v-a-top",
                        fixed: "right",
                        align: "center",
                        width: 140,
                        render: (_, record, index) => {
                            return <CommonTableAction
                                actions={[
                                    {
                                        onClick: () => {
                                            setTieuChis([]);
                                            setIdChiTieuGiamSat(null);
                                            getTieuChiByIdChiTieu({
                                                data: { id: record.id },
                                                requestSuccess: (res) => {
                                                    setIdChiTieuGiamSat(record.id);
                                                    setTieuChis(res.result.listTieuChi);
                                                    setListDanhGia(res.result.listDanhSachDanhGia);
                                                    setTieuChiVisible(true);
                                                }
                                            })
                                        },
                                        icon: "fa fa-list",
                                        label: "Danh sách mẫu"
                                    },
                                ]}
                            />
                        }
                    },
                ]}
                hasSelectRow={false}
                hasRowFake={false}
                loading={false}
                scrollY={false}
                isPagination={false}
                dataSource={chiTieuGiamSat.map(item => ({ ...item, key: item.id }))}
            />

        </Drawer>

    </React.Fragment>
}

const DanhSachMau = ({ tieuChis, idChiTieuGiamSat, listDanhGia = [] }) => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const danhGiaMauCreateRequest = (object) => dispatch(actDotKiemTra.danhGiaMauCreateRequest(object));
    const danhGiaMauUpdateRequest = (object) => dispatch(actDotKiemTra.danhGiaMauUpdateRequest(object));
    const danhGiaMauDeleteRequest = (object) => dispatch(actDotKiemTra.danhGiaMauDeleteRequest(object));

    useEffect(() => {
        let _data = [], _item, value = false, index = -1;;
        listDanhGia.map((item) => {
            _item = {
                idMau: item.mauGiamSat.id,
                tenMau: item.mauGiamSat.tenMau,
                ngayLayMau: item.mauGiamSat.ngayLayMau,
                nguoiLayMau: item.mauGiamSat.nguoiLayMau,
                nguonGoc: item.mauGiamSat.nguonGoc,
                ketLuan: item.ketLuan,
            }
            tieuChis.map((tieuChi) => {
                index = item.listDanhGiaMau.findIndex(dgm => dgm.idTieuChiDotGiamSat === tieuChi.id);
                value = index !== -1 ? item.listDanhGiaMau[index].ketQua : false;
                _item[tieuChi.id] = { id: tieuChi.id, value }
                return _item;
            })
            return _data.push(_item);
        })
        setData(_data);
    }, []);
    const childrenChiTieu = () => {
        return tieuChis.map((tieuChi) => {
            return { title: tieuChi.tenTieuChi, width: 100, dataIndex: `${tieuChi.id}`, align: "center" };
        })
    };

    const onAdd = () => {
        let item = {};
        tieuChis.map((tieuChi) => {
            item[tieuChi.id] = { id: tieuChi.id, value: false }
            return item;
        })
        setData([
            ...data,
            item
        ]);
    }

    const onRemove = (index) => {
        let _data = [...data];
        const value = data[index];
        if (value.idMau) { //Gửi api xóa -> nếu xóa thành công thì xóa ngoài giao diện
            const item = {
                mauGiamSat: { id: value.idMau, tenMau: value.tenMau },
                idChiTieuGiamSat
            }
            danhGiaMauDeleteRequest({
                data: item,
                requestSuccess: () => {
                    _data.splice(index, 1)
                    setData(_data);
                }
            })
        }
        else {  // Xóa thẳng ngoài giao diện
            _data.splice(index, 1)
            setData(_data);
        }
    }

    const onSave = (index) => {
        const value = data[index];
        const item = {
            listDanhGiaMau: tieuChis.map((tieuChi) => {
                return {
                    idChiTieuGiamSat: idChiTieuGiamSat,
                    idTieuChiDotGiamSat: tieuChi.id,
                    ketQua: value[tieuChi.id].value
                };
            }),
            mauGiamSat: {
                tenMau: value.tenMau ? value.tenMau : null,
                ngayLayMau: value.ngayLayMau ? value.ngayLayMau : null,
                nguoiLayMau: value.nguoiLayMau ? value.nguoiLayMau : null,
                nguonGoc: value.nguonGoc ? value.nguonGoc : null,
                idChiTieuGiamSat
            },
            ketLuan: value.ketLuan,
            idChiTieuGiamSat
        }
        if (value.idMau) {
            item.mauGiamSat.id = value.idMau;
            danhGiaMauUpdateRequest({
                data: item,
                requestSuccess: (res) => {
                    const item = res.result;
                    let _data = {
                        idMau: item.mauGiamSat.id,
                        tenMau: item.mauGiamSat.tenMau,
                        ngayLayMau: item.mauGiamSat.ngayLayMau,
                        nguoiLayMau: item.mauGiamSat.nguoiLayMau,
                        nguonGoc: item.mauGiamSat.nguonGoc,
                        ketLuan: item.ketLuan,
                    }
                    item.listDanhGiaMau.map((val) => {
                        _data[val.idTieuChiDotGiamSat] = {
                            id: val.idTieuChiDotGiamSat,
                            value: val.ketQua
                        }
                        return _data;
                    })
                    onChange(_data, index);
                }
            })
        }
        else {
            danhGiaMauCreateRequest({
                data: item,
                requestSuccess: (res) => {
                    const item = res.result;
                    let _data = {
                        idMau: item.mauGiamSat.id,
                        tenMau: item.mauGiamSat.tenMau,
                        ngayLayMau: item.mauGiamSat.ngayLayMau,
                        nguoiLayMau: item.mauGiamSat.nguoiLayMau,
                        nguonGoc: item.mauGiamSat.nguonGoc,
                        ketLuan: item.ketLuan,
                    }
                    item.listDanhGiaMau.map((val) => {
                        _data[val.idTieuChiDotGiamSat] = {
                            id: val.idTieuChiDotGiamSat,
                            value: val.ketQua
                        }
                        return _data;
                    })
                    onChange(_data, index);
                }
            })
        }
    }

    const renderAction = (item, index) => {
        return <div style={{ textAlign: "center" }}>
            <Popconfirm
                title="Bạn chắc chắn muốn xóa?"
                okText="Đồng ý"
                onConfirm={() => onRemove(index)}
                cancelText="Hủy"
            >
                <Button
                    type="danger"
                    size="small"
                    className="m-r-5"
                    children={<i className="fa fa-trash" />}
                />
            </Popconfirm>
            <Button
                type="primary"
                size="small"
                onClick={() => onSave(index)}
                children={<i className="fa fa-save" />}
            />
        </div>
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
                nguonGoc: <Input.TextArea
                    autosize
                    value={item.nguonGoc}
                    onChange={(e) => onChange({ ...item, nguonGoc: e.target.value }, i)}
                    placeholder="Nguồn gốc"
                />,
                ketLuan: <Input
                    value={item.ketLuan}
                    onChange={(e) => onChange({ ...item, ketLuan: e.target.value }, i)}
                    placeholder="Kết luận"
                />,
            }
            tieuChis.map((tieuChi) => {
                val[tieuChi.id] = <Checkbox
                    checked={item[tieuChi.id] ? item[tieuChi.id].value : false}
                    onChange={(e) => {
                        let _item = { ...item };
                        _item[tieuChi.id].value = e.target.checked;
                        onChange(_item, i)
                    }}
                />
                // val[tieuChi.id] = <CheckboxCustom
                //     value={item[tieuChi.id] ? item[tieuChi.id].value : false}
                //     onChange={(value) => {
                //         let _item = { ...item };
                //         _item[tieuChi.id].value = value;
                //         onChange(_item, i)
                //     }}
                // />
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

    return <React.Fragment>
        <div className="form-group">
            <div className="row">
                <div className="col-md-12">
                    <div className="pull-left">
                        <b>Tổng cộng: </b> {data.length} đánh giá
                        </div>
                    <div className="pull-right">
                        <Button onClick={onAdd} type="primary">
                            <i className="fa fa-plus m-r-5" />Thêm đánh giá
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <CommonTable
            columns={[
                { title: "STT", dataIndex: "stt", width: 50, align: "center" },
                { title: "Tên mẫu", width: 150, dataIndex: "tenMau" },
                { title: "Ngày lấy", width: 150, dataIndex: "ngayLayMau" },
                { title: "Người lấy", width: 130, dataIndex: "nguoiLayMau" },
                { title: "Nguồn gốc", width: 150, dataIndex: "nguonGoc" },
                { title: "Kết quả giám sát các chỉ tiêu", children: childrenChiTieu() },
                { title: "Kết luận", width: 100, dataIndex: "ketLuan" },
                { title: "Thao tác", width: 100, fixed: "right", dataIndex: "action" }
            ]}
            hasSelectRow={false}
            hasRowFake={false}
            loading={false}
            scrollY={false}
            isPagination={false}
            dataSource={renderData()}
            paginationPlacement={false}
        />
    </React.Fragment>
}

export default ChiTieuGiamSat;

// const CheckboxCustom = ({ value, onChange }) => {
//     const [checked, setChecked] = useState(value);
//     const change = (e) => {
//         const val = e.target.checked ? (checked === false ? true : false) : (checked === true ? null : false);
//         setChecked(val);
//         onChange(val);
//     }
//     return <Checkbox
//         className="cb-3-op"
//         checked={checked === true ? true : false}
//         onChange={change}
//         indeterminate={checked === null}
//     />
// }