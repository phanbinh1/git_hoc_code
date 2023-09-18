import { Button, ConfigProvider, Empty, Input, Table } from "antd";
import React, { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayPush, arrayRemove, change, Field, getFormValues } from "redux-form";
import { FieldInput, FieldInputNumber, FieldSelect } from "../../../../../constants/controll";
import { CommonAccount, CommonPhongBan, CommonTableAction } from "../../../../common";
import AccountPopupSearch from "../../../../core/account/popup_search";
import * as constants from "./../../../../../constants/constants";
import * as validate from "./../../../../../constants/validate";

function ThanhPhanDoanGiamSat({
  getPopupContainer,
  cuocGiamSat,
  form,
  keHoachPhongs,
  maPhongBan,
  allowUpdate,
}) {
  const [searchKey, setSearchKey] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const formValues = useSelector((state) => getFormValues(form)(state));
  const dispatch = useDispatch();
  const onAdd = () => dispatch(arrayPush(form, "thanhVienDoanGiamSats", {}));
  const onRemove = (index) =>
    dispatch(arrayRemove(form, "thanhVienDoanGiamSats", index));
  const changeValue = (fieldName, value) =>
    dispatch(change(form, fieldName, value));
  const getOptionsChucDanh = useCallback(
    (index) => {
      let result = [];
      const thanhViens = formValues.thanhVienDoanGiamSats;
      if (thanhViens && Array.isArray(thanhViens)) {
        const indexKeyTruongDoan = thanhViens.findIndex(
          (item) =>
            item.chucDanh ===
            constants.CONST_CHUC_DANH_DOAN_THAM_DINH.TRUONGDOAN
        );
        constants.CONST_CHUC_DANH_DOAN_THAM_DINH.options.map((item) => {
          if (
            item.value ===
              constants.CONST_CHUC_DANH_DOAN_THAM_DINH.TRUONGDOAN &&
            indexKeyTruongDoan !== index
          ) {
            if (thanhViens[index].account && indexKeyTruongDoan === -1) {
              result.push(item);
            }
          } else {
            result.push(item);
          }
          return result;
        });
      }
      return result;
    },
    [formValues && formValues.thanhVienDoanGiamSats]
  );

  return (
    <Fragment>
      <div className="col-md-12">
        <AccountPopupSearch
          rowKey="name"
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          searchKey={searchKey}
          accountSelected={
            formValues &&
            formValues.thanhVienDoanGiamSats &&
            Array.isArray(formValues.thanhVienDoanGiamSats)
              ? formValues.thanhVienDoanGiamSats
                  .filter((item) => item.account)
                  .map((item) => ({ ...item, name: item.account }))
              : []
          }
          onOk={(accountSelected) => {
            const thanhVienDoanGiamSats =
              formValues &&
              formValues.thanhVienDoanGiamSats &&
              Array.isArray(formValues.thanhVienDoanGiamSats)
                ? formValues.thanhVienDoanGiamSats
                : [];
            let thanhVien;
            const accounts = accountSelected.map((item) => {
              thanhVien = thanhVienDoanGiamSats.find(
                (tv) => tv.account === item.name
              );
              return {
                ...(thanhVien ? thanhVien : {}),
                ...(item.id &&
                item.fullName &&
                item.regency &&
                item.managementDepartment
                  ? {
                      account: item.name,
                      hoTen: item.fullName,
                      chucVu: item.regency,
                      phongBan: item.managementDepartment,
                    }
                  : {}),
              };
            });
            changeValue("thanhVienDoanGiamSats", [
              ...thanhVienDoanGiamSats.filter((item) => !item.account),
              ...accounts,
            ]);
            setVisibleModal(false);
          }}
          phongBans={maPhongBan ? [maPhongBan] : undefined}
        />

        <ConfigProvider
          renderEmpty={() => <Empty description="Không có dữ liệu" />}
        >
          <Table
            rowKey={(record) => {
              return record.key;
            }}
            key="tbl-doan-giam-sat"
            size="small"
            pagination={false}
            bordered
            dataSource={
              formValues && formValues.thanhVienDoanGiamSats
                ? formValues.thanhVienDoanGiamSats.map((item, i) => {
                    return { key: i, ...item };
                  })
                : []
            }
            columns={[
              {
                title: "STT",
                width: 50,
                align: "center",
                render: (_, r, index) => index + 1,
              },
              {
                title: "Họ và tên",
                render: (_, r, index) => {
                  return r.account || !allowUpdate ? (
                    <Fragment>
                      <CommonAccount
                        getPopupContainer={getPopupContainer}
                        username={r.account}
                      >
                        {r.hoTen}
                      </CommonAccount>
                    </Fragment>
                  ) : (
                    <React.Fragment>
                      <Field
                        component={FieldInput}
                        name={`thanhVienDoanGiamSats[${index}].hoTen`}
                        placeholder="Họ và tên"
                        checkValid={true}
                        validate={[
                          validate.VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_TNV_REQUIRED,
                        ]}
                      />
                    </React.Fragment>
                  );
                },
              },
              ...(maPhongBan === constants.CONST_PHONG_BAN.DOI1 ||
              maPhongBan === constants.CONST_PHONG_BAN.DOI2
                ? [
                    {
                      title: "Tổ",
                      render: (_, r, index) => {
                        if (allowUpdate) {
                          return (
                            <React.Fragment>
                              <Field
                                component={FieldInputNumber}
                                name={`thanhVienDoanGiamSats[${index}].toCongTac`}
                                placeholder="Tổ"
                                min={0}
                              />
                            </React.Fragment>
                          );
                        } else {
                          return r.toCongTac;
                        }
                      },
                      width: 100,
                    },
                  ]
                : []),
              {
                title: "Phòng ban",
                render: (_, r, index) => {
                  if (r.account || !allowUpdate) {
                    return (
                      <CommonPhongBan maPhongBan={r.phongBan} key={r.account} />
                    );
                  } else {
                    return (
                      <Field
                        component={FieldInput}
                        name={`thanhVienDoanGiamSats[${index}].phongBan`}
                        placeholder="Phòng ban"
                        checkValid={true}
                        validate={[
                          validate.VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_DVCT_REQUIRED,
                        ]}
                      />
                    );
                  }
                },
              },
              {
                title: "Chức vụ",
                render: (_, r, index) => {
                  if (r.account || !allowUpdate) {
                    const chucVu = constants.CONST_CHUC_VU.options.find(
                      (item) => item.value === r.chucVu
                    );
                    return chucVu ? chucVu.label : r.chucVu;
                  } else {
                    return (
                      <Field
                        component={FieldInput}
                        name={`thanhVienDoanGiamSats[${index}].chucVu`}
                        placeholder="Chức vụ"
                        checkValid={true}
                        validate={[
                          validate.VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_CV_REQUIRED,
                        ]}
                      />
                    );
                  }
                },
              },
              {
                title: "Chức danh",
                render: (_, r, index) => {
                  return allowUpdate ? (
                    <Field
                      getPopupContainer={getPopupContainer}
                      component={FieldSelect}
                      name={`thanhVienDoanGiamSats[${index}].chucDanh`}
                      placeholder="Chức danh"
                      checkValid={true}
                      options={getOptionsChucDanh(index)}
                      validate={[
                        validate.VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_CD_REQUIRED,
                      ]}
                    />
                  ) : (
                    <React.Fragment>
                      {constants.CONST_CHUC_DANH_DOAN_THAM_DINH.render(
                        formValues &&
                          formValues.thanhVienDoanGiamSats &&
                          Array.isArray(formValues.thanhVienDoanGiamSats) &&
                          formValues.thanhVienDoanGiamSats[index]
                          ? formValues.thanhVienDoanGiamSats[index].chucDanh
                          : null
                      )}
                    </React.Fragment>
                  );
                },
                width: 170,
              },
              ...(allowUpdate
                ? [
                    {
                      title: "Thao tác",
                      width: 80,
                      align: "center",
                      render: (_, r, index) => {
                        return (
                          <CommonTableAction
                            getPopupContainer={getPopupContainer}
                            key={index}
                            mode="inline"
                            actions={[
                              {
                                tooltip: "Xoá",
                                icon: "fa fa-trash",
                                type: "danger",
                                shape: "circle",
                                confirm: true,
                                confirmLabel: "Bạn chắc chắn muốn xoá?",
                                onClick: () => onRemove(index),
                              },
                            ]}
                          />
                        );
                      },
                    },
                  ]
                : []),
            ]}
            title={
              allowUpdate
                ? () => {
                    return (
                      <React.Fragment>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="pull-left" style={{ width: 350 }}>
                              <Input.Search
                                className="input-round"
                                allowClear
                                placeholder="Tìm kiếm (Tên người dùng trong danh sách)"
                                onSearch={(value) => {
                                  setSearchKey(value);
                                  setVisibleModal(true);
                                }}
                              />
                            </div>
                            <div className="pull-right">
                              <Button type="primary" onClick={onAdd}>
                                <i className="fa fa-plus m-r-10" /> Thêm thành
                                viên ngoài danh sách
                              </Button>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  }
                : null
            }
          />
        </ConfigProvider>
      </div>
    </Fragment>
  );
}

export default ThanhPhanDoanGiamSat;
