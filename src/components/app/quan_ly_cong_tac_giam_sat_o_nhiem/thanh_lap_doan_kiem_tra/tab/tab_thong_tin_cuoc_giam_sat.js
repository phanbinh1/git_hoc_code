import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { change, formValueSelector } from "redux-form";
import { CommonFormContent } from "./../../../../common";
import * as validate from "./../../../../../constants/validate";
import * as apiUrl from "./../../../../../constants/api";
import * as constants from "./../../../../../constants/constants";

export const loaiGiamSat = {
  options: [
    { value: "LIENNGANH", label: "Liên ngành" },
    { value: "CHUYENNGANH", label: "Chuyên ngành" },
  ],
  LIENNGANH: "LIENNGANH",
  CHUYENNGANH: "CHUYENNGANH",
};

const LIENNGANH = loaiGiamSat.LIENNGANH;
const options = loaiGiamSat.options;

const { CONST_PHE_DUYET } = constants;
const { DAPHEDUYET } = CONST_PHE_DUYET;

function ThongTinCuocGiamSat(props) {
  const {
    keHoachPhongs,
    form,
    keHoachTienHanhCuocGiamSatDefault,
    setKeHoachTienHanhCuocGiamSatDefault,
    nam,
    keHoachTienHanhCuocGiamSat,
    setKeHoachTienHanhCuocGiamSat,
  } = props;
  const fLoaiGiamSat = useSelector((state) =>
    formValueSelector(form)(state, "loaiGiamSat")
  );
  const fNam = useSelector((state) => formValueSelector(form)(state, "nam"));
  const fDotXuat = useSelector((state) =>
    formValueSelector(form)(state, "dotXuat")
  );
  const fNgayBatDau = useSelector((state) =>
    formValueSelector(form)(state, "ngayBatDau")
  );
  const fNgayKetThuc = useSelector((state) =>
    formValueSelector(form)(state, "ngayKetThuc")
  );

  const getKeHoachPhongOptions = () => {
    let result = [];
    constants.CONST_PHONG_BAN.optionsKeHoach.map((item) => {
      if (keHoachPhongs.findIndex((v) => item.value === v) !== -1) {
        result.push(item);
      }
      return result;
    });
    return result;
  };

  const hiddenKeHoachPhong = keHoachPhongs.length <= 1;

  return (
    <Fragment>
      <CommonFormContent
        data={[
          [
            {
              col:
                (fLoaiGiamSat === LIENNGANH ? 4 : 6) -
                (hiddenKeHoachPhong ? 0 : 3),
              label: "Kế hoạch giám sát",
              placeholder: "Kế hoạch giám sát",
              fieldType: "selectLoadMore",
              url: apiUrl.API_QLONATTP_KE_HOACH_THANH_TRA,
              valueKey: "id",
              labelKey: "tenKeHoach",
              searchKey: "searchData",
              searchKeyExtend: `${
                nam ? `nam=${nam}&` : ""
              }trangThaiDuyet=${DAPHEDUYET}&keHoachPhong=${keHoachPhongs.toString()}&phongBanPhoiHop=${keHoachPhongs.toString()}&tenKeHoach`,
              name: "idKeHoachGiamSat",
              hidden: fDotXuat,
              selectDefaultValue: keHoachTienHanhCuocGiamSatDefault,
              checkValid: true,
              validates: [
                validate.VALIDATE_QTGSONTP_CUOCGIAMSAT_KE_HOACH_GIAM_SAT_REQUIRED,
              ],
              changeCallback: (value, option) => {
                const keHoach = option && option.props;
                setKeHoachTienHanhCuocGiamSat(keHoach);
              },
            },
            {
              col: fDotXuat ? 3 : 2,
              fieldType: "year",
              label: "Năm",
              placeholder: "Năm",
              name: "nam",
              disabled: !fDotXuat,
              checkValid: true,
              validates: [validate.VALIDATE_QTNVTT_CUOCTHANHTRA_NAM_REQUIRED],
            },
            {
              col: 3,
              fieldType: "select",
              label: "Kế hoạch phòng",
              placeholder: "Kế hoạch phòng",
              name: "keHoachPhong",
              allowClear: false,
              options: getKeHoachPhongOptions(),
              checkValid: true,
              hidden: hiddenKeHoachPhong,
              validates: [
                validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_PHONG_REQUIRED,
              ],
            },
            {
              col: fLoaiGiamSat === LIENNGANH ? 2 : fDotXuat ? 6 : 4,
              fieldType: "select",
              label: "Loại giám sát",
              placeholder: "Loại giám sát",
              name: "loaiGiamSat",
              options: options,
              allowClear: false,
            },

            {
              col: 4,
              hidden: !(fLoaiGiamSat === LIENNGANH),
              fieldType: "textarea",
              label: "Đơn vị phối hợp",
              placeholder: "Đơn vị phối hợp",
              name: "donViPhoiHop",
              autoSize: true,
            },
          ],
          [
            // row 1
            {
              col: 8,
              fieldType: "textarea",
              label: "Tên đợt giám sát",
              placeholder: "Tên đợt giám sát",
              name: "tenCuocGiamSat",
              autoSize: true,
              checkValid: true,
              validates: [validate.VALIDATE_QTGSONTP_CUOCGIAMSAT_TEN_REQUIRED],
            },
            {
              col: 4,
              fieldType: "checkbox",
              label: "Đợt giám sát lớn",
              placeholder: "Đợt giám sát lớn",
              name: "laKeHoachLon",
            },
          ],
          [
            // row 1
            {
              col: 12,
              fieldType: "textarea",
              label: "Mục đích, yêu cầu",
              placeholder: "Mục đích, yêu cầu",
              name: "mucDichYeuCau",
            },
          ],
          [
            // row 1
            {
              col: 12,
              fieldType: "textarea",
              label: "Nội dung giám sát",
              placeholder: "Nội dung giám sát",
              name: "noiDungGiamSat",
            },
          ],
          [
            // row 3
            {
              col: 12,
              fieldType: "textarea",
              label: "Tổ chức và biện pháp thực hiện",
              placeholder: "Tổ chức và biện pháp thực hiện",
              name: "toChucBienPhapThucHien",
            },
          ],
          [
            //row 1
            {
              col: 6,
              fieldType: "date",
              label: "Ngày bắt đầu",
              placeholder: "Ngày bắt đầu",
              name: "ngayBatDau",
              maxDate: fNgayKetThuc ? fNgayKetThuc : "",
              minDate: fNam ? `01/01/${fNam}` : "",
              disabled: !fNam,
            },
            {
              col: 6,
              fieldType: "date",
              label: "Ngày kết thúc",
              placeholder: "Ngày kết thúc",
              name: "ngayKetThuc",
              minDate: fNgayBatDau ? fNgayBatDau : "",
              maxDate: fNam ? `31/12/${fNam}` : "",
              disabled: !fNam,
            },
          ],
          [
            // row 4
            {
              col: 12,
              fieldType: "textarea",
              label: "Ghi chú",
              placeholder: "Ghi chú",
              name: "ghiChu",
            },
          ],
        ]}
      />
    </Fragment>
  );
}

export default ThongTinCuocGiamSat;
