import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  CONST_PHE_DUYET,
  CONST_TYPE_BTN_SUBMIT,
  FORM_HTML_TYPE_SUBMIT,
} from "../../../../../../constants/constants";
import { CommonForm } from "../../../../../common";
import ThanhPhanDoanGiamSat from "../../tab/tab_thanh_phan_doan_giam_sat";
import * as actCuocGiamSat from "./../../.../../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";

const { DANGHOANTHIEN } = CONST_PHE_DUYET;
const DoanGiamSat = ({
  item,
  keHoachPhongs = [],
  maPhongBan,
  cuocGiamSat = {},
  allowUpdate = true,
  getPopupContainer,
}) => {
  const dispatch = useDispatch();
  const createRequest = (object = {}) =>
    dispatch(actCuocGiamSat.createRequest({ ...object, isQDTLD: true }));
  const updateRequest = (object = {}) =>
    dispatch(actCuocGiamSat.updateRequest({ ...object, isQDTLD: true }));

  const handleSubmit = (values) => {
    if (values.hasOwnProperty("id")) {
        updateRequest({
            data: values,
        });
    }
    else {
        createRequest({
            data: values,
        });
    }
  };

  return (
    <Fragment>
      <CommonForm
        data={[
          [
            {
              type: "custom",
              renderCustom: (
                <ThanhPhanDoanGiamSat
                  getPopupContainer={getPopupContainer}
                  cuocGiamSat={item}
                  form={`F-DGS-${maPhongBan}`}
                  keHoachPhongs={keHoachPhongs}
                  maPhongBan={maPhongBan}
                  allowUpdate={allowUpdate}
                />
              ),
            },
          ],
        ]}
        form={`F-DGS-${maPhongBan}`}
        onSubmit={handleSubmit}
        actions={
          allowUpdate
            ? [
                {
                  htmlType: FORM_HTML_TYPE_SUBMIT,
                  label: "Cập nhật",
                  icon: "fa fa-save",
                  type: CONST_TYPE_BTN_SUBMIT,
                },
              ]
            : false
        }
        keepDirtyOnReinitialize={false}
        initialValues={{
          trangThaiDuyet: DANGHOANTHIEN,
          ...cuocGiamSat,
          ...(item
            ? {
                tenCuocGiamSat: item.tenCuocGiamSat,
                idChaCuocGiamSat: item.id,
                idKeHoachGiamSat: item.idKeHoachGiamSat,
                nam: item.nam,
                dotXuat: item.dotXuat,
                loaiGiamSat: item.loaiGiamSat,
              }
            : {}),
          keHoachPhong: maPhongBan,
        }}
      />
    </Fragment>
  );
};

export default DoanGiamSat;
