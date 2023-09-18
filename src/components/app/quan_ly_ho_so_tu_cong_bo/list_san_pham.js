import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayPush, arrayMove, getFormValues, Field, change } from "redux-form";
import { CommonFormContent, CommonAttachments } from "../../common";
import { Table, Button, Drawer, Tooltip } from "antd";
import { FieldInput, FieldTextArea, FieldSelect, FieldDate, FieldSelectLoadMore, FieldCheckbox } from "./../../../constants/controll";
import * as constants from "./../../../constants/constants";
import * as validate from "./../../../constants/validate";
import { API_TCB_NHOM, API_TCB_NHOM_PHAN_NHOM } from "../../../constants/api";

const ListSanPham = ({
    form,
    loaiCongBo,
    isTiepNhan = false,
    allowChange = true,
    checkMin = false,
    add = true,
    isUpdate
}) => {
    const dispatch = useDispatch();
    const onAdd = () => dispatch(arrayPush(form, "danhSachSanPhamCongBo", {}));
    const onRemove = (index = -1) => dispatch(arrayMove(form, "danhSachSanPhamCongBo", index));
    const formValues = useSelector(state => getFormValues(form)(state));
    const danhSachSanPhamCongBo = formValues && formValues.danhSachSanPhamCongBo && Array.isArray(formValues.danhSachSanPhamCongBo) ? formValues.danhSachSanPhamCongBo : [];
    let showRemoveBtn = true;
    if (checkMin && danhSachSanPhamCongBo.length <= 1) {
        showRemoveBtn = false;
    }

    useEffect(() => {
        if (danhSachSanPhamCongBo.length < 1) {
            onAdd();
        }
    }, [danhSachSanPhamCongBo.length]);

    return <Fragment>
        <CommonFormContent
            data={[
                [
                    {
                        type: "custom",
                        renderCustom: <TableSanPham
                            loaiCongBo={loaiCongBo}
                            isUpdate={isUpdate}
                            key="tbl-sp"
                            onAdd={onAdd}
                            add={add}
                            dataSource={danhSachSanPhamCongBo}
                            isTiepNhan={isTiepNhan}
                            allowChange={allowChange}
                            onRemove={onRemove}
                            showRemoveBtn={showRemoveBtn}
                            form={form}
                        />
                    }
                ]
            ]}
        />
    </Fragment>
}

