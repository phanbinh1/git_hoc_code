import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { change, formValueSelector } from "redux-form";
import { queryString } from "../../../../constants/main";
import { CommonForm } from "../../../common";
import * as actCuocGiamSat from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import * as actKeHoachGiamSat from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra";
import * as formName from "./../../../../constants/form_name";
import * as constants from "./../../../../constants/constants";
import ThongTinCuocGiamSat, { loaiGiamSat } from "./tab/tab_thong_tin_cuoc_giam_sat";
import { Tabs } from "antd";
import KinhPhiThucHien from "./tab/tab_kinh_phi_thuc_hien";

export default function ThanhLapDoanKiemTraForm({
  handleBack,
  queryVariable,
  history,
  keHoachPhongs,
  dotXuat,
  nam,
}) {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const dispatch = useDispatch();
  const cuoc_giam_sat = useSelector(
    (state) => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.cuoc_giam_sat.item
  );
  const [
    keHoachTienHanhCuocGiamSatDefault,
    setKeHoachTienHanhCuocGiamSatDefault,
  ] = useState(cuoc_giam_sat.keHoachTienHanhCuocGiamSat);
  const [keHoachTienHanhCuocGiamSat, setKeHoachTienHanhCuocGiamSat] = useState(
    {
      ...cuoc_giam_sat.keHoachTienHanhCuocGiamSat,
      nam: cuoc_giam_sat.nam
    }
  );
  
  const createRequest = (object = {}) =>
    dispatch(actCuocGiamSat.createRequest(object));
  const updateRequest = (object = {}) =>
    dispatch(actCuocGiamSat.updateRequest(object));

  const getOneKeHoachGiamSatRequest = (object) =>
    dispatch(actKeHoachGiamSat.getOneRequest(object));

  const fNam = useSelector((state) =>
    formValueSelector(formName.FROM_NAME_QLCTGSON_CUOC_GIAM_SAT)(state, "nam")
  );

  useEffect(() => {
    if (
      queryVariable.idKeHoachGiamSat &&
      !isNaN(queryVariable.idKeHoachGiamSat)
    ) {
      const idKHGS = parseInt(queryVariable.idKeHoachGiamSat);
      getOneKeHoachGiamSatRequest({
        data: { id: idKHGS },
        requestSuccess: (res) => {
          if (res && res.result && res.result.id) {
            if (
              res.result.keHoachPhong &&
              keHoachPhongs.findIndex(
                (val) => val === res.result.keHoachPhong
              ) !== -1
            ) {
              const keHoach = res.result;
              setKeHoachTienHanhCuocGiamSatDefault(keHoach);
            }
          }
        },
        requestError: () => {},
      });
    }
  }, []);

  useEffect(() => {
    if (dotXuat === 0) {
      dispatch(
        change(
          formName.FROM_NAME_QLCTGSON_CUOC_GIAM_SAT,
          "nam",
          keHoachTienHanhCuocGiamSat && keHoachTienHanhCuocGiamSat.nam
            ? keHoachTienHanhCuocGiamSat.nam
            : null
        )
      );
    }
  }, [keHoachTienHanhCuocGiamSat, dotXuat]);

  const handleSubmit = (values) => {
    values.nam = parseInt(values.nam, 0);
    values.soQuyetDinh =
      values.soQuyetDinh && values.soQuyetDinh.trim() !== ""
        ? values.soQuyetDinh
        : null;
    if (values.laKeHoachLon === true) {
      values.laKeHoachLon = 1;
    } else if (values.laKeHoachLon === false) {
      values.laKeHoachLon = 0;
    }

    if (qs.idHoSoPhanAnhKienNghi)
      values.idHoSoPhanAnhKienNghi = qs.idHoSoPhanAnhKienNghi;

    delete values.hoSoMotCuaId

    if (values.hasOwnProperty("id")) {
      updateRequest({
        data: values,
        requestSuccess:
          queryVariable &&
          queryVariable.id_ke_hoach_thanh_tra &&
          !isNaN(queryVariable.id_ke_hoach_thanh_tra)
            ? history.go(-1)
            : handleBack,
      });
    } else {
      createRequest({
        data: values,
        requestSuccess:
          queryVariable &&
          queryVariable.id_ke_hoach_thanh_tra &&
          !isNaN(queryVariable.id_ke_hoach_thanh_tra)
            ? history.go(-1)
            : handleBack,
      });
    }
  };

  return (
    <Fragment>
      <CommonForm
        data={[
          [
            //row 1
            {
              type: "custom",
              renderCustom: (
                <Tabs key="tab" tabPosition="top">
                  <Tabs.TabPane
                    key="TAB_TTCTT"
                    tab={
                      <React.Fragment>
                        <i className="fa fa-info-circle m-r-10" />
                        Thông tin cuộc giám sát
                      </React.Fragment>
                    }
                  >
                    <ThongTinCuocGiamSat
                      keHoachPhongs={keHoachPhongs}
                      form={formName.FROM_NAME_QLCTGSON_CUOC_GIAM_SAT}
                      queryVariable={queryVariable}
                      history={history}
                      keHoachTienHanhCuocGiamSatDefault={keHoachTienHanhCuocGiamSatDefault}
                      setKeHoachTienHanhCuocGiamSatDefault={setKeHoachTienHanhCuocGiamSatDefault}
                      nam={nam}
                      keHoachTienHanhCuocGiamSat={keHoachTienHanhCuocGiamSat}
                      setKeHoachTienHanhCuocGiamSat={setKeHoachTienHanhCuocGiamSat}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    key="TAB_KPTH"
                    disabled={!fNam}
                    tab={
                      <React.Fragment>
                        <i className="fa fa-money m-r-10" />
                        Kinh phí thực hiện
                      </React.Fragment>
                    }
                  >
                    <KinhPhiThucHien form={formName.FROM_NAME_QLCTGSON_CUOC_GIAM_SAT} />
                  </Tabs.TabPane>
                </Tabs>
              ),
            },
          ],
        ]}
        onSubmit={handleSubmit}
        actions={[
          {
            htmlType: constants.FORM_HTML_TYPE_SUBMIT,
            label: cuoc_giam_sat.hasOwnProperty("id")
              ? constants.FORM_BUTTON_LABEL_UPDATE
              : constants.FORM_BUTTON_LABEL_CREATE,
            icon: "fa fa-save",
            type: constants.CONST_TYPE_BTN_SUBMIT,
          },
        ]}
        form={formName.FROM_NAME_QLCTGSON_CUOC_GIAM_SAT}
        initialValues={{
          trangThaiDuyet: constants.CONST_PHE_DUYET.DANGHOANTHIEN,
          loaiGiamSat: loaiGiamSat.CHUYENNGANH,
          idKeHoachGiamSat:
            keHoachTienHanhCuocGiamSatDefault &&
            keHoachTienHanhCuocGiamSatDefault.id
              ? keHoachTienHanhCuocGiamSatDefault.id
              : null,
          dotXuat,
          laKeHoachLon: true,
          nam:
            keHoachTienHanhCuocGiamSatDefault &&
            keHoachTienHanhCuocGiamSatDefault.nam
              ? keHoachTienHanhCuocGiamSatDefault.nam
              : null,
          keHoachPhong:
            keHoachPhongs.length >= 1
              ? keHoachPhongs[0]
              : keHoachTienHanhCuocGiamSatDefault &&
                keHoachTienHanhCuocGiamSatDefault.keHoachPhong
              ? keHoachTienHanhCuocGiamSatDefault.keHoachPhong
              : undefined,
          ...cuoc_giam_sat,
        }}
      />
    </Fragment>
  );
}
