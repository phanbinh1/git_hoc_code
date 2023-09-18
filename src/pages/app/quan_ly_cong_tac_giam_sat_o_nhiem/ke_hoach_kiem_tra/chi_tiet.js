import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Descriptions, Tag, Table, Badge, Popover, ConfigProvider, Modal, Empty, Button } from 'antd';
import { CONST_PHE_DUYET } from "./../../../../constants/constants";
import * as actKeHoachThanhTra from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra";
import * as actCuocThanhTra from "./../../../../actions/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cuoc_thanh_tra/cuoc_thanh_tra";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as url from "./../../../../constants/url";
import * as actID from "./../../../../constants/action_id";
import * as act from "./../../../../actions/index";
import { QuyetDinhBienBan } from '../../../../components/app/quan_ly_cong_tac_giam_sat_o_nhiem/common';
import CommonPheDuyet from '../../../../components/common/common_phe_duyet';
import ShowMoreText from 'react-show-more-text';
import { Markup } from "interweave";
import { CommonCurrency, CommonFieldset, CommonPhongBan } from '../../../../components/common';
import { AntIcon } from '../../../../components/antd';

const { DAPHEDUYET, KHONGPHEDUYET, CHOPHEDUYET, DANGHOANTHIEN, thanhTraOptions } = CONST_PHE_DUYET;
const KeHoachThanhTraDetail = ({ queryVariable, history }) => {
    const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
    const [listCuocThanhTra, setListCuocThanhTra] = useState([]);
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({});
    console.log("item-kinhphi: ", item)
    const [error, setError] = useState(false);
    const [errorLabel, setErrorLabel] = useState("Không thể lấy dữ liệu!");
    const dispatch = useDispatch();
    const getOneRequest = (obj) => dispatch(actKeHoachThanhTra.getOneRequest(obj));
    const pheDuyetRequest = (object = {}) => dispatch(actKeHoachThanhTra.pheDuyetRequest(object));
    const getListCuocThanhTraRequest = (obj) => dispatch(actCuocThanhTra.getAllRequest(obj))
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const getKeHoachPhongAllowAccess = () => {
        let result = [];
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QTNVTT.ACT_ALLOW_NGHIEP_VU) !== -1 && result.push("NGHIEPVU");
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QTNVTT.ACT_ALLOW_THANH_TRA) !== -1 && result.push("THANHTRA");
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QTNVTT.ACT_ALLOW_DOI1) !== -1 && result.push("DOI1");
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QTNVTT.ACT_ALLOW_DOI2) !== -1 && result.push("DOI2");
        return result;
    };

    const getItem = () => {
        if (queryVariable.id && !isNaN(queryVariable.id)) {
            const id = parseInt(queryVariable.id, 0);
            setLoading(true);
            getOneRequest({
                data: { id },
                requestSuccess: (res) => {
                    if (res.result) {
                        setError(false);
                        setItem(res.result);
                        getListCuocThanhTraRequest({
                            data: {
                                searchData: `idKeHoachThanhTra=${id}&child=YES&keHoachPhong=${getKeHoachPhongAllowAccess()}&phongBanPhoiHop=${getKeHoachPhongAllowAccess()}`
                            },
                            isPagination: false,
                            requestSuccess: (res) => {
                                setListCuocThanhTra(res.result);
                            }
                        });
                    }
                    else {
                        setItem({});
                        setErrorLabel(<Fragment>Không tìm thấy kế hoạch có id là <b>{id}</b></Fragment>);
                        setError(true);
                    }
                    setLoading(false);

                },
                requestError: () => {
                    setError(true);
                    setItem({});
                    setLoading(false);
                }
            })
        }
        else {
            setError(true);
        }
    }
    useEffect(() => {
        getItem();
    }, [queryVariable]);

    useEffect(() => {
        setAction([
            {
                key: actID.ACT_BACK,
                handleClick: () => history.go(-1)
            },
            {
                key: actID.ACT_ID_QTNVTT_KE_HOACH_THANH_TRA_DETAIL.ACT_PHE_DUYET,
                disabled: !(item && item.trangThaiDuyet === CHOPHEDUYET),
                handleClick: () => {
                    setVisiblePheDuyet(true);
                },
                type: "primary",
            }
        ])
    }, [item])

    const renderTrangThai = (keHoach) => {
        const trangThai = thanhTraOptions.find(item => item.value === keHoach.trangThaiDuyet);
        if (trangThai && trangThai.value === KHONGPHEDUYET) {
            return <Tag color={trangThai.color}>
                {trangThai.label.toLocaleUpperCase()}
                <Popover
                    title="Lý do không phê duyệt"
                    content={keHoach.lyDoKhongPheDuyet}
                    trigger={"click"}
                    overlayClassName="popover-warning"
                >
                    <Badge status="processing" color="red" className="m-l-10 c-pointer" />
                </Popover>
            </Tag>
        }
        else {
            return trangThai ? <Tag color={trangThai.color}>{trangThai.label.toLocaleUpperCase()}</Tag> : null;
        }
    }

    const renderPhongBanPhoiHop = () => {
        const phongBanPhoiHop = (item.phongBanPhoiHop || "").split(",");
        return phongBanPhoiHop.filter(pb => pb !== null && pb.trim() !== "").map(pb => <Tag className="c-pointer" color="#108ee9" ><CommonPhongBan maPhongBan={pb} /></Tag>)
    }


    const renderPhamVi = () => {
        console.log("item-ds-diaba: ", item)
        const diaBanKeHoachGiamSats
            = item && item.diaBanKeHoachGiamSats
                ? item.diaBanKeHoachGiamSats
                : [];
        const loaiHinhCoSoKeHoachThanhKiemTras = item && item.loaiHinhCoSoKeHoachThanhKiemTras ? item.loaiHinhCoSoKeHoachThanhKiemTras : [];

        return <Fragment>
            <Descriptions size="small" bordered column={1}>
                <Descriptions.Item label="Quận/Huyện">
                    <ShowMoreText
                        lines={5}
                        more='Xem thêm'
                        less='Xem ít hơn'
                        expanded={false}
                    >
                        {
                            diaBanKeHoachGiamSats
                                .length === 0 ?
                                "Không có địa bàn" :
                                diaBanKeHoachGiamSats
                                    .map((item) => {
                                        return <div key={item.id}> - {item.ten}</div>
                                    })
                        }
                    </ShowMoreText>
                </Descriptions.Item>
                <Descriptions.Item label="Loại hình">
                    <ShowMoreText
                        lines={5}
                        more='Xem thêm'
                        less='Xem ít hơn'
                        expanded={false}
                    >
                        {
                            loaiHinhCoSoKeHoachThanhKiemTras.length === 0 ?
                                "Không có loại hình" :
                                loaiHinhCoSoKeHoachThanhKiemTras.map((item) => {
                                    return <div key={item.id}> - {item.tenLoaiHinhCoSo}</div>
                                })
                        }
                    </ShowMoreText>
                </Descriptions.Item>
            </Descriptions>
        </Fragment >
    }

    const sumKinhPhi = (duToanKinhPhis) => {
        let res = 0;
        if (duToanKinhPhis && Array.isArray(duToanKinhPhis)) {
            duToanKinhPhis.map((item) => {
                return res += item.kinhPhi && !isNaN(item.kinhPhi) ? parseInt(item.kinhPhi, 0) : 0;
            })
        }
        return res;
    }

    const onPheDuyet = () => {
        const diaBanKeHoachGiamSats
            = item && item.diaBanKeHoachGiamSats
                ? item.diaBanKeHoachGiamSats
                : [];
        const loaiHinhCoSoKeHoachThanhKiemTras = item && item.loaiHinhCoSoKeHoachThanhKiemTras ? item.loaiHinhCoSoKeHoachThanhKiemTras : [];

        const canhBaoChuaCoCuocThanhTra = listCuocThanhTra.length === 0;
        const canhBaoChuaCoPhamVi = diaBanKeHoachGiamSats
            .length === 0 && loaiHinhCoSoKeHoachThanhKiemTras.length === 0;

        if (canhBaoChuaCoCuocThanhTra || canhBaoChuaCoPhamVi) {
            Modal.confirm({
                width: 500,
                title: "Cảnh báo!",
                content: <Fragment>
                    <Alert
                        showIcon
                        type="error"
                        icon={<i className="fa fa-exclamation-circle " />}
                        className="m-b-10"
                        description={<Fragment>
                            {
                                canhBaoChuaCoCuocThanhTra === 0 &&
                                <p> - Chưa có cuộc giám sát nào cho kế hoạch này!</p>
                            }
                            {
                                canhBaoChuaCoPhamVi &&
                                <p> - Chưa chọn phạm vi giám sát cho kế hoạch này!</p>
                            }
                        </Fragment>}
                    />
                </Fragment>,
                okText: <Fragment><i className="fa fa-check m-r-10" />Tiếp tục</Fragment>,
                cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                onOk: () => {
                    pheDuyetRequest({
                        data: {
                            ids: [item.id],
                            trangThaiDuyet: DAPHEDUYET,
                            item: { ...item, trangThaiDuyet: DAPHEDUYET, },
                            msgSuccess: "Phê duyệt thành công!",
                            msgError: "Phê duyệt thất bại!"
                        },
                        requestSuccess: () => {
                            setVisiblePheDuyet(false)
                            setItem(item => ({ ...item, trangThaiDuyet: DAPHEDUYET }))
                        }
                    });
                },
                okType: "primary"
            })
        }
        else {
            pheDuyetRequest({
                data: {
                    ids: [item.id],
                    trangThaiDuyet: DAPHEDUYET,
                    item: { ...item, trangThaiDuyet: DAPHEDUYET, },
                    msgSuccess: "Phê duyệt thành công!",
                    msgError: "Phê duyệt thất bại!"
                },
                requestSuccess: () => {
                    setVisiblePheDuyet(false)
                    setItem(item => ({ ...item, trangThaiDuyet: DAPHEDUYET }))
                }
            });
        }
    }

    return (
        <React.Fragment>
            <div style={{ margin: 20 }}>
                {
                    loading ?
                        <Alert
                            icon={<AntIcon type="loading" />}
                            type="info"
                            message="Đang tải dữ liệu..."
                            showIcon
                        /> :
                        error ?
                            <Alert
                                type="error"
                                showIcon
                                icon={<i className="fa fa-exclamation-circle " />}
                                message="Lỗi!"
                                description={
                                    <div className="row">
                                        <div className="col-md-12">
                                            {errorLabel}
                                            <div className="pull-right">
                                                <Button type="success" onClick={getItem}>
                                                    <i className="fa fa-refresh m-r-5" />Thử lại
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            /> :
                            <Fragment>
                                <CommonPheDuyet
                                    visible={visiblePheDuyet}
                                    onCancel={() => setVisiblePheDuyet(false)}
                                    onConfirm={() => {
                                        onPheDuyet()
                                    }}
                                    onNotConfirm={({ lyDo }) => {
                                        pheDuyetRequest({
                                            data: {
                                                ids: [item.id],
                                                trangThaiDuyet: KHONGPHEDUYET,
                                                lyDoKhongPheDuyet: lyDo,
                                                item: {
                                                    ...item,
                                                    lyDoKhongPheDuyet: lyDo,
                                                    trangThaiDuyet: KHONGPHEDUYET,
                                                },
                                                msgSuccess: "Phê duyệt thành công!",
                                                msgError: "Phê duyệt thất bại!"
                                            },
                                            requestSuccess: () => {
                                                setVisiblePheDuyet(false)
                                                setItem(item => ({ ...item, trangThaiDuyet: KHONGPHEDUYET, lyDoKhongPheDuyet: lyDo }))
                                            }
                                        });
                                    }}
                                />
                                <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-info m-r-10" />Thông tin kế hoạch</Fragment>}>
                                    <Descriptions size="small" column={2}>
                                        <Descriptions.Item label="Tên kế hoạch" span={2}>
                                            <Markup content={item.tenKeHoach} />
                                        </Descriptions.Item>

                                        <Descriptions.Item label="Năm" span={2}>
                                            <Tag color="blue">
                                                <i className="fa fa-calendar m-r-10" />
                                                {item.nam}
                                            </Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Trạng thái">{renderTrangThai(item)}</Descriptions.Item>
                                        <Descriptions.Item label="Phòng" span={2}>
                                            <Tag className="c-pointer" color="#0fa705" ><CommonPhongBan maPhongBan={item.keHoachPhong} /></Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Phòng ban phối hợp" span={2}>
                                            {renderPhongBanPhoiHop()}
                                        </Descriptions.Item>


                                        <Descriptions.Item label="Mục đích, Yêu cầu" span={2}>
                                            <div>
                                                <ShowMoreText
                                                    lines={1}
                                                    more='Xem thêm'
                                                    less='Xem ít hơn'
                                                    expanded={false}
                                                    width={1000}
                                                >
                                                    <Markup content={item.mucDichYeuCau} />
                                                </ShowMoreText>
                                            </div>
                                        </Descriptions.Item>

                                        <Descriptions.Item label="Nội dung kế hoạch giám sát" span={2}>
                                            <ShowMoreText
                                                lines={1}
                                                more='Xem thêm'
                                                less='Xem ít hơn'
                                                expanded={false}
                                                width={1000}
                                            >
                                                <Markup content={item.noiDungGiamSat} />
                                            </ShowMoreText>
                                        </Descriptions.Item>

                                        <Descriptions.Item label="Tổ chức, biện pháp thực hiện" span={2}>
                                            <ShowMoreText
                                                lines={1}
                                                more='Xem thêm'
                                                less='Xem ít hơn'
                                                expanded={false}
                                                width={1000}
                                            >
                                                <Markup content={item.toChucBienPhapThucHien} />
                                            </ShowMoreText>
                                        </Descriptions.Item>


                                        <Descriptions.Item label="Ghi chú" span={2}>
                                            <Markup content={item.ghiChu} />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </CommonFieldset>
                                <div className="row">
                                    <div className="col-md-7">
                                        <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-globe m-r-10" />Phạm vi giám sát</Fragment>}>
                                            {renderPhamVi()}
                                        </CommonFieldset>
                                    </div>
                                    <div className="col-md-5">
                                        <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-money m-r-10" />Kinh phí: <CommonCurrency>{sumKinhPhi(item.duToanKinhPhis)}</CommonCurrency></Fragment>} >
                                            <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
                                                <Table
                                                    rowKey="id"
                                                    bordered
                                                    size="small"
                                                    pagination={false}
                                                    columns={[
                                                        { width: 50, title: "STT", render: (_, r, index) => index + 1, align: "center" },
                                                        { title: "Nội dung", dataIndex: "noiDung" },
                                                        { title: "Kinh phí", dataIndex: "kinhPhi", render: (text) => <CommonCurrency>{text}</CommonCurrency>, align: "right", width: 120 },
                                                    ]}
                                                    dataSource={item.duToanKinhPhis}
                                                />
                                            </ConfigProvider>
                                        </CommonFieldset>
                                    </div>
                                </div>
                                {/* {
                                    item.trangThaiDuyet === DAPHEDUYET &&
                                    <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-list m-r-10" />Danh sách cuộc thanh tra</Fragment>}>
                                        <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
                                            <Table
                                                bordered
                                                size="small"
                                                pagination={false}
                                                rowKey="id"
                                                columns={[
                                                    { width: 50, title: "STT", render: (_, r, index) => index + 1, align: "center" },
                                                    {
                                                        title: "Tên cuộc thanh tra",
                                                        render: (_, r) => {
                                                            return <Link to={main.formatUrl({
                                                                pathname: url.URL_QTNVTT_CUOC_THANH_TRA_DETAIL,
                                                                objSearch: { id: r.id }
                                                            })}>
                                                                <div>{r.tenCuocThanhTra}</div>
                                                            </Link>
                                                        }
                                                    },
                                                    { title: "Phòng ban", render: (t, r) => <CommonPhongBan maPhongBan={r.keHoachPhong} /> },
                                                    { title: "Ngày bắt đầu", dataIndex: "ngayBatDau" },
                                                    { title: "Ngày kết thúc", dataIndex: "ngayKetThuc" },
                                                ]}
                                                dataSource={listCuocThanhTra}
                                            />
                                        </ConfigProvider>
                                    </CommonFieldset>
                                } */}
                                <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-file-text-o m-r-10" />Quyết định/Biên bản/Biểu mẫu khác</Fragment>}>
                                    <QuyetDinhBienBan
                                        entityId={item.id}
                                        bieuMauType={constants.CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM}
                                        attachEntityType={constants.CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM}
                                        allowTrinhKy={item.trangThaiDuyet === DANGHOANTHIEN}
                                        trinhKyCallback={(res) => { res && setItem(item => ({ ...item, trangThaiDuyet: CHOPHEDUYET })) }}
                                        showVanBanTrinhKy
                                    />
                                </CommonFieldset>
                            </Fragment>
                }
            </div>
        </React.Fragment>
    );
}

export default KeHoachThanhTraDetail;