import React from 'react';
import { useSelector } from 'react-redux';
import { Tag, Table, Divider } from "antd";
import { CommonTable } from "./../../../common";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";

const ThongKeBaoCaoList = ({
    pageKey,
    dataSort,
    getAllRequest,
    handleEndLoadData,
    handleStartLoadData,
    handleChangeDataSort,
    dataSearch,
    onSelectRow
}) => {

    const item = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.thong_ke_bao_cao.item);
    const { listHoSoChuoi, soLieuTongHopCongTac } = item;
    const onChangeDataSort = (key) => {
        let dataSortChange = [];
        let sortMax = Math.max.apply(Math, dataSort.map((val) => { return val.sort; }));
        dataSort.map((item) => {
            if (item.key === key) {
                item.value = !item.value;
                item.sort = sortMax === item.sort ? sortMax : sortMax + 1;
            }
            return dataSortChange.push(item);
        })
        handleGetAllRequest({}, {
            dataSort: main.parseStringDataSort(dataSortChange),
            requestSuccess: () => { handleChangeDataSort(dataSortChange) }
        });
    }
    const columns = () => {
        let tenCoSoSort = "asc",
            quanHuyenSort = "asc",
            ngayTiepNhanSort = "asc",
            soChungNhanAttpSort = "asc",
            diaDiemKinhDoanhSort = "asc",
            soGiayXacNhanChuoiSort = "asc",
            ngayCapXacNhanChuoiSort = "asc";
        dataSort.map((item) => {
            if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
            if (item.key === "quanHuyen.ten" && !item.value) { quanHuyenSort = "desc"; }
            if (item.key === "ngayTiepNhan" && !item.value) { ngayTiepNhanSort = "desc"; }
            if (item.key === "soChungNhanAttp" && !item.value) { soChungNhanAttpSort = "desc"; }
            if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
            if (item.key === "soGiayXacNhanChuoi" && !item.value) { soGiayXacNhanChuoiSort = "desc"; }
            if (item.key === "ngayCapXacNhanChuoi" && !item.value) { ngayCapXacNhanChuoiSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("tenCoSo")} >
                    <span> Tên cơ sở cấp giấy xác nhận </span>
                    <i className={`fa fa-sort-amount-${tenCoSoSort}`} />
                </div>,
                dataIndex: 'tenCoSo',
                width: 200
            },
            {
                title: <div onClick={() => onChangeDataSort("soChungNhanAttp")} >
                    <span> Số chứng nhận ATTP </span>
                    <i className={`fa fa-sort-amount-${soChungNhanAttpSort}`} />
                </div>,
                dataIndex: 'soChungNhanAttp',
                width: 100
            },
            {
                title: <div onClick={() => onChangeDataSort("quanHuyen.ten")} >
                    <span> Quận huyện </span>
                    <i className={`fa fa-sort-amount-${quanHuyenSort}`} />
                </div>,
                dataIndex: 'quanHuyen.ten',
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("diaDiemKinhDoanh")} >
                    <span> Địa điểm kinh doanh </span>
                    <i className={`fa fa-sort-amount-${diaDiemKinhDoanhSort}`} />
                </div>,
                dataIndex: 'diaChi',
                width: 170
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayTiepNhan")} >
                    <span> Ngày tiếp nhận </span>
                    <i className={`fa fa-sort-amount-${ngayTiepNhanSort}`} />
                </div>,
                dataIndex: 'ngayTiepNhan',
                width: 170
            },
            {
                title: <div onClick={() => onChangeDataSort("soGiayXacNhanChuoi")} >
                    <span> Số GXN CTP an toàn </span>
                    <i className={`fa fa-sort-amount-${soGiayXacNhanChuoiSort}`} />
                </div>,
                dataIndex: 'soGiayXacNhanChuoi',
                width: 170
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayCapXacNhanChuoi")} >
                    <span> Ngày cấp GXN </span>
                    <i className={`fa fa-sort-amount-${ngayCapXacNhanChuoiSort}`} />
                </div>,
                dataIndex: 'ngayCapXacNhanChuoi',
                width: 170
            },
            {
                title: "Kết quả thẩm định",
                dataIndex: 'ketQuaThamDinh',
                width: 170
            },
        ];
    }

    const renderKetQuaThamDinh = (KetQua) => {
        const objKetQua = constants.CONST_CHUOI_THUC_PHAM_AN_TOAN_KET_QUA_THAM_DINH_OPTIONS.find(o => o.value === KetQua) || { label: "" };
        return (
            <span>
                <Tag color={objKetQua.color} key={KetQua}>
                    {objKetQua.label.toUpperCase()}
                </Tag>
            </span>
        )
    };

    const renderDiaChi = (item) => {
        return `${item.diaDiemKinhDoanh} 
        ${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
        ${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
        ${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
        `.toString().replace(/-|,/, "");
    }

    const data = () => {
        let result = [];
        listHoSoChuoi.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                diaChi: renderDiaChi(item),
                ketQuaThamDinh: renderKetQuaThamDinh(item.ketQuaThamDinh),
            })
        });
        return result;
    }

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        data = { dataSort: main.parseStringDataSort(dataSort), ...data };
        var dataSortStr = "";
        if (data.hasOwnProperty("dataSort") && typeof data.dataSort === "string") {
            dataSortStr = data.dataSort;
        }
        if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
            requestSuccess = () => {
                data.requestSuccess();
                handleEndLoadData();
            }
        }
        var value = { ...pagination, ...dataSearch, sortData: dataSortStr };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });
    }

    return (
        <React.Fragment>
            <SoLieuTongHop
                soLieuTongHopCongTac={soLieuTongHopCongTac}
            />
            <Divider orientation="left">Hồ sơ chuỗi thực phẩm</Divider>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={false}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                firstLoad={false}
                paginationPlacement="bottom"
                controllerKey={main.encode(apiUrl.API_CHUOI_THUCPHAM_ANTOAN_REPORT)}
            />
        </React.Fragment >
    );
}


