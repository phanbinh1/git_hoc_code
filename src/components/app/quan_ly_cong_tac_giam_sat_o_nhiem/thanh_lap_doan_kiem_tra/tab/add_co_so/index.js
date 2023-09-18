import React, { Fragment, useEffect, useState } from "react";
import { CommonFormContent, CommonAddress } from "../../../../../common";
import * as validate from "./../../../../../../constants/validate";

const AddCoSoKhongQuanLy = ({ form, coSoNgoaiDanhSachAddressInit }) => {
  const [dataInit, setDataInit] = useState({
    coSoNgoaiDanhSach: coSoNgoaiDanhSachAddressInit,
  });
  useEffect(() => {
    setDataInit({ coSoNgoaiDanhSach: coSoNgoaiDanhSachAddressInit });
  }, [coSoNgoaiDanhSachAddressInit]);

  return (
    <Fragment>
      <div className="row ant-form-vertical" id="form-cskql">
        <CommonFormContent
          data={[
            [
              {
                col: 3,
                label: "Tên cơ sở",
                placeholder: "Tên cơ sở",
                name: "coSoNgoaiDanhSach.tenCoSo",
                checkValid: true,
                validates: [validate.VALIDATE_CO_SO_SXKD_TEN_CO_SO_REQUIRED],
              },
              {
                col: 3,
                label: "Tên doanh nghiệp",
                placeholder: "Tên doanh nghiệp",
                name: "coSoNgoaiDanhSach.tenDoanhNghiep",
                checkValid: true,
                validates: [validate.VALIDATE_CO_SO_SXKD_TEN_DKKD_REQUIRED],
              },
              {
                col: 3,
                label: "Số điện thoại",
                placeholder: "Số điện thoại",
                name: "coSoNgoaiDanhSach.soDienThoai",
              },
              {
                col: 3,
                label: "Người đại diện",
                placeholder: "Người đại diện",
                name: "coSoNgoaiDanhSach.nguoiDaiDien",
              },
            ],
            [
              {
                col: 3,
                label: "Tên loại hình cơ sở",
                placeholder: "Tên loại hình cơ sở",
                name: "coSoNgoaiDanhSach.tenLoaiHinhCoSo",
              },
              {
                col: 3,
                label: "Số CNATTP",
                placeholder: "Số CNATTP",
                name: "coSoNgoaiDanhSach.soChungNhanAttp",
              },
              {
                col: 3,
                label: "Số GPDKKD",
                placeholder: "Số GPDKKD",
                name: "coSoNgoaiDanhSach.soGiayPhepDKKD",
              },
              {
                col: 3,
                label: "Ngày cấp",
                placeholder: "Ngày cấp",
                name: "coSoNgoaiDanhSach.ngayCap",
                fieldType: "date",
                getPopupContainer: () => document.getElementById("form-cskql"),
              },
            ],
            [
              {
                type: "custom",
                renderCustom: (
                  <CommonAddress
                    getPopupContainer={() =>
                      document.getElementById("form-cskql")
                    }
                    form={form}
                    tinhThanh={{ name: "coSoNgoaiDanhSach.tinhThanh.ma" }}
                    quanHuyen={{ name: "coSoNgoaiDanhSach.quanHuyen.ma" }}
                    xaPhuong={{ name: "coSoNgoaiDanhSach.xaPhuong.ma" }}
                    diaChi={{ name: "coSoNgoaiDanhSach.diaChi" }}
                    dataInit={dataInit}
                  />
                ),
              },
            ],
          ]}
        />
      </div>
    </Fragment>
  );
};
export default AddCoSoKhongQuanLy;
