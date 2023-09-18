import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "antd";
import * as pageKeys from "./../../../../../constants/page_key";
import * as constants from "./../../../../../constants/constants";
import * as main from "./../../../../../constants/main";
const ListCoSo = ({
  list,
  coSoDisabled = [],
  mode = "default",
  _rowSelected,
  _setRowSelected,
}) => {
  const [_pagination, _setPagination] = useState(constants.CONST_PAGINATION);
  const paginations = useSelector((state) => state.core.paginations);

  useEffect(() => {
    const index = paginations.findIndex(
      (item) =>
        item.key ===
        `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH`
    );
    if (index !== -1 && paginations[index].pagination) {
      _setPagination({ ..._pagination, ...paginations[index].pagination });
    }
  }, [paginations]);

  const rowSelection = () => {
    return {
      type: mode === "multiple" ? "checkbox" : "radio",
      align: "center",
      columnWidth: 30,
      selectedRowKeys: _rowSelected
        .filter((item) => item.idCoSo)
        .map((item) => item.idCoSo),
      onSelect: (record, selected, selectedRows) => {
        let rowSelected = [];
        if (mode === "multiple") {
          const newSelectedRows = [
            ...selectedRows,
            ..._rowSelected
              .filter((item) => item.idCoSo)
              .filter((item) => !list.find((v) => v.idCoSo === item.idCoSo)),
          ];
          rowSelected = newSelectedRows;
        } else {
          rowSelected = selectedRows;
        }

        const selecteds = main.deduplicate(
          rowSelected.map((item) => {
            const diaChiCoSo =
              `${
                item.diaChi && typeof item.diaChi === "string"
                  ? item.diaChi
                  : ""
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
          "idCoSo"
        );

        _setRowSelected(
          [
            ...selecteds,
            ..._rowSelected.filter((item) => !item.idCoSo),
          ].map((item) => ({
            ...item,
            loaiCoSo: constants.CONST_LOAI_CO_SO.COSO_BANATTP,
          }))
        );
      },
      onSelectAll: (keys, selectedRows) => {
        let rowSelected = [];
        if (mode === "multiple") {
          const newSelectedRows = [
            ...selectedRows,
            ..._rowSelected
              .filter((item) => item.idCoSo)
              .filter((item) => !list.find((v) => v.idCoSo === item.idCoSo)),
          ];
          rowSelected = newSelectedRows;
        } else {
          rowSelected = selectedRows;
        }
        const selecteds = main.deduplicate(
          rowSelected.map((item) => {
            const diaChiCoSo =
              `${
                item.diaChi && typeof item.diaChi === "string"
                  ? item.diaChi
                  : ""
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
          "idCoSo"
        );
        _setRowSelected(
          [
            ...selecteds,
            ..._rowSelected.filter((item) => !item.idCoSo),
          ].map((item) => ({
            ...item,
            loaiCoSo: constants.CONST_LOAI_CO_SO.COSO_BANATTP,
          }))
        );
      },
      getCheckboxProps: (record) => ({
        disabled:
          coSoDisabled.findIndex((coSo) => coSo.idCoSo === record.idCoSo) !==
          -1,
      }),
    };
  };
  const renderLoaiHinhCoSo = (dsLoaiHinhCoSo) => {
    return (dsLoaiHinhCoSo || []).map((item, i) => (
      <p key={i}> - {item.ten}</p>
    ));
  };
  return (
    <React.Fragment>
      <Table
        bordered
        size="small"
        // loading={loading}
        pagination={{
          size: "default",
          pageSizeOptions: constants.CONST_PAGINATION.pageSize,
        }}
        className="ant-table-striped"
        rowSelection={rowSelection()}
        title={() => {
          return (
            <Fragment>
              <div className="row">
                <div className="col-md-12">
                  <Button
                    type="default"
                    onClick={() =>
                      _setRowSelected(
                        _rowSelected
                          .filter((item) => !item.idCoSo)
                          .map((item) => ({
                            ...item,
                            loaiCoSo: constants.CONST_LOAI_CO_SO.COSO_BANATTP,
                          }))
                      )
                    }
                    disabled={
                      _rowSelected.filter((item) => item.idCoSo).length === 0
                    }
                  >
                    Bỏ chọn{" "}
                    <b> {_rowSelected.filter((item) => item.idCoSo).length} </b>{" "}
                    cơ sở
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        }}
        columns={[
          {
            title: "STT",
            width: 50,
            className: "c-pointer",
            align: "center",
            dataIndex: "stt",
          },
          {
            title: "Tên cơ sở",
            dataIndex: "tenCoSo",
            width: 200,
            className: "c-pointer",
          },
          {
            title: "Loại hình cơ sở",
            width: 200,
            className: "c-pointer",
            render: (_, record) =>
              renderLoaiHinhCoSo(record.danhSachLoaiHinhCoSo),
          },
          { dataIndex: "diaChiCoSo", title: "Địa chỉ", className: "c-pointer" },
          {
            dataIndex: "soChungNhanAttp",
            title: "Số CN ATTP",
            width: 150,
            className: "c-pointer",
          },
          {
            dataIndex: "soGiayPhepDKKD",
            title: "Số GP DKKD",
            width: 150,
            className: "c-pointer",
          },
        ]}
        dataSource={list.map((item, index) => {
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
            key: item.id,
            stt: index + 1,
            diaChiCoSo,
          };
        })}
        rowKey="idCoSo"
      />
    </React.Fragment>
  );
};

export default ListCoSo;
