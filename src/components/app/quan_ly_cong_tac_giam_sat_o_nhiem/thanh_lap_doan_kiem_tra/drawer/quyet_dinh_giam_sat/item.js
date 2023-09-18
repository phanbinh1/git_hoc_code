import { Steps, Tabs } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  CONST_ATTACH_TYPE,
  CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO,
} from "../../../../../../constants/constants";
import DrawerDoanGiamSat from "../doan_giam_sat";
import DrawerCoSoGiamSat from "../co_so_giam_sat";
import ThongTinBanHanhBtn from "./thong_tin_ban_hanh_btn";
import { handleUpdateCuocGiamSat } from "../../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import { QuyetDinhBienBan } from "../../../common";

const QuyetDinhGiamSatItem = ({
  cuocGiamSat,
  maPhongBan,
  item,
  keHoachPhongs = [],
  dotGiamSat = [],
  getPopupContainer,
}) => {
  const dispatch = useDispatch();
  const fCoSoKinhDoanhs =
    useSelector((state) =>
      formValueSelector(`F-CSTT-${maPhongBan}`)(state, "coSoKinhDoanhs")
    ) || [];
  const fDotXuat = useSelector((state) =>
    formValueSelector(`F-CSTT-${maPhongBan}`)(state, "dotXuat")
  );
  const [step, setStep] = useState(0);

  return (
    <Fragment>
      <Steps
        className="quyet-dinh-giam-sat"
        type="navigation"
        size="small"
        save
        current={step}
        onChange={(current) => setStep(current)}
        style={{ borderBottom: "1px solid #f5f5f5" }}
      >
        <Steps.Step title="Đoàn giám sát" />
        <Steps.Step title="Cơ sở giám sát" disabled={!cuocGiamSat.id} />
        <Steps.Step
          title="Quyết định giám sát"
          disabled={
            !cuocGiamSat.id || !Array.isArray(cuocGiamSat.coSoKinhDoanhs)
            // || (fDotXuat !== 1 && fCoSoKinhDoanhs.filter(cs => cs.trangThaiPheDuyetBoSungHoSo === CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.NONE || cs.trangThaiPheDuyetBoSungHoSo === CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.CHOPHEDUYET).length > 0)
          }
        />
        {/* <Steps.Step title="Tiến hành giám sát" disabled={!cuocGiamSat || !cuocGiamSat.quyetDinhThanhLapDoanGiamSat || cuocGiamSat.quyetDinhThanhLapDoanGiamSat.trangThaiQuyetDinhThanhLapDoanGiamSat !== "DAPHEDUYET"} />
            <Steps.Step title="Kết luận giám sát/Báo cáo KQ kiểm tra" disabled={!cuocGiamSat || !cuocGiamSat.quyetDinhThanhLapDoanGiamSat || cuocGiamSat.quyetDinhThanhLapDoanGiamSat.trangThaiQuyetDinhThanhLapDoanGiamSat !== "DAPHEDUYET"} /> */}
      </Steps>
      <Tabs activeKey={`${step}`} className="tab-none-title">
        <Tabs.TabPane key="0" tab="">
          <DrawerDoanGiamSat
            getPopupContainer={getPopupContainer}
            item={item}
            keHoachPhongs={keHoachPhongs}
            maPhongBan={maPhongBan}
            cuocGiamSat={cuocGiamSat}
            allowUpdate={
              !cuocGiamSat ||
              !cuocGiamSat.quyetDinhThanhLapDoanGiamSat ||
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat
                .trangThaiQuyetDinhThanhLapDoanGiamSat !== "DAPHEDUYET"
            }
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="1" tab="">
          <DrawerCoSoGiamSat
            getPopupContainer={getPopupContainer}
            item={item}
            keHoachPhongs={keHoachPhongs}
            maPhongBan={maPhongBan}
            cuocGiamSat={cuocGiamSat}
            allowUpdate={
              !cuocGiamSat ||
              !cuocGiamSat.quyetDinhThanhLapDoanGiamSat ||
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat
                .trangThaiQuyetDinhThanhLapDoanGiamSat !== "DAPHEDUYET"
            }
            dotGiamSat={dotGiamSat}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" style={{ padding: "12px" }} tab="">
          <ThongTinBanHanhBtn
            item={item}
            getPopupContainer={getPopupContainer}
            id={
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat.id
            }
            ngayKyQuyetDinh={
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat.ngayKyQuyetDinh
            }
            ngayLapQuyetDinh={
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat.ngayLapQuyetDinh
            }
            nguoiKyQuyetDinh={
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat.nguoiKyQuyetDinh
            }
            soQuyetDinh={
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat.soQuyetDinh
            }
            trangThaiQuyetDinhThanhLapGiamSat={
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat
                .trangThaiQuyetDinhThanhLapDoanGiamSat
            }
            cuocGiamSat={cuocGiamSat}
          />
          <QuyetDinhBienBan
            key={
              cuocGiamSat && cuocGiamSat.quyetDinhThanhLapDoanGiamSat
                ? cuocGiamSat.quyetDinhThanhLapDoanGiamSat.id
                : "-1"
            }
            getPopupContainer={getPopupContainer}
            allowTrinhKy={
              !cuocGiamSat || !cuocGiamSat.quyetDinhThanhLapDoanGiamSat
            }
            entityId={cuocGiamSat && cuocGiamSat.id}
            showVanBanTrinhKy={
              cuocGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat &&
              cuocGiamSat.quyetDinhThanhLapDoanGiamSat
                .trangThaiQuyetDinhThanhLapDoanGiamSat === "DAPHEDUYET"
            }
            trinhKyCallback={(res) => {
              if (res.status) {
                dispatch(
                  handleUpdateCuocGiamSat({
                    ...cuocGiamSat,
                    quyetDinhThanhLapDoanGiamSat: res.quyetDinhThanhLapDoan,
                  })
                );
              }
            }}
            attachEntityType={CONST_ATTACH_TYPE.QUYETDINHTHANHLAPDOANGIAMSAT}
          />
        </Tabs.TabPane>
        {/* <Tabs.TabPane key="3" style={{ padding: "12px" }}>
                <ThongTinBanHanhKeHoachThucHienCuocThanhTraBtn
                    item={item}
                    getPopupContainer={getPopupContainer}
                    id={cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.id}
                    ngayKy={cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.ngayKy}
                    ngayLapKeHoach={cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.ngayLapKeHoach}
                    nguoiKy={cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.nguoiKy}
                    soKeHoach={cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.soKeHoach}
                    trangThaiKeHoachTienHanhThanhTra={cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.trangThaiKeHoachTienHanhThanhTra}
                    cuocThanhTra={cuocThanhTra}
                />
                {
                    cuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra &&
                    <ThucHienThanhTra cuocThanhTra={cuocThanhTra} getPopupContainer={getPopupContainer} />
                }
                {
                    cuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra &&
                    <KetLuanThanhTra cuocThanhTra={cuocThanhTra} getPopupContainer={getPopupContainer} />
                }
                <QuyetDinhBienBan
                    key={cuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra ? cuocThanhTra.keHoachTienHanhCuocThanhTra.id : "-1"}
                    getPopupContainer={getPopupContainer}
                    allowTrinhKy={!cuocThanhTra || !cuocThanhTra.keHoachTienHanhCuocThanhTra}
                    entityId={cuocThanhTra && cuocThanhTra.id}
                    showVanBanTrinhKy={cuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra && cuocThanhTra.keHoachTienHanhCuocThanhTra.trangThaiKeHoachTienHanhThanhTra !== "DAPHEDUYET"}
                    attachEntityType={CONST_ATTACH_TYPE.KEHOACHTIENHANHTHANHTRA}
                    trinhKyCallback={res => {
                        if (res.status) {
                            dispatch(handleUpdateCuocThanhTra({ ...cuocThanhTra, keHoachTienHanhCuocThanhTra: res.keHoachTienHanhCuocThanhTra }));
                        }
                    }}
                />
            </Tabs.TabPane> */}
        {/* <Tabs.TabPane key="4" style={{ padding: "12px" }}>
                <QuyetDinhBienBan
                    getPopupContainer={getPopupContainer}
                    allowTrinhKy={!cuocThanhTra || !cuocThanhTra.ketLuanCuocThanhTra || cuocThanhTra.ketLuanCuocThanhTra.trangThaiKetLuanThanhTra !== "DAPHEDUYET"}
                    entityId={cuocThanhTra && cuocThanhTra.id}
                    showVanBanTrinhKy={cuocThanhTra && cuocThanhTra.ketLuanCuocThanhTra}
                    attachEntityType={CONST_ATTACH_TYPE.KETLUANCUOCTHANHTRA}
                    trinhKyCallback={res => {
                        if (res.status) {
                            dispatch(handleUpdateCuocThanhTra({ ...cuocThanhTra, ketLuanCuocThanhTra: res.ketLuanCuocThanhTra }));
                        }
                    }}
                />
            </Tabs.TabPane> */}
      </Tabs>
    </Fragment>
  );
};
export default QuyetDinhGiamSatItem;
