import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "./../../../../../constants/constants";
import * as actCuocGiamSat from "./../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import * as actID from "./../../../../../constants/action_id";
import { Alert, Modal, Tag } from "antd";
import * as act from "./../../../../../actions/index";
import { AntIcon } from "../../../../../components/antd";
import { CommonFieldset, CommonPheDuyet } from "../../../../../components/common";
import DetailThongTinCuocGiamSat from "./thong_tin_cuoc_giam_sat";
import DetailKinhPhi from "./kinh_phi";
import DetailDotGiamSat from "./dot_giam_sat";
import { QuyetDinhBienBan } from '../../../../../components/app/quan_ly_cong_tac_giam_sat_o_nhiem/common';

const { CONST_PHE_DUYET } = constants;
const {
  DANGHOANTHIEN,
  DAPHEDUYET,
  CHOPHEDUYET,
  KHONGPHEDUYET,
} = CONST_PHE_DUYET;

function CuocGiamSatDetail({ queryVariable, history }) {
  const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorLabel, setErrorLabel] = useState("Có lỗi xảy ra!");
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const getOneRequest = (obj) => dispatch(actCuocGiamSat.getOneRequest(obj));
  const pheDuyetRequest = (object = {}) =>
    dispatch(actCuocGiamSat.pheDuyetRequest(object));
  const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

  const permission_priviliged = useSelector(
    (state) => state.core.permission.priviliged
  );

  const allowViewRating = permission_priviliged.find(
    (permission) =>
      permission.idChucNang ===
      actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA_DETAIL.ACT_VIEW_RATING
  );

  const getItem = () => {
    setLoading(true);
    if (queryVariable.id && !isNaN(queryVariable.id)) {
      const id = parseInt(queryVariable.id, 0);
      getOneRequest({
        data: {
          id,
          layTatCaXepHang: allowViewRating ? true : false,
        },
        requestSuccess: (res) => {
          if (res.result) {
            setError(false);
            setItem(res.result);
          } else {
            setErrorLabel(
              <Fragment>
                Không tìm thấy cuộc giám sát có id là <b>{id}</b>
              </Fragment>
            );
            setError(true);
          }
          setLoading(false);
        },
        requestError: () => {
          setItem({});
          setError(true);
          setErrorLabel("Có lỗi xảy ra!");
          setLoading(false);
        },
      });
    } else {
      setItem({});
      setLoading(false);
      setError(true);
      setErrorLabel("Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    getItem();
  }, [queryVariable.id]);

  useEffect(() => {
    setAction([
      {
        key: actID.ACT_BACK,
        handleClick: () => history.go(-1),
      },
      {
        key: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA_DETAIL.ACT_PHE_DUYET,
        hidden: !(item && item.trangThaiDuyet === CHOPHEDUYET),
        handleClick: () => {
          setVisiblePheDuyet(true);
        },
        type: "primary",
      },
    ]);
  }, [item]);

  const onPheDuyet = () => {
    const thanhVienDoanGiamSats =
      item &&
      item.thanhVienDoanGiamSats &&
      Array.isArray(item.thanhVienDoanGiamSats)
        ? item.thanhVienDoanGiamSats
        : [];
    const chiTietKinhPhis =
      item && item.chiTietKinhPhis && Array.isArray(item.chiTietKinhPhis)
        ? item.chiTietKinhPhis
        : [];
    const coSoKinhDoanhs =
      item && item.coSoKinhDoanhs && Array.isArray(item.coSoKinhDoanhs)
        ? item.coSoKinhDoanhs
        : [];

    const canhBaoKhongCoThanhVien = thanhVienDoanGiamSats.length === 0;
    const canhBaoKhongCoTruongDoan =
      thanhVienDoanGiamSats.filter(
        (tv) =>
          tv.chucDanh === constants.CONST_CHUC_DANH_DOAN_THAM_DINH.TRUONGDOAN
      ).length === 0;
    const canhBaoKhongCoKinhPhi = chiTietKinhPhis.length === 0;
    const canhBaoKhongCoCoSoKinhDoanh = coSoKinhDoanhs.length === 0;

    if (
      canhBaoKhongCoThanhVien ||
      canhBaoKhongCoTruongDoan ||
      canhBaoKhongCoKinhPhi
    ) {
      Modal.confirm({
        width: 500,
        title: "Cảnh báo!",
        content: (
          <Fragment>
            <Alert
              showIcon
              type="error"
              icon={<i className="fa fa-exclamation-circle " />}
              className="m-b-10"
              description={
                <Fragment>
                  {canhBaoKhongCoThanhVien ? (
                    <p> - Chưa có thành viên đoàn giám sát!</p>
                  ) : (
                    <Fragment>
                      {canhBaoKhongCoTruongDoan && (
                        <p> - Đoàn thanh tra chưa có trưởng đoàn!</p>
                      )}
                    </Fragment>
                  )}
                  {canhBaoKhongCoKinhPhi && <p> - Chưa có dự toán kinh phí!</p>}
                  {canhBaoKhongCoCoSoKinhDoanh && (
                    <p> - Chưa có đối tượng giám sát!</p>
                  )}
                </Fragment>
              }
            />
          </Fragment>
        ),
        okText: (
          <Fragment>
            <i className="fa fa-check m-r-10" />
            Tiếp tục
          </Fragment>
        ),
        cancelText: (
          <Fragment>
            <i className="fa fa-times m-r-10" />
            Hủy
          </Fragment>
        ),
        onOk: () => {
          pheDuyetRequest({
            data: {
              ids: [item.id],
              trangThaiDuyet: DAPHEDUYET,
              item: { ...item, trangThaiDuyet: DAPHEDUYET },
              msgSuccess: "Phê duyệt thành công!",
              msgError: "Phê duyệt thất bại!",
            },
            requestSuccess: () => {
              setVisiblePheDuyet(false);
              setItem((item) => ({ ...item, trangThaiDuyet: DAPHEDUYET }));
            },
          });
        },
        okType: "primary",
      });
    } else {
      pheDuyetRequest({
        data: {
          ids: [item.id],
          trangThaiDuyet: DAPHEDUYET,
          item: { ...item, trangThaiDuyet: DAPHEDUYET },
          msgSuccess: "Phê duyệt thành công!",
          msgError: "Phê duyệt thất bại!",
        },
        requestSuccess: () => {
          setVisiblePheDuyet(false);
          setItem((item) => ({ ...item, trangThaiDuyet: DAPHEDUYET }));
        },
      });
    }
  };

  return (
    <Fragment>
      <div style={{ margin: 20 }}>
        {loading ? (
          <Alert
            icon={<AntIcon type="loading" />}
            type="info"
            message="Đang tải dữ liệu..."
            showIcon
          />
        ) : error ? (
          <Alert
            type="error"
            showIcon
            icon={<i className="fa fa-exclamation-circle " />}
            message="Thông báo lỗi!"
            description={
              <div className="row">
                <div className="col-md-12">
                  {errorLabel}
                  <div className="pull-right">
                    <Tag color="blue" className="c-pointer" onClick={getItem}>
                      <i className="fa fa-refresh m-r-5" />
                      Thử lại
                    </Tag>
                  </div>
                </div>
              </div>
            }
          />
        ) : (
          <Fragment>
            <CommonPheDuyet
              visible={visiblePheDuyet}
              onCancel={() => setVisiblePheDuyet(false)}
              onConfirm={() => {
                onPheDuyet();
              }}
              onNotConfirm={({ lyDo }) => {
                pheDuyetRequest({
                  data: {
                    ids: [item.id],
                    trangThaiDuyet: KHONGPHEDUYET,
                    lyDoKhongPheDuyet: lyDo,
                    item: {
                      ...item,
                      lyDoKhongPheDuyet: lyDo,
                      trangThaiDuyet: KHONGPHEDUYET,
                    },
                    msgSuccess: "Phê duyệt thành công!",
                    msgError: "Phê duyệt thất bại!",
                  },
                  requestSuccess: () => {
                    setVisiblePheDuyet(false);
                    setItem((item) => ({
                      ...item,
                      trangThaiDuyet: KHONGPHEDUYET,
                      lyDoKhongPheDuyet: lyDo,
                    }));
                  },
                });
              }}
            />
            <div className="row">
              <div className="col-md-7">
                {/* Thông tin */}
                <DetailThongTinCuocGiamSat item={item} />
              </div>
              <div className="col-md-5">
                {/* Kinh phí */}
                <DetailKinhPhi item={item} />
              </div>
              <div className="col-md-12 m-t-10 m-b-10">
                {/* Thành viên */}
                {item.trangThaiDuyet === DAPHEDUYET && (
                  <DetailDotGiamSat item={item} />
                )}
              </div>
            </div>

            <CommonFieldset
              scrollIntoView
              title={
                <Fragment>
                  <i className="fa fa-file-text-o m-r-10" />
                  Quyết định/Biên bản/Biểu mẫu khác
                </Fragment>
              }
            >
              <QuyetDinhBienBan
                entityId={item.id}
                bieuMauType={constants.CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM}
                attachEntityType={constants.CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM}
                allowTrinhKy={
                  item.trangThaiDuyet === DANGHOANTHIEN &&
                  item.laKeHoachLon === 1
                }
                trinhKyCallback={(res) =>
                  res &&
                  setItem((item) => ({ ...item, trangThaiDuyet: CHOPHEDUYET }))
                }
                showVanBanTrinhKy={item.laKeHoachLon === 1}
              />
            </CommonFieldset>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default CuocGiamSatDetail;
