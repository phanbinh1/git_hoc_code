import React from 'react';
import { useSelector } from 'react-redux';
import { CommonTable } from "./../../common";
import * as constants from "./../../../constants/constants";
import { URL_HO_SO_TU_CONG_BO_DETAIL, URL_HO_SO_BAN_CONG_BO_DETAIL } from '../../../constants/url';
import { Link } from 'react-router-dom';

const ThongKeBaoCaoList = ({
    pageKey,
    getAllRequest,
    handleEndLoadData,
    handleStartLoadData,
    dataSearch,
}) => {
    const thong_ke_bao_cao_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.bao_cao_thong_ke);
    const paginations = useSelector(state => state.core.paginations);
    const pagination = paginations.find(item => item.key === pageKey);
    const currentPage = pagination && pagination.pagination ? pagination.pagination.currentPage : null;
    const pageSize = pagination && pagination.pagination ? pagination.pagination.pageSize : null;

    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
                render: (children, item, index) => {
                    return {
                        children: item._stt,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            },
            {
                title: "Sản phẩm",
                dataIndex: "sanpham",
                width: 500,
                children: [
                    {
                        title: "Tên sản phẩm",
                        width: 130,
                        dataIndex: "tenSanPham",
                        render: (text, item) => {
                            return <Link
                                to={item.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ?
                                    `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${item.id}` :
                                    `${URL_HO_SO_BAN_CONG_BO_DETAIL}?id=${item.id}`}
                            >
                                {text}
                            </Link>
                        }
                    },
                    {
                        title: "Nhóm",
                        width: 100,
                        dataIndex: "nhom",
                        align: "center",
                        render: (text, item) => {
                            return item.danhMucNhom ? item.danhMucNhom.tenNhom : null;
                        }
                    },
                    {
                        title: "Phân nhóm",
                        width: 100,
                        dataIndex: "phannhom",
                        align: "center",
                        render: (text, item) => {
                            return item.danhMucPhanNhom ? item.danhMucPhanNhom.tenPhanNhom : null;
                        }
                    },
                    {
                        title: "NK",
                        width: 70,
                        dataIndex: "NK",
                        align: "center",
                        render: (text, item) => {
                            return item.nguonGoc && item.nguonGoc === constants.CONST_NGUOC_GOC_SAN_PHAM.NHAPKHAU ? "NK" : "Không";
                        }
                    },
                ]
            },
            {
                title: "Tên doanh nghiệp",
                dataIndex: 'tenDangKyKinhDoanh',
                width: 170,
                render: (children, item, index) => {
                    return {
                        children,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            },
            {
                title: "Tên cở sở",
                dataIndex: 'tenCoSo',
                width: 150,
                render: (children, item, index) => {
                    return {
                        children,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            },
            {
                title: "Địa điểm kinh doanh",
                dataIndex: 'diaChi',
                width: 250,
                render: (children, item, index) => {
                    return {
                        children,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            },
            {
                title: "Quận",
                dataIndex: 'quan',
                width: 100,
                render: (children, item, index) => {
                    return {
                        children: item.quanHuyen ? item.quanHuyen.ten : null,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            },
            {
                title: "Ngày tiếp nhận",
                dataIndex: 'ngayTiepNhan',
                width: 140,
                align: "center",
                render: (children, item, index) => {
                    return {
                        children,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            },
            {
                title: "Điện thoại",
                dataIndex: 'soDienThoai',
                width: 120,
                render: (children, item, index) => {
                    return {
                        children,
                        props: {
                            rowSpan: item.firstItem ? (item.danhSachSanPhamCongBo || []).length : 0,
                            colSpan: 1
                        }
                    }
                }
            }
        ];
    }
    const data = () => {
        let result = [];
        thong_ke_bao_cao_list.map((item, index) => {
            const _stt = currentPage && pageSize ? (currentPage - 1) * pageSize + index + 1 : index + 1;
            return item.danhSachSanPhamCongBo.map((sp, i) => {
                return result.push({
                    firstItem: i === 0,
                    ...sp,
                    ...item,
                    diaChi: renderDiaChi(item),
                    key: sp.id,
                    _stt
                })
            })

        });
        return result;
    }

    const renderDiaChi = (item) => {
        return `${item.diaDiemKinhDoanh} 
        ${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
        ${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
        ${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
        `.toString().replace(/-|,/, "");
    }

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
            requestSuccess = () => {
                data.requestSuccess();
                handleEndLoadData();
            }
        }
        var value = { ...pagination, ...dataSearch };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });
    };

    return (
        <React.Fragment>
            <CommonTable
                key={dataSearch.loaiCongBo}
                hasSelectRow={false}
                firstLoad={false}
                columns={columns()}
                dataSource={data()}
                loading={false}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                striped={false}
            />
        </React.Fragment >
    );
}

export default ThongKeBaoCaoList;