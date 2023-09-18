import React, { Fragment } from "react";
import { CommonForm } from "../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

export default function ThanhLapDoanKiemTraSearch({
  getAllRequest,
  dataSearch,
  handleStartLoadData,
  handleChangeDataSearch,
  dataSort,
  handleEndLoadData,
  onSelectRow,
  searchDefault,
  keHoachPhongs,
  dotXuat,
}) {
  const handleSubmit = (values) => {
    handleStartLoadData();
    let data = { ...searchDefault };
    if (values.soQuyetDinh && values.soQuyetDinh.trim() !== "") {
      data.soQuyetDinh = values.soQuyetDinh.trim();
    }
    if (values.tenQuyetDinh && values.tenQuyetDinh.trim() !== "") {
      data.tenQuyetDinh = values.tenQuyetDinh.trim();
    }
    if (values.ngayKyQuyetDinh) {
      data.ngayKyQuyetDinh = values.ngayKyQuyetDinh;
    }
    if (values.ngayBatDau) {
      data.ngayBatDau = values.ngayBatDau;
    }
    if (values.ngayKetThuc) {
      data.ngayKetThuc = values.ngayKetThuc;
    }
    handleChangeDataSearch(data);

    data = {
      searchData: main.parseObjectToParams({
        ...data,
        child: "YES",
        phoiHopThucHien: keHoachPhongs.toString(),
        keHoachPhong: keHoachPhongs.toString(),
        dotXuat,
      }),
      sortData: main.parseStringDataSort(dataSort),
      currentPage: 1,
    };

    getAllRequest({
      data,
      requestSuccess: () => {
        handleEndLoadData();
        onSelectRow();
      },
      requestError: handleEndLoadData,
    });
  };

  return (
    <Fragment>
      <CommonForm
        data={[
          [
            //row 1
            {
              col: 12,
              label: "Số kế hoạch",
              placeholder: "Số kế hoạch",
              name: "soKeHoach",
            },
          ],
          [
            // row2
            {
              col: 12,
              label: "Tên kế hoạch",
              placeholder: "Tên kế hoạch",
              name: "tenKeHoach",
            },
          ],
          [
            // row2
            {
              col: 12,
              label: "Trạng thái duyệt",
              placeholder: "Trạng thái duyệt",
              name: "trangThaiDuyet",
              fieldType: "select",
              options: constants.CONST_PHE_DUYET.thanhTraOptions
            },
          ],
          [
            // row4
            {
              col: 12,
              label: "Ngày bắt đầu",
              placeholder: "Ngày bắt đầu",
              name: "ngayBatDau",
              fieldType: "date",
            },
          ],
          [
            // row5
            {
              col: 12,
              label: "Ngày kết thúc",
              placeholder: "Ngày kết thúc",
              name: "ngayKetThuc",
              fieldType: "date",
            },
          ],
        ]}
        actions={[
          {
            htmlType: constants.FORM_HTML_TYPE_SUBMIT,
            label: "Tìm kiếm",
            icon: "fa fa-search",
          },
        ]}
        initialValues={dataSearch}
        onSubmit={handleSubmit}
        form={formName.FROM_NAME_QLCTGSON_CUOC_GIAM_SAT_SEARCH}
      />
    </Fragment>
  );
}