export const TableSanPham = ({
    loaiCongBo,
    isUpdate = false,
    add,
    dataSource = [],
    onAdd,
    onRemove,
    isTiepNhan = false,
    allowChange = false,
    fieldName = "danhSachSanPhamCongBo",
    showRemoveBtn = true,
    form
}) => {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState(null);
    const dispatch = useDispatch();
    const formValues = useSelector(state => getFormValues(form)(state));

    const changeValues = (fieldIndex, value) => dispatch(change(form, `${fieldName}[${fieldIndex}].files`, value));

    const allowDelete = onRemove && typeof onRemove === "function" && showRemoveBtn;
    const allowAttachFile = !(loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO || (isUpdate && loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO));

    const getWidthTable = () => {
        let res = 250;
        if (loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO) {
            res += 400;
        }
        if (!isTiepNhan) {
            res += 950;
        }
        if (allowAttachFile) {
            res += 130;
        }
        if (allowDelete) {
            res += 80;
        }
        return res;
    }
    return <Fragment>
        <Drawer
            visible={visible}
            onClose={() => setVisible(false)}
            title={<Fragment><i className="fa fa-paperclip m-r-10" />Tài liệu đính kèm</Fragment>}
            width={400}
            destroyOnClose
        >
            {item && <CommonAttachments
                attachEntityType={constants.CONST_ATTACH_TYPE.HOSO_CONGBOSANPHAM}
                entityId={item && item.id ? item.id : null}
                listFile={item && item.id ? [] : (formValues && formValues.danhSachSanPhamCongBo && formValues.danhSachSanPhamCongBo[item.index] && formValues.danhSachSanPhamCongBo[item.index].files ? formValues.danhSachSanPhamCongBo[item.index].files : [])}
                onChange={(files) => {
                    if (item && !item.id && typeof item.index === "number") {
                        changeValues(item.index, files);
                    }
                }}
            />}
        </Drawer>
        <Table
            style={{ marginBottom: 10 }}
            bordered
            size="small"
            pagination={false}
            rowKey="stt"
            columns={[
                { title: "STT", width: 50, fixed: "left", align: "center", render: (_, r, i) => i + 1 },
                {
                    width: 200,
                    title: "Tên sản phẩm", render: (_, r, i) => {
                        return allowChange ?
                            <Field
                                name={`${fieldName}[${i}].tenSanPham`}
                                component={FieldTextArea}
                                placeholder="Tên sản phẩm"
                                autoSize={{ maxRows: 3 }}
                                checkValid={true}
                                validate={[validate.VALIDATE_HS_TCB_TEN_SAN_PHAM_REQUIRED]}
                            /> :
                            r.tenSanPham;
                    }
                },
                ...(
                    isTiepNhan ? [
                        {
                            width: 160,
                            title: "Số giấy biên nhận cũ",
                            render: (_, r, i) => {
                                return allowChange ?
                                    <Field
                                        name={`${fieldName}[${i}].soGiayBienNhanDaCongBo`}
                                        component={FieldInput}
                                        placeholder="Số GBN"
                                        addonAfter="/TCB"
                                    /> :
                                    r.soGiayBienNhanDaCongBo;
                            }
                        }
                    ] :
                        []
                ),
                ...(
                    loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ? [
                        {
                            width: 200,
                            title: "Số tự công bố",
                            render: (_, r, i) => {
                                return allowChange ?
                                    <Field
                                        name={`${fieldName}[${i}].soTuCongBo`}
                                        component={FieldInput}
                                        placeholder="Số tự công bố"
                                    /> :
                                    r.soTuCongBo;
                            }
                        },
                        {
                            width: 200,
                            title: "Thời điểm TCB",
                            render: (_, r, i) => {
                                return allowChange ?
                                    <Field
                                        name={`${fieldName}[${i}].thoiDiemTuCongBo`}
                                        component={FieldDate}
                                        placeholder="Thời điểm TCB"
                                    /> :
                                    r.thoiDiemTuCongBo;
                            }
                        },
                    ] : []
                ),
                ...(isTiepNhan ? [] : [
                    {
                        width: 100,
                        title: "NK", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].nguonGoc`}
                                    component={FieldSelect}
                                    placeholder="NK"
                                    options={constants.CONST_NGUOC_GOC_SAN_PHAM.options}
                                /> :
                                r.nguonGoc;
                        }
                    },
                    {
                        width: 200,
                        title: "Xuất xứ", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].xuatXu`}
                                    component={FieldTextArea}
                                    placeholder="Xuất xứ"
                                    autoSize={{ maxRows: 3 }}
                                /> :
                                r.xuatXu;
                        }
                    },
                    {
                        width: 150,
                        title: "Hạn dùng", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].thoiHanSuDung`}
                                    component={FieldInput}
                                    placeholder="Hạn dùng"
                                /> :
                                r.thoiHanSuDung;
                        }
                    },
                    {
                        width: 200,
                        title: "Thành phần", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].thanhPhan`}
                                    component={FieldTextArea}
                                    placeholder="Thành phần"
                                    autoSize={{ maxRows: 3 }}
                                /> :
                                r.thanhPhan;
                        }
                    },
                    {
                        width: 270,
                        title: "Sản phẩm OCOP", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].isSanPhamOcop`}
                                    component={FieldSelect}
                                    placeholder="Là sản phẩm"
                                    options={[
                                        {
                                            value: 1,
                                            label: "Là sản phẩm tham gia hỗ trợ OCOP"
                                        },
                                        {
                                            value: 0,
                                            label: "Không phải sản phẩm OCOP"
                                        },
                                    ]}
                                /> :
                                r.isSanPhamOcop;
                        }
                    },
                    {
                        width: 250,
                        title: "Xếp hạng sao", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].sepHangSao`}
                                    component={FieldSelect}
                                    placeholder="Xếp hạng sao"
                                    options={[
                                        {
                                            value: 1,
                                            label: "1 sao"
                                        },
                                        {
                                            value: 2,
                                            label: "2 sao"
                                        },
                                        {
                                            value: 3,
                                            label: "3 sao"
                                        },
                                        {
                                            value: 4,
                                            label: "4 sao"
                                        },
                                        {
                                            value: 5,
                                            label: "5 sao"
                                        },
                                    ]}
                                /> :
                                r.sepHangSao;
                        }
                    },
                    {
                        width: 200,
                        title: "Nhóm", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].danhMucNhom.id`}
                                    component={FieldSelectLoadMore}
                                    placeholder="Nhóm"
                                    url={API_TCB_NHOM}
                                    valueKey="id"
                                    labelKey="tenNhom"
                                    searchKey="searchData"
                                    searchKeyExtend="tenNhom"
                                    selectDefaultValue={r.danhMucNhom}
                                /> :
                                r.danhMucNhom && r.danhMucNhom.tenNhom ? r.danhMucNhom.tenNhom : null;
                        }
                    },
                    {
                        width: 200,
                        title: "Phân nhóm", render: (_, r, i) => {
                            return allowChange ?
                                <Field
                                    name={`${fieldName}[${i}].danhMucPhanNhom.id`}
                                    component={FieldSelectLoadMore}
                                    placeholder="Phân nhóm"
                                    url={API_TCB_NHOM_PHAN_NHOM}
                                    valueKey="id"
                                    labelKey="tenPhanNhom"
                                    searchKey="searchData"
                                    searchKeyExtend="tenPhanNhom"
                                    selectDefaultValue={r.danhMucPhanNhom}
                                /> :
                                r.danhMucPhanNhom && r.danhMucPhanNhom.tenPhanNhom ? r.danhMucPhanNhom.tenPhanNhom : null;
                        }
                    },
                ]),
                {
                    // width: 200,
                    title: "Ghi chú", render: (_, r, i) => {
                        return allowChange ?
                            <Field
                                name={`${fieldName}[${i}].ghiChu`}
                                component={FieldTextArea}
                                placeholder="Ghi chú"
                                autoSize={{ maxRows: 3 }}
                            /> :
                            r.ghiChu;
                    }
                },
                ...(
                    !allowAttachFile && !allowDelete ? [] : [
                        {
                            width: allowAttachFile && allowDelete ? 90 : 50,
                            fixed: "right",
                            align: "center",
                            render: (_, r, index) => {
                                return <Fragment>
                                    {
                                        allowAttachFile && <Tooltip title="Tài liệu đính kèm">
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    setItem({ ...dataSource[index], index });
                                                    setVisible(true);
                                                }}
                                                shape="circle"
                                            >
                                                <i className="fa fa-paperclip" />
                                            </Button>
                                        </Tooltip>
                                    }
                                    {
                                        allowDelete && <Tooltip title="Xóa">
                                            <Button className="m-l-10 ant-btn-dangerous" onClick={() => onRemove(index)} shape="circle">
                                                <i className="fa fa-trash" />
                                            </Button>
                                        </Tooltip>
                                    }
                                </Fragment>
                            }
                        }
                    ]
                )
            ]}
            scroll={{ x: getWidthTable() }}
            dataSource={dataSource}
            title={add ? () => {
                return <Fragment>
                    <div className="row">
                        <div className="col-md-12">
                            {onAdd && typeof onAdd === "function" && <div className="pull-left">
                                <Button type="primary" onClick={onAdd}>
                                    <i className="fa fa-plus m-r-10" />Thêm sản phẩm
                                </Button>
                            </div>}
                        </div>
                    </div>
                </Fragment>
            } : undefined}
        />
    </Fragment>
}
export default ListSanPham;