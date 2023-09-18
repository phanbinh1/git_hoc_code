import React from 'react';
import { useSelector } from 'react-redux';
import { CommonTable } from "./../../../common";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import { Tag } from "antd";
import moment from 'moment';
import { dateFormat } from "./../../../../constants/controll"

const ListCoSo = ({ ...props }) => {
    const {
        pageKey,
        dataLoading,
        dataSort,
        handleChangeDataSort,
        getAllRequest,
        handleEndLoadData,
        handleStartLoadData,
        dataSearch,
    } = props;

    const list_co_so = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.thong_ke_bao_cao.list);

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
        let tenDangKyKinhDoanhSort = "asc",
            tenCoSoSort = "asc",
            diaDiemKinhDoanhSort = "asc",
            // loaiHinhCoSoSort = "asc",
            soChungNhanAttpSort = "asc",
            ngayCapChungNhanAttpSort = "asc",
            ngayHetHanChungNhanAttpSort = "asc";
        dataSort.map((item) => {
            if (item.key === "tenDangKyKinhDoanh" && !item.value) { tenDangKyKinhDoanhSort = "desc"; }
            if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
            if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
            // if (item.key === "loaiHinhCoSo.ten" && !item.value) { loaiHinhCoSoSort = "desc"; }
            if (item.key === "soChungNhanAttp" && !item.value) { soChungNhanAttpSort = "desc"; }
            if (item.key === "ngayCapChungNhanAttp" && !item.value) { ngayCapChungNhanAttpSort = "desc"; }
            if (item.key === "ngayHetHanChungNhanAttp" && !item.value) { ngayHetHanChungNhanAttpSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("tenDangKyKinhDoanh")} >
                    <span> Tên doanh nghiệp </span>
                    <i className={`fa fa-sort-amount-${tenDangKyKinhDoanhSort}`} />
                </div >,
                dataIndex: 'tenDangKyKinhDoanh',
                width: 200,
            },
            {
                title: <div onClick={() => onChangeDataSort("tenCoSo")} >
                    <span> Tên cơ sở </span>
                    <i className={`fa fa-sort-amount-${tenCoSoSort}`} />
                </div >,
                dataIndex: 'tenCoSo',
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("diaDiemKinhDoanh")} >
                    <span> Địa điểm kinh doanh </span>
                    <i className={`fa fa-sort-amount-${diaDiemKinhDoanhSort}`} />
                </div >,
                dataIndex: 'diaChi',
                width: 200
            },
            {
                // title: <div onClick={() => onChangeDataSort("loaiHinhCoSo.ten")} >
                //     <span> Loại hình cơ sở </span>
                //     <i className={`fa fa-sort-amount-${loaiHinhCoSoSort}`} />
                // </div >,
                title: "Loại hình cơ sở",
                dataIndex: 'loaiHinhCoSo',
                width: 200,
            },
            {
                title: <div onClick={() => onChangeDataSort("soChungNhanAttp")} >
                    <span> Chứng nhận ATTP </span>
                    <i className={`fa fa-sort-amount-${soChungNhanAttpSort}`} />
                </div >,
                dataIndex: 'trangThaiGCN',
                width: 180
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayCapChungNhanAttp")} >
                    <span> Ngày cấp </span>
                    <i className={`fa fa-sort-amount-${ngayCapChungNhanAttpSort}`} />
                </div >,
                dataIndex: 'ngayCapChungNhanAttp',
                width: 120,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayHetHanChungNhanAttp")} >
                    <span> Ngày hết hạn </span>
                    <i className={`fa fa-sort-amount-${ngayHetHanChungNhanAttpSort}`} />
                </div >,
                dataIndex: 'ngayHetHanChungNhanAttp',
                width: 140,
                align: "center"
            },
        ];
    }
    const renderTrangThaiGCN = (coSo) => {
        if (coSo.soChungNhanAttp) {
            if (coSo.ngayHetHanChungNhanAttp) {
                const ngayHetHan = moment(coSo.ngayHetHanChungNhanAttp, dateFormat);
                let now = new Date();
                let dnow = moment(now).utc();
                if (ngayHetHan.isValid()) {
                    if ((ngayHetHan.isAfter(dnow)) || (ngayHetHan.isSame(dnow))) {
                        return (
                            <div>
                                {coSo.soChungNhanAttp}
                                <br />
                                <Tag color="green" key={coSo.id}>
                                    <span className="small">CÒN HẠN</span>
                                </Tag>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                {coSo.soChungNhanAttp}
                                <br />
                                <Tag color="red" key={coSo.id}>
                                    <span className="small">HẾT HẠN</span>
                                </Tag>
                            </div>
                        )
                    }

                }
            }
        }
        return (
            <div>
                <Tag color="gray" key={coSo.id}>
                    <span className="small">KHÔNG XÁC ĐỊNH</span>
                </Tag>
            </div>
        )
    }
    const data = () => {
        let result = [];
        list_co_so.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                loaiHinhCoSo: renderLoaiHinhCoSo(item.danhSachLoaiHinhCoSo),
                diaChi: renderDiaChi(item),
                trangThaiGCN: renderTrangThaiGCN(item)
            })
        });
        return result;
    }

    const renderLoaiHinhCoSo = (dsLoaiHinhCoSo) => {
        let tenLoaiHinhCoSo = "";
        dsLoaiHinhCoSo.forEach(item => {
            tenLoaiHinhCoSo += ", " + item.ten;
        });
        return tenLoaiHinhCoSo.toString().replace(/, /, "");
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
        var value = {
            ...dataSearch,
            ...pagination,
            sortData: dataSortStr
        };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });

    }

    return (
        <React.Fragment>
            <CommonTable
                // paginationPlacement="bottom"
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                hasSelectRow={false}
                hasRowFake={false}
                // scrollY={false}
                controllerKey={main.encode(apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH)}
            />
        </React.Fragment >
    );
}

export default ListCoSo;