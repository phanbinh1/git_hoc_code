import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Descriptions, Tabs, Empty } from "antd";
import * as actHoSoTuCongBo from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as constants from "./../../../constants/constants";
import { CommonAttachments, CommonPheDuyet, CommonTrinhPheDuyet } from './../../../components/common';
import { CommonFieldset } from '../../../components/common';
import DrawerLuanChuyen from "./../../../components/app/quan_ly_thong_bao_cong_bo_san_pham/detail/drawer_luan_chuyen";
import { createNotifi, NOTIFI_CODE_HSTCB_TPD, NOTIFI_CODE_HSTCB_DPD, NOTIFI_CODE_HSTCB_CXL } from '../../../components/core/account_current/notification';
import { convertHoSo, getAllowAction } from './ho_so_tu_cong_bo';
import { AntIcon } from '../../../components/antd';
import { Link } from 'react-router-dom';
import { URL_HO_SO_TU_CONG_BO_DETAIL } from '../../../constants/url';

const { CONST_PHE_DUYET, CONST_PHONG_BAN } = constants;
const { NGHIEPVU } = CONST_PHONG_BAN;
const { CHOPHEDUYET, DAPHEDUYET } = CONST_PHE_DUYET;

const HoSoTuCongBoDetail = ({
    queryVariable,
    loaiCongBo
}) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const getOneRequest = (object) => dispatch(actHoSoTuCongBo.getOneRequest(object));
    const updateRequest = (obj) => dispatch(actHoSoTuCongBo.updateRequest(obj));

    const item = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.ho_so_tu_cong_bo.item);
    const [sanPham, setSanPham] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    const [luanChuyen, setLuanChuyen] = useState({
        visible: false,
        item: null,
        onCancel: () => setLuanChuyen(lc => ({ ...lc, visible: false }))
    })
    const [trinhPheDuyet, setTrinhPheDuyet] = useState({
        visible: false,
        item: null,
        onCancel: () => setTrinhPheDuyet(tpd => ({ ...tpd, visible: false }))
    })
    const [chuyenXuLy, setChuyenXuLy] = useState({
        visible: false,
        item: null,
        onCancel: () => setChuyenXuLy(cxl => ({ ...cxl, visible: false }))
    })
    const [pheDuyet, setPheDuyet] = useState({
        visible: false,
        item: null,
        onCancel: () => setPheDuyet(pd => ({ ...pd, visible: false }))
    })

    useEffect(() => {
        const allow = getAllowAction(item)(state);
        setAction([
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE,
                hidden: true
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_DELETE,
                hidden: true
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH,
                hidden: true
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_THONGBAOCONGBO,
                hidden: true
            },
            {
                key: actID.ACT_BACK,
                text: "Luân chuyển",
                hidden: error,
                iconClass: "fa fa-sliders m-r-10",
                handleClick: () => setLuanChuyen(lc => ({ ...lc, visible: true, item })),
                type: "success"
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_TRINH_PHE_DUYET,
                hidden: !allow.allowTrinhPheDuyet || error,
                type: "primary",
                handleClick: () => setTrinhPheDuyet(tpd => ({ ...tpd, visible: true, item }))
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CHUYEN_XU_LY,
                hidden: !allow.allowChuyenXuLy || error,
                handleClick: () => setChuyenXuLy(cxl => ({ ...cxl, visible: true, item }))
            },
            {
                key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_PHE_DUYET,
                hidden: !allow.allowPheDuyet || error,
                type: "primary",
                handleClick: () => setPheDuyet(pd => ({ ...pd, visible: true, item }))
            },
        ]);
    }, [error, item])

    useEffect(() => {
        if (queryVariable.id) {
            getOneRequest({
                data: { id: queryVariable.id },
                requestSuccess: (res) => {
                    if (res.status && res.result) {
                        const item = res.result;
                        if (item.loaiCongBo === loaiCongBo) {
                            if (loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO) {
                                item.danhSachSanPhamCongBo.length === 1 && setSanPham(item.danhSachSanPhamCongBo[0]);
                            }
                            else {
                                setSanPham(item.danhSachSanPhamCongBo);
                            }
                            setError(false);
                        }
                        else {
                            setError(true);
                        }
                    }
                    setLoading(false);
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
        else {
            setLoading(false);
        }
    }, [queryVariable]);

    const nguonGoc = (sp) => {
        const nguonGoc = constants.CONST_NGUOC_GOC_SAN_PHAM.options.find(val => val.value === sp.nguonGoc);
        return nguonGoc ? nguonGoc.label : null;
    }

    return <Fragment>
        <div className="col-md-12" style={{ height: "100%", padding: "20px" }}>
            {loading ? <Alert message="Đang tải dữ liệu..." type="info" showIcon icon={<AntIcon type="loading" />} /> :
                error ? <Alert message="Không thể tìm thấy hồ sơ!" type="error" showIcon /> :
                    <Fragment>
                        {/* Luân chuyển */}
                        <DrawerLuanChuyen
                            visible={luanChuyen.visible}
                            hoSo={luanChuyen.item}
                            key={luanChuyen.item ? luanChuyen.item.id : "lc-not-id"}
                            onClose={luanChuyen.onCancel}
                        />
                        {/* Chuyển xử lý */}
                        <CommonTrinhPheDuyet
                            key={chuyenXuLy.item ? chuyenXuLy.item.id : "cxl-not-id"}
                            title="Chuyển xử lý"
                            content="Bạn chắc chắn muốn chuyển xử lý?"
                            visible={chuyenXuLy.visible}
                            onCancel={chuyenXuLy.onCancel}
                            maPhongBans={chuyenXuLy.item && [convertHoSo(chuyenXuLy.item, "CXL")(state).hoSo.trangThaiChuyenHS.phongBan]}
                            chucVus={chuyenXuLy.item && [convertHoSo(chuyenXuLy.item, "CXL")(state).hoSo.trangThaiChuyenHS.chucVu]}
                            onOk={({ accountSelected }) => {
                                const { hoSo, msgSuccess, msgError } = convertHoSo(chuyenXuLy.item, "CXL", null, accountSelected)(state);
                                updateRequest({
                                    data: {
                                        entity: hoSo,
                                        listAttachFileId: [],
                                        msgSuccess,
                                        msgError
                                    },
                                    requestSuccess: () => {
                                        // CREATE_NOTIFICATION
                                        createNotifi({
                                            maThongBao: NOTIFI_CODE_HSTCB_CXL,
                                            chucVus: [hoSo.trangThaiChuyenHS.chucVu],
                                            phongBans: [hoSo.trangThaiChuyenHS.phongBan],
                                            nguoiNhans: accountSelected ? [accountSelected] : undefined,
                                            noiDungChiTiet: {
                                                id: hoSo.id,
                                                tenCoSo: hoSo.tenCoSo,
                                            }
                                        })
                                        chuyenXuLy.onCancel();
                                    }
                                })
                            }}
                        />

                        {/* Trình phê duyệt */}
                        <CommonTrinhPheDuyet
                            key={trinhPheDuyet.item ? trinhPheDuyet.item.id : "tpd-not-id"}
                            title="Chuyển xử lý"
                            content="Bạn chắc chắn muốn chuyển xử lý?"
                            visible={trinhPheDuyet.visible}
                            onCancel={trinhPheDuyet.onCancel}
                            maPhongBans={trinhPheDuyet.item && [convertHoSo(trinhPheDuyet.item, CHOPHEDUYET)(state).hoSo.trangThaiChuyenHS.phongBan]}
                            chucVus={trinhPheDuyet.item && [convertHoSo(trinhPheDuyet.item, CHOPHEDUYET)(state).hoSo.trangThaiChuyenHS.chucVu]}
                            onOk={({ accountSelected }) => {
                                const { hoSo, msgSuccess, msgError } = convertHoSo(trinhPheDuyet.item, CHOPHEDUYET, null, accountSelected)(state);
                                updateRequest({
                                    data: {
                                        entity: hoSo,
                                        listAttachFileId: [],
                                        msgSuccess,
                                        msgError
                                    },
                                    requestSuccess: () => {
                                        // CREATE_NOTIFICATION
                                        createNotifi({
                                            maThongBao: NOTIFI_CODE_HSTCB_TPD,
                                            chucVus: [hoSo.trangThaiChuyenHS.chucVu],
                                            phongBans: [hoSo.trangThaiChuyenHS.phongBan],
                                            nguoiNhans: accountSelected ? [accountSelected] : undefined,
                                            noiDungChiTiet: {
                                                id: hoSo.id,
                                                tenCoSo: hoSo.tenCoSo,
                                            }
                                        })
                                        trinhPheDuyet.onCancel();
                                    }
                                })
                            }}
                        />
                        {/* Phê duyệt */}
                        <CommonPheDuyet
                            key={pheDuyet.item ? pheDuyet.item.id : "pd-not-id"}
                            content={<Fragment>
                                Sau khi Xác nhận. Sẽ hoàn tất việc xử lý hồ sơ.<br />
                                Tất cả các hồ sơ tự công bố sẽ được hiển thị trên website
                            </Fragment>}
                            visible={pheDuyet.visible}
                            onCancel={pheDuyet.onCancel}
                            showConfirm={false}
                            showNotConfirm={false}
                            showOk
                            onOk={() => {
                                const { hoSo, msgSuccess, msgError } = convertHoSo(pheDuyet.item, DAPHEDUYET)(state);
                                updateRequest({
                                    data: { entity: hoSo, listAttachFileId: [], msgSuccess, msgError },
                                    requestSuccess: () => {
                                        // CREATE_NOTIFICATION
                                        createNotifi({
                                            maThongBao: NOTIFI_CODE_HSTCB_DPD,
                                            phongBans: [NGHIEPVU],
                                            noiDungChiTiet: {
                                                id: hoSo.id,
                                                tenCoSo: hoSo.tenCoSo,
                                            }
                                        })
                                        pheDuyet.onCancel();
                                    }
                                })
                            }}
                        />

                        <CommonFieldset title={<Fragment><i className="fa fa-file-text-o m-r-10" />Chi tiết hồ sơ</Fragment>}>
                            <Descriptions size="small" column={3} key="ho-so" className="m-b-10">
                                <Descriptions.Item label="Số giấy biên nhận" span={item.soGiayBienNhanDaCongBo ? 2 : 3}><b>{item.soGiayBienNhanTuCongBo}/TCB</b></Descriptions.Item>
                                {

                                    item.soGiayBienNhanDaCongBo && <Descriptions.Item label="Số GBN cũ" span={1}>
                                        <Link to={{
                                            pathname: URL_HO_SO_TU_CONG_BO_DETAIL,
                                            search: `id=${item.soGiayBienNhanDaCongBo}`
                                        }}>
                                            <b>{item.soGiayBienNhanDaCongBo}/TCB</b>
                                        </Link>
                                    </Descriptions.Item>
                                }

                                <Descriptions.Item label="Tên cơ sở" span={3}><b>{item.tenCoSo}</b></Descriptions.Item>

                                <Descriptions.Item label="Số giấy phép" span={2}>{item.soGiayPhepDkkd}</Descriptions.Item>
                                <Descriptions.Item label="Ngày cấp">{item.ngayCapGiayPhepDkkd}</Descriptions.Item>

                                <Descriptions.Item label="Số chứng nhận ATTP">{item.soChungNhanAttp}</Descriptions.Item>
                                <Descriptions.Item label="Ngày cấp">{item.ngayCapChungNhanAttp}</Descriptions.Item>
                                <Descriptions.Item label="Ngày hết hạn">{item.ngayHetHanChungNhanAttp}</Descriptions.Item>

                                <Descriptions.Item label="Số giấy xác nhận" >{item.soGiayXacNhanCongBo}</Descriptions.Item>
                                <Descriptions.Item label="Ngày cấp">{item.ngayCapXacNhanCongBo}</Descriptions.Item>
                                <Descriptions.Item label="Ngày tiếp nhận">{item.ngayTiepNhan}</Descriptions.Item>

                                <Descriptions.Item label="Ghi chú" span={3}>{item.ghiChu}</Descriptions.Item>

                                <Descriptions.Item label="Tài liệu đính kèm" span={3}>
                                    <CommonAttachments
                                        entityId={item.id}
                                        attachEntityType={constants.CONST_ATTACH_TYPE.HOSO_CONGBOSANPHAM}
                                        allowUpdate={false}
                                    />
                                </Descriptions.Item>
                            </Descriptions>
                        </CommonFieldset>
                        <CommonFieldset title={<Fragment><i className="fa fa-info-circle m-r-10" />Thông tin sản phẩm</Fragment>}>
                            {
                                loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ?
                                    <Descriptions size="small" column={2} key="san-pham" className="m-b-10">
                                        <Descriptions.Item label="Tên sản phầm">{sanPham.tenSanPham}</Descriptions.Item>
                                        <Descriptions.Item label="Nhập khẩu" >{nguonGoc(sanPham)}</Descriptions.Item>

                                        <Descriptions.Item label="Xuất xứ" >{sanPham.xuatXu}</Descriptions.Item>
                                        <Descriptions.Item label="Hạn dùng" >{sanPham.thoiHanSuDung}</Descriptions.Item>

                                        <Descriptions.Item label="Thành phần" span={2}>{sanPham.thanhPhan}</Descriptions.Item>

                                        <Descriptions.Item label="Nhóm">{sanPham.danhMucNhom && sanPham.danhMucNhom.tenNhom ? sanPham.danhMucNhom.tenNhom : null}</Descriptions.Item>
                                        <Descriptions.Item label="Phân nhóm">{sanPham.danhMucPhanNhom && sanPham.danhMucPhanNhom.tenPhanNhom ? sanPham.danhMucPhanNhom.tenPhanNhom : null}</Descriptions.Item>

                                        <Descriptions.Item label="Ghi chú" span={2} >{sanPham.ghiChu}</Descriptions.Item>
                                    </Descriptions> :
                                    <Fragment>
                                        {
                                            sanPham && Array.isArray(sanPham) && sanPham.length > 0 ?
                                                <Tabs tabPosition="left" className="tab-detail-san-pham-cong-bo m-b-10">
                                                    {
                                                        sanPham.map((sp, i) => {
                                                            return <Tabs.TabPane tab={sp.tenSanPham} key={i}>
                                                                <Descriptions size="small" column={2} key="san-pham" className="m-b-10">
                                                                    <Descriptions.Item label="Tên sản phầm" span={2}>{sanPham.tenSanPham}</Descriptions.Item>

                                                                    <Descriptions.Item label="Nhập khẩu" >{nguonGoc(sp)}</Descriptions.Item>
                                                                    <Descriptions.Item label="Xuất xứ" >{sp.xuatXu}</Descriptions.Item>

                                                                    <Descriptions.Item label="Hạn dùng" span={2}>{sp.thoiHanSuDung}</Descriptions.Item>

                                                                    <Descriptions.Item label="Thành phần" span={2}>{sp.thanhPhan}</Descriptions.Item>

                                                                    <Descriptions.Item label="Nhóm">{sp.danhMucNhom && sp.danhMucNhom.tenNhom ? sp.danhMucNhom.tenNhom : null}</Descriptions.Item>
                                                                    <Descriptions.Item label="Phân nhóm">{sp.danhMucPhanNhom && sp.danhMucPhanNhom.tenPhanNhom ? sp.danhMucPhanNhom.tenPhanNhom : null}</Descriptions.Item>

                                                                    <Descriptions.Item label="Ghi chú" span={2} >{sp.ghiChu}</Descriptions.Item>
                                                                </Descriptions>
                                                            </Tabs.TabPane>
                                                        })
                                                    }
                                                </Tabs> :
                                                <Empty description="Không có sản phẩm" />
                                        }

                                    </Fragment>
                            }
                        </CommonFieldset>
                    </Fragment>
            }
        </div>
    </Fragment >
}

export default HoSoTuCongBoDetail;