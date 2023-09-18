import { Alert, Badge, Modal, Popover, Tag } from "antd";
import { Markup } from "interweave";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { submit } from "redux-form";
import { TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE_KEHOACH_BY_ID } from "../../../../constants/type";
import {
  CommonPheDuyet,
  CommonTable,
  CommonTableAction,
} from "../../../common";
import * as actCuocGiamSat from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import { getOneRequest } from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as constants from "./../../../../constants/constants";
import {
  deepDiffMapper,
  encode,
  queryString,
} from "./../../../../constants/main";
import * as url from "./../../../../constants/url";
import { DrawerQuyetDinhGiamSat } from "./drawer";
import ListFilter from "./list_filter";
import ThanhLapDoanKiemTraSearch from "./thanh_lap_doan_kiem_tra_search";

const { CONST_PHE_DUYET } = constants;
const {
  DANGHOANTHIEN,
  DAPHEDUYET,
  KHONGPHEDUYET,
  CHOPHEDUYET,
  thanhTraOptions,
} = CONST_PHE_DUYET;

function ThanhLapDoanKiemTraList(props) {
  const {
    pageKey,
    dataLoading,
    dataSort,
    handleChangeDataSort,
    handleChangeDataSearch,
    handleEdit,
    handleDelete,
    getAllRequest,
    handleEndLoadData,
    handleStartLoadData,
    dataSearch,
    onSelectRow,
    keHoachPhongs,
    dotXuat,
    isVisiableSearch,
    searchDefault,
  } = props;

  const location = useLocation();
  const qs = queryString.parse(location.search);
  const dispatch = useDispatch();

  const cuoc_giam_sat_list = useSelector((state) =>
    state.app.quan_ly_cong_tac_giam_sat_o_nhiem.cuoc_giam_sat.list.filter(
      (item) => item.dotXuat === dotXuat
    )
  );
  const cuoc_giam_sat = useSelector(
    (state) => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.cuoc_giam_sat.item
  );
  const cuoc_giam_sat_list_ke_hoach = useSelector(
    (state) =>
      state.app.quan_ly_cong_tac_giam_sat_o_nhiem.cuoc_giam_sat.list_ke_hoach
  );
  const account_current = useSelector((state) => state.core.account_current);

  const [_danhSachCoSoVisible, _setDanhSachCoSoVisible] = useState(false);
  const [visibleQDBB, setVisibleQDBB] = useState(false);
  const [visibleBanHanh, setVisibleBanHanh] = useState(false);
  const [visibleKetLuan, setVisibleKetLuan] = useState(false);
  const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemActive, setItemActive] = useState(null);
  const [visiblePhongBanPhoiHop, setVisiblePhongBanPhoiHop] = useState(false);

  const [visibleQuyetDinhGiamSat, setVisibleQuyetDinhGiamSat] = useState(false);

  // const ketLuanRequest = (object = {}) => dispatch(actCuocGiamSat.ketLuanRequest(object));
  // const banHanhRequest = (object = {}) => dispatch(actCuocGiamSat.banHanhRequest(object));
  const pheDuyetRequest = (object = {}) =>
    dispatch(actCuocGiamSat.pheDuyetRequest(object));
  const updateRequest = (object = {}) =>
    dispatch(actCuocGiamSat.updateRequest(object));
  const submitForm = (form) => dispatch(submit(form));
  const updateCuocGiamSat = (data) =>
    dispatch(actCuocGiamSat.handleUpdate(data));

  useEffect(() => {
    if (itemActive && itemActive.id) {
      const _itemActive = cuoc_giam_sat_list.find(
        (ctt) => ctt.id === itemActive.id
      );
      if (!deepDiffMapper.equal(_itemActive, itemActive)) {
        setItemActive(_itemActive);
      }
    }
  }, [itemActive, cuoc_giam_sat_list]);

  const onChangeDataSort = (key) => {
    let dataSortChange = [];
    let sortMax = Math.max.apply(
      Math,
      dataSort.filter((val) => !val.max).map((val) => val.sort)
    );
    dataSort.map((item) => {
      if (item.key === key) {
        item.value = !item.value;
        item.sort = sortMax === item.sort ? sortMax : sortMax + 1;
      }
      return dataSortChange.push(item);
    });
    handleGetAllRequest(
      {},
      {
        dataSort: queryString.sortStringify(dataSortChange),
        requestSuccess: () => {
          handleChangeDataSort(dataSortChange);
        },
      }
    );
  };

  const columns = () => {
    let namSort = "asc",
      tenCuocGiamSatSort = "asc",
      ngayBatDauSort = "asc",
      ngayKetThucSort = "asc",
      trangThaiDuyetSort = "asc";

    dataSort &&
      dataSort.map((item) => {
        if (item.key === "nam" && !item.value) {
          namSort = "desc";
        }
        if (item.key === "tenCuocGiamSat" && !item.value) {
          tenCuocGiamSatSort = "desc";
        }
        if (item.key === "ngayBatDau" && !item.value) {
          ngayBatDauSort = "desc";
        }
        if (item.key === "ngayKetThuc" && !item.value) {
          ngayKetThucSort = "desc";
        }
        if (item.key === "trangThaiDuyet" && !item.value) {
          trangThaiDuyetSort = "desc";
        }
        return item;
      });
    return [
      {
        title: "STT",
        dataIndex: "stt",
        render: (text, record) => {
          return (
            <Fragment>
              {text}
              {!record.daPhanCongCongViec && (
                <Popover
                  title="Cảnh báo"
                  content={
                    <Fragment>
                      <b>
                        {Array.isArray(record.danhSachCongViecGiamSats) &&
                          record.danhSachCongViecGiamSats.filter(
                            (val) => val.danhSachCongViecGiamSat.length === 0
                          ).length}
                      </b>{" "}
                      cơ sở chưa được phân công nhiệm vụ
                    </Fragment>
                  }
                  placement="bottomLeft"
                >
                  <Badge dot className="c-pointer" />
                </Popover>
              )}
            </Fragment>
          );
        },
      },
      {
        title: dataSort ? (
          <div onClick={() => onChangeDataSort("nam")}>
            <span> Năm </span>
            <i className={`fa fa-sort-amount-${namSort}`} />
          </div>
        ) : (
          "Năm"
        ),
        dataIndex: "nam",
        align: "center",
        width: 70,
      },
      ...(dotXuat === 1
        ? []
        : [
            {
              title: "Kế hoạch giám sát",
              width: 250,
              dataIndex: "abc123",
              render: (_, item) => {
                return item.keHoachGiamSat ? (
                  <Link
                    to={{
                      pathname: url.URL_QTNVTT_O_NHIEM_GIAM_SAT_DETAIL,
                      search: queryString.stringify({
                        id: item.keHoachGiamSat.id,
                      }),
                    }}
                  >
                    <Markup
                      tagName="span"
                      content={
                        item.keHoachGiamSat && item.keHoachGiamSat.tenKeHoach
                      }
                    />
                  </Link>
                ) : null;
              },
            },
          ]),
      {
        title: dataSort ? (
          <div onClick={() => onChangeDataSort("tenCuocGiamSat")}>
            <span> Đợt giám sát</span>
            <i className={`fa fa-sort-amount-${tenCuocGiamSatSort}`} />
          </div>
        ) : (
          "Đợt giám sát"
        ),
        width: 200,
        render: (_, r) => {
          return (
            <Link
              to={{
                pathname: url.URL_QLONTP_THANH_LAP_DOAN_KIEM_TRA_DETAIL,
                search: queryString.stringify({ id: r.id }),
              }}
            >
              <Markup tagName="span" content={r.tenCuocGiamSat} />
            </Link>
          );
        },
      },
      {
        title: dataSort ? (
          <div onClick={() => onChangeDataSort("trangThaiDuyet")}>
            <span> Trạng thái </span>
            <i className={`fa fa-sort-amount-${trangThaiDuyetSort}`} />
          </div>
        ) : (
          "Trạng thái"
        ),
        dataIndex: "_trangThaiDuyet",
        align: "center",
        width: 155,
      },
      {
        title: dataSort ? (
          <div onClick={() => onChangeDataSort("ngayBatDau")}>
            <span> Ngày bắt đầu </span>
            <i className={`fa fa-sort-amount-${ngayBatDauSort}`} />
          </div>
        ) : (
          "Ngày bắt đầu"
        ),
        dataIndex: "ngayBatDau",
        align: "center",
        width: 140,
      },
      {
        title: dataSort ? (
          <div onClick={() => onChangeDataSort("ngayKetThuc")}>
            <span> Ngày kết thúc </span>
            <i className={`fa fa-sort-amount-${ngayKetThucSort}`} />
          </div>
        ) : (
          "Ngày kết thúc"
        ),
        dataIndex: "ngayKetThuc",
        align: "center",
        width: 150,
      },
      {
        dataIndex: "actions",
        width: 140,
        align: "center",
        fixed: "right",
      },
    ];
  };

  const data = () => {
    let result = [];
    cuoc_giam_sat_list.map((item) => {
      return result.push({
        ...item,
        key: item.id,
        _trangThaiDuyet: renderTrangThai(item),
        keHoach: renderKeHoach(item),
        actions: renderAction(item),
        disabled:
          item.trangThaiDuyet === DAPHEDUYET ||
          item.trangThaiDuyet === KHONGPHEDUYET,
      });
    });
    return result;
  };

  const renderKeHoach = (item) => {
    if (item.dotXuat === 1) {
      return <label className="label label-danger">Kế hoạch Đột xuất</label>;
    } else if (item.keHoachGiamSat && item.keHoachGiamSat.tenKeHoach) {
      return item.keHoachGiamSat.tenKeHoach;
    } else {
      return "";
    }
  };

  const renderTrangThai = (item) => {
    const index = thanhTraOptions.findIndex(
      (val) => val.value === item.trangThaiDuyet
    );
    const trangThai = thanhTraOptions[index] || {};
    return (
      <span>
        <Tag color={trangThai.color} key={trangThai.value}>
          {trangThai.label && trangThai.label.toUpperCase()}
        </Tag>
      </span>
    );
  };

  const getKeHoachGiamSatById = (id, callback) => {
    const keHoachGiamSat = cuoc_giam_sat_list_ke_hoach.find(
      (item) => item.id === id
    );
    if (keHoachGiamSat) {
      dispatch({
        type: TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE_KEHOACH_BY_ID,
        keHoachGiamSat,
      });
      callback();
    } else {
      dispatch(
        getOneRequest({
          data: { id },
          requestSuccess: (res) => {
            dispatch({
              type: TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE_KEHOACH_BY_ID,
              keHoachGiamSat: res.result,
            });
            callback();
          },
          requestError: (res) => {
            callback();
          },
        })
      );
    }
  };

  const renderAction = (item) => {
    return (
      <React.Fragment>
        <CommonTableAction
          actions={[
            // {
            //     label: "Quyết định/Biên bản/Biểu mẫu khác",
            //     icon: "fa fa-file-text-o",
            //     onClick: () => {
            //         setItemActive(item);
            //         setVisibleQDBB(true);
            //     }
            // },
            {
              label: "Quyết định giám sát",
              icon: "fa fa-file-text-o",
              disabled: keHoachPhongs.length <= 0,
              hidden: item.trangThaiDuyet !== DAPHEDUYET,
              onClick: () => {
                const callback = () => {
                  setItemActive(item);
                  setVisibleQuyetDinhGiamSat(true);
                };
                if (item.keHoachGiamSat && item.keHoachGiamSat.id) {
                  getKeHoachGiamSatById(item.keHoachGiamSat.id, callback);
                } else {
                  callback();
                }
              },
            },
            // {
            //     label: "Phối hợp thực hiện",
            //     icon: "fa fa-share-alt",
            //     hidden: account_current.name !== item.nguoiTao || item.trangThaiDuyet !== DAPHEDUYET || item.dotXuat !== 0,
            //     onClick: () => {
            //         setItemActive(item);
            //         setVisiblePhongBanPhoiHop(true);
            //     }
            // },
            {
              idChucNang: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_DELETE,
              confirm: true,
              confirmLabel: "Bạn chắc chắn muốn xóa?",
              onClick: () => handleDelete(false, item.id),
              type: "danger",
              hidden:
                item.trangThaiDuyet === DAPHEDUYET ||
                item.trangThaiDuyet === KHONGPHEDUYET,
            },
            {
              idChucNang: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_UPDATE,
              onClick: () => handleEdit(item.id),
              type: "success",
              hidden:
                item.trangThaiDuyet === DAPHEDUYET ||
                item.trangThaiDuyet === KHONGPHEDUYET,
            },
            {
              idChucNang:
                actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_TRINH_PHE_DUYET,
              hidden: item.trangThaiDuyet !== DANGHOANTHIEN,
              onClick: () => {
                Modal.confirm({
                  title: "Xác nhận",
                  content: "Bạn chắc chắn muốn trình phê duyệt?",
                  okText: (
                    <Fragment>
                      <i className="fa fa-check m-r-10" />
                      Xác nhận
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
                        trangThaiDuyet: CHOPHEDUYET,
                        item: {
                          ...item,
                          trangThaiDuyet: CHOPHEDUYET,
                        },
                        msgSuccess: "Đã trình phê duyệt!",
                        msgError: "Trình phê duyệt thất bại!",
                      },
                    });
                  },
                });
              },
            },
            {
              idChucNang: actID.ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_PHE_DUYET,
              hidden: item.trangThaiDuyet !== CHOPHEDUYET,
              onClick: () => {
                setItemActive(item);
                setVisiblePheDuyet(true);
              },
            },
            // {
            //     hidden: item.trangThaiDuyet !== DAPHEDUYET,
            //     label: "Ban hành",
            //     icon: "fa fa-pencil-square-o",
            //     onClick: () => {
            //         setItemActive(item);
            //         setVisibleBanHanh(true);
            //     }
            // }
          ]}
        />
      </React.Fragment>
    );
  };

  const handleGetAllRequest = (pagination = {}, data = {}) => {
    handleStartLoadData();
    let requestSuccess = handleEndLoadData;
    const requestError = handleEndLoadData;
    data = { dataSort: queryString.sortStringify(dataSort), ...data };
    var dataSortStr = "";
    if (data.hasOwnProperty("dataSort") && typeof data.dataSort === "string") {
      dataSortStr = data.dataSort;
    }
    if (
      data.hasOwnProperty("requestSuccess") &&
      typeof data.requestSuccess === "function"
    ) {
      requestSuccess = () => {
        data.requestSuccess();
        handleEndLoadData();
      };
    }
    var value = {
      ...pagination,
      searchData: queryString.stringify({
        ...dataSearch,
        dotXuat,
        keHoachPhong: keHoachPhongs.toString(),
        phongBanPhoiHop: keHoachPhongs.toString(),
        child: "YES",
        ...(qs.idKeHoachGiamSat
          ? { idKeHoachGiamSat: qs.idKeHoachGiamSat }
          : {}),
      }),
      sortData: dataSortStr,
    };
    getAllRequest({
      data: value,
      requestSuccess,
      requestError,
    });
  };

  const onPheDuyet = () => {
    const chiTietKinhPhis =
      itemActive &&
      itemActive.chiTietKinhPhis &&
      Array.isArray(itemActive.chiTietKinhPhis)
        ? itemActive.chiTietKinhPhis
        : [];

    const canhBaoKhongCoKinhPhi = chiTietKinhPhis.length === 0;

    if (canhBaoKhongCoKinhPhi) {
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
                  {canhBaoKhongCoKinhPhi && <p> - Chưa có dự toán kinh phí!</p>}
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
              ids: [itemActive.id],
              trangThaiDuyet: DAPHEDUYET,
              item: {
                ...itemActive,
                trangThaiDuyet: DAPHEDUYET,
              },
              msgSuccess: "Phê duyệt thành công!",
              msgError: "Phê duyệt thất bại!",
            },
            requestSuccess: () => setVisiblePheDuyet(false),
          });
        },
        okType: "primary",
      });
    } else {
      pheDuyetRequest({
        data: {
          ids: [itemActive.id],
          trangThaiDuyet: DAPHEDUYET,
          item: {
            ...itemActive,
            trangThaiDuyet: DAPHEDUYET,
          },
          msgSuccess: "Phê duyệt thành công!",
          msgError: "Phê duyệt thất bại!",
        },
        requestSuccess: () => setVisiblePheDuyet(false),
      });
    }
  };

  return (
    <Fragment>
      <DrawerQuyetDinhGiamSat
        visible={visibleQuyetDinhGiamSat}
        onClose={() => setVisibleQuyetDinhGiamSat(false)}
        item={itemActive}
        keHoachPhongs={keHoachPhongs}
      />
      <CommonPheDuyet
        visible={visiblePheDuyet}
        onCancel={() => setVisiblePheDuyet(false)}
        onConfirm={onPheDuyet}
        onNotConfirm={({ lyDo }) =>
          pheDuyetRequest({
            data: {
              ids: [itemActive.id],
              trangThaiDuyet: KHONGPHEDUYET,
              lyDoKhongPheDuyet: lyDo,
              item: {
                ...itemActive,
                trangThaiDuyet: KHONGPHEDUYET,
                lyDoKhongPheDuyet: lyDo,
              },
              msgSuccess: "Phê duyệt thành công!",
              msgError: "Phê duyệt thất bại!",
            },
            requestSuccess: () => setVisiblePheDuyet(false),
          })
        }
      />
      <CommonTable
        firstLoad={false}
        filter={
          <ListFilter
            getAllRequest={getAllRequest}
            onSelectRow={onSelectRow}
            dataSearch={dataSearch}
            dataSort={dataSort}
            handleChangeDataSearch={handleChangeDataSearch}
            keHoachPhongs={keHoachPhongs}
            dotXuat={dotXuat}
            handleStartLoadData={handleStartLoadData}
            handleEndLoadData={handleEndLoadData}
          />
        }
        columns={columns()}
        dataSource={data()}
        loading={dataLoading}
        bordered={true}
        onChange={handleGetAllRequest}
        pageKey={pageKey}
        onSelectRow={onSelectRow}
        controllerKey={encode(apiUrl.API_QLONTP_CUOC_GIAM_SAT)}
        search={{
          show: isVisiableSearch,
          component: (
            <ThanhLapDoanKiemTraSearch
              {...{
                dataSearch,
                getAllRequest,
                handleStartLoadData,
                handleChangeDataSearch,
                dataSort,
                handleEndLoadData,
                onSelectRow,
                searchDefault,
                keHoachPhongs,
                dotXuat,
              }}
            />
          ),
        }}
      />
    </Fragment>
  );
}

export default ThanhLapDoanKiemTraList;