const SoLieuTongHop = ({ soLieuTongHopCongTac = [] }) => {
    const renderData = () => {
        let result = [];
        let sumThamDinhDat = 0, sumDaXuLy = 0, sumDangXuLy = 0, sumChoXuLy = 0, sumHoSo = 0;
        result = soLieuTongHopCongTac.map((item, i) => {
            sumThamDinhDat += item.tongSoThamDinhDat;
            sumDaXuLy += item.tongSoDaXuLy;
            sumDangXuLy += item.tongSoDangXuLy;
            sumChoXuLy += item.tongSoChoXuLy;
            sumHoSo += item.tongHoSo;
            return { ...item, stt: i + 1, key: i };
        });
        result.push({
            tongSoThamDinhDat: sumThamDinhDat,
            tongSoDaXuLy: sumDaXuLy,
            tongSoDangXuLy: sumDangXuLy,
            tongSoChoXuLy: sumChoXuLy,
            tongHoSo: sumHoSo
        })
        return result;
    }
    return <React.Fragment>
        <div style={{ margin: 10 }}>
            <Table
                pagination={false}
                bordered
                size="small"
                columns={[
                    {
                        title: "STT",
                        render: (_, r, index) => {
                            if (index < soLieuTongHopCongTac.length) {
                                return index + 1;
                            }
                            return {
                                props: {
                                    colSpan: 0,
                                },
                            };
                        },
                        width: 50
                    },
                    {
                        title: "Tên đơn vị",
                        dataIndex: "tenDiaBan",
                        render: (text, row, index) => {
                            if (index < soLieuTongHopCongTac.length) {
                                return text;
                            }
                            return {
                                children: <b>Tổng cộng</b>,
                                props: {
                                    colSpan: 2,
                                },
                            };
                        },
                    },
                    { title: "Đã xử lý", width: 100, dataIndex: "tongSoDaXuLy", align: "center" },
                    { title: "Đang xử lý", width: 100, dataIndex: "tongSoDangXuLy", align: "center" },
                    { title: "Chờ xử lý", width: 100, dataIndex: "tongSoChoXuLy", align: "center" },
                    { title: "Thẩm định đạt", width: 80, dataIndex: "tongSoThamDinhDat", align: "center" },
                    { title: "Tổng hồ sơ", width: 100, dataIndex: "tongHoSo", align: "center" },
                ]}
                dataSource={renderData()}
            />
        </div>
    </React.Fragment>
}

export default ThongKeBaoCaoList;