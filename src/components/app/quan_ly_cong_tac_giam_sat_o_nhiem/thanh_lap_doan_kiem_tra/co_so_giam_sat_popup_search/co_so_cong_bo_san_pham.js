import { ConfigProvider, Empty, Form, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { API_HO_SO_TU_CONG_BO } from "../../../../../constants/api";
import {
  CONST_PAGINATION,
  CONST_TRANG_THAI_HO_SO,
} from "../../../../../constants/constants";
import { queryString } from "../../../../../constants/main";
import { get } from "../../../../../util/api_call";
import * as main from "./../../../../../constants/main";
import FormTuCongBoSearch from "./search_tu_cong_bo";

const ListCoSoCongBoSanPham = ({
  coSoSelected,
  _rowSelected,
  _setRowSelected,
  coSoDisabled,
}) => {
  const [search, setSearch] = useState({});
  const [pagination, setPagination] = useState({
    ...CONST_PAGINATION,
    pageSize: 10,
  });
  const [data, setData] = useState([]);
  const onChange = async (currentPage, pageSize) => {
    const data = await get({
      url: API_HO_SO_TU_CONG_BO,
      data: {
        currentPage,
        pageSize,
        searchData: queryString.stringify({
          trangThaiHoSo: CONST_TRANG_THAI_HO_SO.DAT,
          uniqueCoSo: 1,
          ...search,
        }),
      },
    });
    data && data.pagination && setPagination(data.pagination);
    data && data.result && Array.isArray(data.result) && setData(data.result);
  };

  const rowSelection = {
    type: "checkbox",
    align: "center",
    columnWidth: 30,
    selectedRowKeys: _rowSelected
      .filter((item) => !item.idCoSo)
      .map((item) => item.tenCoSo),
    onSelect: (record, selected, selectedRows) => {
      let rowSelected = [];
      const newSelectedRows = [
        ...selectedRows,
        ..._rowSelected
          .filter((item) => !item.idCoSo)
          .filter((item) => !data.find((v) => v.tenCoSo === item.tenCoSo)),
      ];
      rowSelected = newSelectedRows;

      const selecteds = main.deduplicate(
        rowSelected.map((item) => {
          const diaChi = `${
            item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string"
              ? item.diaDiemKinhDoanh
              : item.diaChi || ""
          }`;
          return {
            id: undefined,
            daGiamSat: 0,
            danhSachXepHang: [],
            lyDoKhongGiamSat: null,
            nam: 2021,
            tinhThanh: item.tinhThanh,
            quanHuyen: item.quanHuyen,
            xaPhuong: item.xaPhuong,
            diaChi,
            tenLoaiHinhCoSo: null,
            soChungNhanAttp: item.soChungNhanAttp,
            soGiayPhepDKKD: item.soGiayPhepDkkd,
            tenCoSo: item.tenCoSo,
            tenDoanhNghiep: item.tenDangKyKinhDoanh,
            soDienThoai: item.soDienThoai,
          };
        }),
        "tenCoSo"
      );

      _setRowSelected([
        ...selecteds,
        ..._rowSelected.filter((item) => item.idCoSo),
      ]);
    },
    onSelectAll: (keys, selectedRows) => {
      let rowSelected = [];
      const newSelectedRows = [
        ...selectedRows,
        ..._rowSelected
          .filter((item) => !item.idCoSo)
          .filter((item) => !data.find((v) => v.tenCoSo === item.tenCoSo)),
      ];
      rowSelected = newSelectedRows;
      const selecteds = main.deduplicate(
        rowSelected.map((item) => {
          const diaChiCoSo =
            `${
              item.diaChi && typeof item.diaChi === "string" ? item.diaChi : ""
            }` +
            `${
              item.xaPhuong && item.xaPhuong.ten
                ? ` - ${item.xaPhuong.ten}`
                : ""
            }` +
            `${
              item.quanHuyen && item.quanHuyen.ten
                ? ` - ${item.quanHuyen.ten}`
                : ""
            }` +
            `${
              item.tinhThanh && item.tinhThanh.ten
                ? ` - ${item.tinhThanh.ten}`
                : ""
            }`;
          return {
            ...item,
            diaChiCoSo,
          };
        }),
        "tenCoSo"
      );
      _setRowSelected([
        ...selecteds,
        ..._rowSelected.filter((item) => item.idCoSo),
      ]);
    },
    getCheckboxProps: (record) => ({
      disabled:
        coSoDisabled.findIndex((coSo) => coSo.idCoSo === record.idCoSo) !== -1,
    }),
  };

  useEffect(() => {
    onChange(1, 10);
  }, []);

  return (
    <Fragment>
      <FormTuCongBoSearch
        searchData={search}
        onChange={(item) => setSearch(item)}
        onSubmit={() => onChange(1, 10)}
      />
      <ConfigProvider
        renderEmpty={() => <Empty description="Không có dữ liệu!" />}
      >
        <Table
          size="small"
          dataSource={data}
          rowSelection={rowSelection}
          bordered
          rowKey="tenCoSo"
          columns={[
            {
              title: "STT",
              render: (t, r, i) => {
                const { currentPage, pageSize } = pagination;
                return (currentPage - 1) * pageSize + i + 1;
              },
            },
            {
              title: "Tên cơ sở",
              dataIndex: "tenCoSo",
            },
            {
              title: "Loại hình cơ sở",
              dataIndex: "loaiHinhCoSo",
            },
            {
              title: "Địa chỉ",
              render: (_, item) => {
                return `${item.diaDiemKinhDoanh} 
                            ${
                              item.xaPhuong && item.xaPhuong.ten
                                ? ` - ${item.xaPhuong.ten}`
                                : ""
                            }
                            ${
                              item.quanHuyen && item.quanHuyen.ten
                                ? ` - ${item.quanHuyen.ten}`
                                : ""
                            }
                            ${
                              item.tinhThanh && item.tinhThanh.ten
                                ? ` - ${item.tinhThanh.ten}`
                                : ""
                            }
                            `;
              },
            },
            {
              title: "Số CN ATTP",
              dataIndex: "soChungNhanAttp",
            },
            {
              title: "Số GP ĐKKD",
              dataIndex: "soGiayPhepDkkd",
            },
          ]}
          pagination={{
            size: "default",
            onChange,
            pageSize: pagination.pageSize,
            current: pagination.currentPage,
            total: pagination.total || 0,
          }}
        />
      </ConfigProvider>
    </Fragment>
  );
};

export default ListCoSoCongBoSanPham;
