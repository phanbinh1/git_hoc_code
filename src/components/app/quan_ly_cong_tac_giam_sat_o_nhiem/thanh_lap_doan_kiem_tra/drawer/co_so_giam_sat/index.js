import React, { Fragment } from "react";
import { CommonForm } from "../../../../../common";
import { useDispatch, useSelector } from "react-redux";
import {
  CONST_LOAI_CO_SO,
  CONST_PHE_DUYET,
  CONST_TYPE_BTN_EDIT,
  CONST_TYPE_BTN_SUBMIT,
  FORM_HTML_TYPE_BUTTON,
  FORM_HTML_TYPE_SUBMIT,
} from "../../../../../../constants/constants";
import * as actHistoryDownload from "./../../../../../../actions/core/history_download";
import * as main from "./../../../../../../constants/main";
import * as apiUrl from "./../../../../../../constants/api";
import moment from "moment";
import { dateTimeFormat } from "../../../../../../constants/controll";
import * as actCuocGiamSat from "./../../.../../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import DoiTuongGiamSat from "../../tab/tab_doi_tuong_giam_sat";
import { cloneDeep } from "lodash";

const { DANGHOANTHIEN } = CONST_PHE_DUYET;

const CoSoGiamSat = ({
  item,
  maPhongBan,
  cuocGiamSat,
  dotGiamSat = [],
  allowUpdate = true,
}) => {
  const account_current = useSelector((state) => state.core.account_current);

  const dispatch = useDispatch();
  const createRequest = (object = {}) =>
    dispatch(actCuocGiamSat.createRequest({ ...object, isQDTLD: true }));
  const updateRequest = (object = {}) =>
    dispatch(actCuocGiamSat.updateRequest({ ...object, isQDTLD: true }));
  const createHistoryDownload = (value) =>
    dispatch(actHistoryDownload.handleCreate(value));
  //   const onDownload = (idCuocThanhKiemTra) => {
  //     let searchData = { idCuocThanhKiemTra };
  //     const process = {
  //       date: moment().format(dateTimeFormat),
  //       title: "Danh sách cơ sở giám sát",
  //       url: main.convertObjectToQueryVariable(
  //         apiUrl.API_QTNVTT_CUOCTHANHTRA_DOWNLOAD_COSO,
  //         { searchData: main.convertObjectToQueryVariableSearch(searchData) }
  //       ),
  //     };
  //     createHistoryDownload({
  //       username: account_current.name,
  //       process,
  //     });
  //   };

  const handleSubmit = (values) => {
    // values.coSoKinhDoanhs = values.coSoKinhDoanhs.filter(
    //   (coSo) => coSo.loaiCoSo !== CONST_LOAI_CO_SO.COSO_CHO
    // );

    const cloneCosoKinhDoanhs = cloneDeep(values.coSoKinhDoanhs);

    values.danhMucChos = cloneCosoKinhDoanhs.filter((coso) =>
      Boolean(coso.danhMucCho)
    );

    if (values.hasOwnProperty("id")) {
      updateRequest({
        data: values,
      });
    } else {
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
                <DoiTuongGiamSat
                  dotGiamSat={dotGiamSat}
                  keHoachGiamSat={item.keHoachGiamSat}
                  form={`F-CSTT-${maPhongBan}`}
                  loaiHinhSearchInit={
                    item &&
                    item.loaiHinhCoSoGiamSats &&
                    Array.isArray(item.loaiHinhCoSoGiamSats)
                      ? item.loaiHinhCoSoGiamSats
                      : []
                  }
                  allowUpdate={allowUpdate}
                />
              ),
            },
          ],
        ]}
        form={`F-CSTT-${maPhongBan}`}
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
                // {
                //   htmlType: FORM_HTML_TYPE_BUTTON,
                //   label: "Tải danh sách cuộc giám sát",
                //   icon: "fa fa-download",
                //   handleClick: () => onDownload(cuocGiamSat.id),
                //   disabled: !cuocGiamSat || !cuocGiamSat.id,
                //   type: CONST_TYPE_BTN_EDIT,
                // },
              ]
            : false
        }
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
export default CoSoGiamSat;
