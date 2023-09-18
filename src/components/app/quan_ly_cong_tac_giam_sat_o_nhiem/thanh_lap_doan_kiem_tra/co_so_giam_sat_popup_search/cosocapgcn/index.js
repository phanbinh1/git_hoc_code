import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from "antd";
import { CommonPagination } from "../../../../../common";
import * as actCoSoSanXuatKinhDoanh from "../../../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as pageKeys from "../../../../../../constants/page_key";
import * as constants from "../../../../../../constants/constants";
import * as main from "../../../../../../constants/main";
import * as message from "../../../../../../constants/message";
import FormSearch from "./search";

const List = ({
    onClick,
    searchText = "",
    coSoSelected = [],
    coSoDisabled = [],
    mode = "default",
    _rowSelected,
    _setRowSelected,
    idKeHoachGiamSat,
}) => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [_pagination, _setPagination] = useState(constants.CONST_PAGINATION);
    const paginations = useSelector(state => state.core.paginations);
    const [search, setSearch] = useState({ tenCoSo: searchText });

    const dispatch = useDispatch();
    const getDsCoSo = (object) => dispatch(actCoSoSanXuatKinhDoanh.getAllRequest({ ...object, pageKey: `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH_COSO_CAP_GCN` }))
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const index = paginations.findIndex(item => item.key === `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH_COSO_CAP_GCN`);;
        if (index !== -1 && paginations[index].pagination) {
            _setPagination({ ..._pagination, ...paginations[index].pagination });
        }
    }, [paginations]);

    useEffect(() => {
        setFirstLoad(false);
        _setRowSelected(coSoSelected && Array.isArray(coSoSelected) ? coSoSelected.filter(item => item.loaiCoSo === constants.CONST_LOAI_CO_SO.COSO_CAPGCN) : []);
    }, [])

    const renderStt = (index) => {
        const { currentPage, pageSize } = _pagination;
        return (currentPage - 1) * pageSize + index + 1;
    }

    const renderLoaiHinhCoSo = (dsLoaiHinhCoSo) => {
        return dsLoaiHinhCoSo.map(item => <div> - {item.ten}</div>);
    }

    const rowSelection = () => {
        return {
            type: mode === "multiple" ? "checkbox" : "radio",
            align: "center",
            columnWidth: 30,
            selectedRowKeys: _rowSelected.map((item) => item.idCoSo),
            onChange: (selectedRows) => {
                let index = -1;
                let rowSelected = [..._rowSelected];
                if (mode === "multiple") {
                    dataSource.map((item) => {
                        index = selectedRows.findIndex(val => val === item.idCoSo);
                        if (index !== -1) {
                            if (rowSelected.findIndex(row => row.idCoSo === item.idCoSo) === -1) {
                                const diaChiCoSo = `${item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string" ? item.diaDiemKinhDoanh : (item.diaChi || "")}`
                                rowSelected.push({
                                    ...item,
                                    diaChiCoSo,
                                    diaChi: diaChiCoSo
                                });
                            }
                        }
                        else {
                            rowSelected.findIndex(row => row.idCoSo === item.idCoSo) !== -1 && rowSelected.splice(rowSelected.findIndex(row => row.idCoSo === item.idCoSo), 1);
                        }
                        return null;
                    });
                }
                else {
                    dataSource.map((item) => {
                        index = selectedRows.findIndex(val => val === item.idCoSo);
                        if (index !== -1) {
                            if (rowSelected.findIndex(row => row.idCoSo === item.idCoSo) === -1) {
                                const diaChiCoSo = `${item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string" ? item.diaDiemKinhDoanh : (item.diaChi || "")}`;
                                rowSelected = [{
                                    ...item,
                                    diaChiCoSo,
                                    diaChi: diaChiCoSo
                                }];
                            }
                        }
                        return null;
                    });
                }
                _setRowSelected(rowSelected);
            },
            getCheckboxProps: record => ({
                disabled: coSoDisabled.findIndex(coSo => coSo.idCoSo === record.idCoSo) !== -1
            }),
        }
    }

    const onSearch = () => {
        setLoading(true);
        let data = { ...search };
        if (search.chonNhieuLoaiHinh) {
            data.listLoaiHinhCoSo = data.loaiHinhCoSoId
            delete data.loaiHinhCoSoId;
        }
        getDsCoSo({
            data: {
                currentPage: 1,
                pageSize: _pagination.pageSize,
                idKeHoach: idKeHoachGiamSat,
                searchData: main.parseObjectToParams(data)
            },
            pageKey: `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH_COSO_CAP_GCN`,
            requestSuccess: (res) => {
                setDataSource(res.result.map(item => ({ ...item, idCoSo: item.id })));
                setLoading(false);
            },
            requestError: () => {
                setLoading(false);
            }
        })
    }

    console.log(dataSource);
    return <React.Fragment>
        <FormSearch
            searchData={search || {}}
            onChange={(item) => setSearch(item)}
            onSubmit={onSearch}
        />
        <Table
            bordered
            size="small"
            loading={loading}
            pagination={false}
            className="ant-table-striped"
            rowSelection={rowSelection()}
            rowKey="idCoSo"
            columns={[
                { dataIndex: "stt", title: "STT", width: 50, className: "c-pointer", align: "center" },
                { dataIndex: "tenCoSo", title: "Tên cơ sở", width: 200, className: "c-pointer" },
                { dataIndex: "diaChiCoSo", title: "Địa chỉ", className: "c-pointer" },
                { dataIndex: "loaiHinhCoSo", title: "Loại hình cơ sở", width: 150, className: "c-pointer" },
                { dataIndex: "soGiayPhepDkkd", title: "Số DKKD", width: 150, className: "c-pointer" },
                { dataIndex: "soChungNhanAttp", title: "Số CNATTP", width: 150, className: "c-pointer" },
            ]}
            dataSource={dataSource.map((item, index) => {
                const diaChiCoSo = `${item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string" ? item.diaDiemKinhDoanh : ""}` +
                    `${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}` +
                    `${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}` +
                    `${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}`;
                return {
                    key: item.idCoSo,
                    ...item,
                    stt: renderStt(index),
                    diaChiCoSo,
                    loaiHinhCoSo: renderLoaiHinhCoSo(item.danhSachLoaiHinhCoSo)
                };
            })}
        // onRow={(item) => {
        //     return {
        //         onDoubleClick: () => {
        //             const index = coSoDisabled.findIndex(coSo => coSo.idCoSo === item.idCoSo);
        //             if (index === -1) {
        //                 if (mode === "multiple") {
        //                     onClick([item]);
        //                 }
        //                 else {
        //                     onClick(item);
        //                 }
        //             }
        //             else {
        //                 message.warning({ content: "Không thể chọn cơ sở này!", duration: 1, key: "CO_SO_SELECTED" });
        //             }
        //         }
        //     }
        // }}
        />
        <CommonPagination
            onChange={(pagination) => {
                setLoading(true);
                getDsCoSo({
                    data: {
                        ...pagination,
                        idKeHoach: idKeHoachGiamSat,
                        currentPage: firstLoad ? 1 : pagination.currentPage,
                        searchData: main.parseObjectToParams(search)
                    },
                    pageKey: `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH_COSO_CAP_GCN`,
                    requestSuccess: (res) => {
                        setDataSource(res.result.map(item => ({ ...item, idCoSo: item.id })));
                        setLoading(false);
                    },
                    requestError: () => {
                        setLoading(false);
                    }

                })
            }}
            paginationKey={`${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH_COSO_CAP_GCN`}
        />
    </React.Fragment>
}

export default List;