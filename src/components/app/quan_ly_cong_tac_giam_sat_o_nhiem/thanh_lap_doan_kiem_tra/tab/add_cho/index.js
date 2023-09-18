import React, { Fragment } from "react";
import { CommonFormContent } from "../../../../../common";
import * as validate from "./../../../../../../constants/validate";
import { useSelector } from "react-redux";

const AddChoNgoaiQuanLy = () => {
  const danh_muc_cho_list = useSelector(
    (state) => state.app.quan_ly_thong_tin_tieu_thuong_kdtp.danh_muc_cho.list
  );

  const chi_tieu_list = useSelector(
    (state) => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.chi_tieu.list
  );

  return (
    <Fragment>
      <div className="row ant-form-vertical" id="form-ckql">
        <CommonFormContent
          data={[
            [
              {
                col: 6,
                label: "Chọn chợ",
                placeholder: "Chọn chợ",
                name: "choNgoaiQuanLy.danhMucCho",
                checkValid: true,
                validates: [validate.VALIDATE_CO_SO_SXKD_DANHMUCCHO],
                fieldType: "select",
                options: danh_muc_cho_list.map((cho) => ({
                  ...cho,
                  label: cho.ten,
                  value: cho.id,
                })),
                getPopupContainer: () => document.getElementById("form-ckql"),
              },
              {
                col: 6,
                label: "Tên mẫu",
                placeholder: "Nhập tên mẫu",
                name: "choNgoaiQuanLy.tenMau",
                checkValid: true,
                validates: [validate.VALIDATE_CO_SO_SXKD_TENMAU],
              },
              {
                col: 6,
                label: "Số lượng mẫu",
                placeholder: "Nhập số lượng mãu",
                checkValid: true,
                fieldType: "number",
                name: "choNgoaiQuanLy.soLuongMau",
                validates: [validate.VALIDATE_CO_SO_SXKD_SOLUONGMAU],
              },
              {
                col: 6,
                label: "Chỉ tiêu xét nghiệm",
                placeholder: "Chọn chỉ tiêu xét nghiệm",
                name: "choNgoaiQuanLy.chiTieuXetNghiems",
                checkValid: true,
                fieldType: "select",
                mode: "multiple",
                options: chi_tieu_list.map((chiTieu) => ({
                  ...chiTieu,
                  label: chiTieu.tenChiTieu,
                  value: chiTieu.id,
                })),
                validates: [validate.VALIDATE_CO_SO_SXKD_CHITIEUXETNGHIEM],
                getPopupContainer: () => document.getElementById("form-ckql"),
              },
              {
                col: 12,
                label: "Ghi chú",
                placeholder: "Nhập ghi chú",
                name: "choNgoaiQuanLy.ghiChu",
                fieldType: "textarea",
              },
            ],
          ]}
        />
      </div>
    </Fragment>
  );
};
export default AddChoNgoaiQuanLy;
