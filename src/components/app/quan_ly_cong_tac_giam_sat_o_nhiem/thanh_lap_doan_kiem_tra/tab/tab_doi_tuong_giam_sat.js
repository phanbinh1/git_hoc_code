import {
  Button,
  ConfigProvider,
  Empty,
  message,
  Modal,
  Popover,
  Table,
  Tabs,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  arrayPush,
  arrayRemove,
  change,
  formValueSelector,
  getFormSyncErrors,
  untouch,
} from "redux-form";
import { ACT_ID_THANH_LAP_DOAN_KIEM_TRA } from "../../../../../constants/action_id";
import { CommonTableAction } from "../../../../common";
import CoSoGiamSatPopupSearch from "../co_so_giam_sat_popup_search/popup";
import * as actCuocGiamSat from "./../../.../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import * as constants from "./../../../../../constants/constants";
import AddChoNgoaiQuanLy from "./add_cho";
import AddCoSoKhongQuanLy from "./add_co_so";

function DoiTuongGiamSat({
  form,
  keHoachGiamSat,
  dotGiamSat = [],
  allowUpdate,
}) {
  const [visible, setVisible] = useState(false);
  const [visibleAddCoSo, setVisibleAddCoSo] = useState(false);
  const [visibleAddCho, setVisibleAddCho] = useState(false);
  const fNam = useSelector((state) => formValueSelector(form)(state, "nam"));
  const fId = useSelector((state) => formValueSelector(form)(state, "id"));
  const fDotXuat = useSelector((state) =>
    formValueSelector(form)(state, "dotXuat")
  );

  const danh_muc_cho_list = useSelector(
    (state) => state.app.quan_ly_thong_tin_tieu_thuong_kdtp.danh_muc_cho.list
  );

  const chi_tieu_list = useSelector(
    (state) => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.chi_tieu.list
  );

  const fCoSoKinhDoanhs =
    useSelector((state) => formValueSelector(form)(state, "coSoKinhDoanhs")) ||
    [];

  const fDanhMucChos =
    useSelector((state) => formValueSelector(form)(state, "danhMucChos")) || [];

  useEffect(() => {
    const data = [
      ...fCoSoKinhDoanhs
        .filter((coSo) => coSo.loaiCoSo !== constants.CONST_LOAI_CO_SO.COSO_CHO)
        .filter((coSo) => coSo.loaiCoSo !== null),
      ...fDanhMucChos,
    ];

    dispatch(change(form, "coSoKinhDoanhs", data));
  }, []);

  const fCoSoNgoaiDanhSach =
    useSelector((state) =>
      formValueSelector(form)(state, "coSoNgoaiDanhSach")
    ) || [];

  const fchoNgoaiQuanLy =
    useSelector((state) => formValueSelector(form)(state, "choNgoaiQuanLy")) ||
    [];

  const coSoKinhDoanhs =
    keHoachGiamSat && Array.isArray(keHoachGiamSat.coSoKinhDoanhs)
      ? keHoachGiamSat.coSoKinhDoanhs
      : [];
  const formSyncErrors = useSelector((state) => getFormSyncErrors(form)(state));

  const dispatch = useDispatch();
  const updateRequest = (object = {}) =>
    dispatch(actCuocGiamSat.updateRequest({ ...object, isQDTLD: true }));
  const changeValue = (fieldName, value) =>
    dispatch(change(form, fieldName, value));
  const [
    coSoNgoaiDanhSachAddressInit,
    setCoSoNgoaiDanhSachAddressInit,
  ] = useState(null);
  const dtt = useSelector((state) => {
    const fId = formValueSelector(form)(state, "id");
    return dotGiamSat.find((item) => item.id === fId);
  });

  const permission_priviliged = useSelector(
    (state) => state.core.permission.priviliged
  );
  const allowTrinhPheDuyetBoSungHoSo =
    permission_priviliged.findIndex(
      (item) =>
        item.idChucNang ===
        ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_TRINHPHEDUYETHOSOBOSUNG
    ) >= 0;
  const allowPheDuyetBoSungHoSo =
    permission_priviliged.findIndex(
      (item) =>
        item.idChucNang ===
        ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_PHEDUYETHOSOBOSUNG
    ) >= 0;
  const onAdd = () => {
    if (fNam) {
      setVisible(true);
    } else {
      message.warning({
        content:
          "Vui lòng nhập năm trong thông tin cuộc giám sát trước khi muốn thêm cơ sở!",
        duration: 3,
      });
    }
  };

  const onAddCoSoNgoaiDanhSach = (data) => {
    if (fNam) {
      if (data) {
        setCoSoNgoaiDanhSachAddressInit(data);
        dispatch(change(form, "coSoNgoaiDanhSach", data));
      } else {
        setCoSoNgoaiDanhSachAddressInit({
          tinhThanh: { ma: constants.CONST_DEFAULT_TINHTHANH.ma },
        });
        dispatch(
          change(form, "coSoNgoaiDanhSach", {
            tinhThanh: { ma: constants.CONST_DEFAULT_TINHTHANH.ma },
          })
        );
      }
      dispatch(
        untouch(
          form,
          "coSoNgoaiDanhSach.tenCoSo",
          "coSoNgoaiDanhSach.tenDoanhNghiep",
          "coSoNgoaiDanhSach.tenLoaiHinhCoSo",
          "coSoNgoaiDanhSach.soChungNhanAttp",
          "coSoNgoaiDanhSach.soGiayPhepDKKD",
          "coSoNgoaiDanhSach.tinhThanh.ma",
          "coSoNgoaiDanhSach.quanHuyen.ma",
          "coSoNgoaiDanhSach.xaPhuong.ma",
          "coSoNgoaiDanhSach.diaChi"
        )
      );
      setVisibleAddCoSo(true);
    } else {
      message.warning({
        content:
          "Vui lòng nhập năm trong thông tin cuộc giám sát trước khi muốn thêm cơ sở!",
        duration: 3,
      });
    }
  };

  const onAddCho = () => {
    if (fNam) {
      dispatch(
        untouch(
          form,
          "choNgoaiQuanLy.danhMucCho",
          "choNgoaiQuanLy.tenMau",
          "choNgoaiQuanLy.chiTieuXetNghiems",
          "choNgoaiQuanLy.soLuongMau",
          "choNgoaiQuanLy.ghiChu"
        )
      );
      setVisibleAddCho(true);
    } else {
      message.warning({
        content:
          "Vui lòng nhập năm trong thông tin cuộc giám sát trước khi muốn thêm chợ!",
        duration: 3,
      });
    }
  };

  const onRemove = (index) =>
    dispatch(arrayRemove(form, "coSoKinhDoanhs", index));

  const changeCoSo = (values) => {
    changeValue("coSoKinhDoanhs", values);
  };

  const renderData = () => {
    if (fCoSoKinhDoanhs) {
      return fCoSoKinhDoanhs.map((coSo, i) => {
        return {
          key: i,
          ...coSo,
        };
      });
    }
    return [];
  };

  const [
    coSoTrinhPheDuyetBoSungSelected,
    setCoSoTrinhPheDuyetBoSungSelected,
  ] = useState([]);
  const [trinhPheDuyet, setTrinhPheDuyet] = useState({
    visible: false,
    item: null,
    onShow: (item) =>
      setTrinhPheDuyet((tpd) => ({ ...tpd, visible: true, item })),
    onCancel: () => setTrinhPheDuyet((tpd) => ({ ...tpd, visible: false })),
  });

  const [pheDuyet, setPheDuyet] = useState({
    visible: false,
    item: null,
    onShow: (item) => {
      setPheDuyet((pd) => ({ ...pd, visible: true, item }));
    },
    onCancel: () => setPheDuyet((pd) => ({ ...pd, visible: false })),
  });

  return (
    <Fragment>
      <div className="col-md-12">
        <CoSoGiamSatPopupSearch
          visible={visible}
          list={coSoKinhDoanhs.filter((item) => {
            let listCoSoDaChon = [];
            (dotGiamSat || [])
              .filter((ctt) => ctt.id !== fId)
              .map((item) => {
                listCoSoDaChon = [
                  ...listCoSoDaChon,
                  ...(item.coSoKinhDoanhs || []),
                ];
                return listCoSoDaChon;
              });
            return (
              listCoSoDaChon.findIndex((cs) => cs.idCoSo === item.idCoSo) < 0
            );
          })}
          onCancel={() => setVisible(false)}
          form={form}
          idCuocGiamSat={fId}
          nam={fNam}
          coSoSelected={fCoSoKinhDoanhs}
          onSelectCoSo={(values) => {
            const coSos = values.map((item) => {
              return {
                ...item,
                tenLoaiHinhCoSo:
                  item.danhSachLoaiHinhCoSo &&
                  Array.isArray(item.danhSachLoaiHinhCoSo)
                    ? item.danhSachLoaiHinhCoSo
                        .map((item) => item.ten)
                        .toString()
                    : "",
                tenDoanhNghiep: item.tenDoanhNghiep,
                diaChi: item.diaChi,
                soGiayPhepDKKD: item.soGiayPhepDKKD,
                ngayCap: item.ngayCapGiayPhepDkkd,
                soChungNhanAttp: item.soChungNhanAttp,
              };
            });
            changeCoSo(coSos);
          }}
          loaiHinhCoSoOptions={
            keHoachGiamSat &&
            Array.isArray(keHoachGiamSat.loaiHinhCoSoKeHoachGiamSats)
              ? keHoachGiamSat.loaiHinhCoSoKeHoachGiamSats
              : []
          }
          mode="multiple"
          idKeHoachGiamSat={keHoachGiamSat.id}
        />

        <Modal
          id="modal-cs-kntdsql"
          title="Cơ sở không nằm trong danh sách quản lý"
          visible={visibleAddCoSo}
          onCancel={() => {
            setVisibleAddCoSo(false);
          }}
          width={1000}
          maskClosable={false}
          style={{ top: 50 }}
          destroyOnClose
          onOk={() => {
            if (fCoSoNgoaiDanhSach) {
              const data = fCoSoNgoaiDanhSach;
              data.trangThaiPheDuyetBoSungHoSo =
                constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.NONE;
              data.loaiCoSo = constants.CONST_LOAI_CO_SO.COSO_NGOAI;
              if (data.index >= 0) {
                dispatch(change(form, `coSoKinhDoanhs[${data.index}]`, data));
              } else {
                dispatch(arrayPush(form, "coSoKinhDoanhs", data));
              }
              setVisibleAddCoSo(false);
            }
          }}
          okButtonProps={{
            disabled: formSyncErrors.coSoNgoaiDanhSach ? true : false,
          }}
          okText={
            <Fragment>
              <i className="fa fa-save m-r-10" />
              Lưu
            </Fragment>
          }
          cancelText={
            <Fragment>
              <i className="fa fa-times m-r-10" />
              Hủy
            </Fragment>
          }
        >
          <AddCoSoKhongQuanLy
            form={form}
            coSoNgoaiDanhSachAddressInit={coSoNgoaiDanhSachAddressInit}
          />
        </Modal>

        <Modal
          id="modal-cs-kntdsql"
          title="Chọn chợ"
          visible={visibleAddCho}
          onCancel={() => {
            setVisibleAddCho(false);
          }}
          width={1000}
          maskClosable={false}
          style={{ top: 50 }}
          destroyOnClose
          onOk={() => {
            if (fchoNgoaiQuanLy) {
              const data = fchoNgoaiQuanLy;
              // data.trangThaiPheDuyetBoSungHoSo =
              //   constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.NONE;
              data.loaiCoSo = constants.CONST_LOAI_CO_SO.COSO_CHO;

              const newDanhMucCho = danh_muc_cho_list.find(
                (cho) => cho.id === data.danhMucCho
              );
              const newChiTieuList = findListItemInArray(
                chi_tieu_list,
                data.chiTieuXetNghiems
              );

              data.danhMucCho = newDanhMucCho;
              data.chiTieuXetNghiems = newChiTieuList;

              if (data.index >= 0) {
                dispatch(change(form, `coSoKinhDoanhs[${data.index}]`, data));
              } else {
                dispatch(arrayPush(form, "coSoKinhDoanhs", data));
              }

              setVisibleAddCho(false);
            }
          }}
          okButtonProps={{
            disabled: formSyncErrors.choNgoaiQuanLy ? true : false,
          }}
          okText={
            <Fragment>
              <i className="fa fa-save m-r-10" />
              Lưu
            </Fragment>
          }
          cancelText={
            <Fragment>
              <i className="fa fa-times m-r-10" />
              Hủy
            </Fragment>
          }
        >
          <AddChoNgoaiQuanLy />
        </Modal>

        <ConfigProvider
          renderEmpty={() => <Empty description="Không có dữ liệu!" />}
        >
          <Table
            rowSelection={{
              selectedRowKeys: coSoTrinhPheDuyetBoSungSelected.map(
                (item) => item.key
              ),
              onChange: (keys, rows) =>
                setCoSoTrinhPheDuyetBoSungSelected(rows),
              getCheckboxProps: (item) => ({
                disabled:
                  item.trangThaiPheDuyetBoSungHoSo ===
                    constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO
                      .DADUYET ||
                  !item.id ||
                  item.trangThaiPheDuyetBoSungHoSo ===
                    constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO
                      .KHONGDUYET,
              }),
            }}
            rowClassName={(item) => {
              switch (item.trangThaiPheDuyetBoSungHoSo) {
                case constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.DADUYET:
                  return "row-success";
                case constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO
                  .CHOPHEDUYET:
                  return "row-warning";
                case constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO
                  .KHONGDUYET:
                  return "row-error";
                default:
                  return "";
              }
            }}
            size="small"
            pagination={false}
            bordered
            dataSource={renderData()}
            // rowKey="id"
            columns={[
              {
                title: "STT",
                width: 50,
                align: "center",
                render: (_, item, index) => {
                  return (
                    <Fragment>
                      {index + 1}
                      <Popover
                        content={constants.CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.render(
                          item.trangThaiPheDuyetBoSungHoSo
                        )}
                      >
                        <i
                          className="fa fa-question-circle-o"
                          style={{ marginLeft: 5 }}
                        />
                      </Popover>
                    </Fragment>
                  );
                },
              },
              {
                title: "Tên cơ sở / Chợ",
                render: (_, item) => {
                  return (
                    item.tenCoSo || (item.danhMucCho ? item.danhMucCho.ten : "")
                  );
                },
              },
              {
                title: "Tên doanh nghiệp",
                render: (_, item) => {
                  return item.tenDoanhNghiep;
                },
              },
              {
                title: "Tên mẫu",
                render: (_, item) => {
                  return item.tenMau || "";
                },
              },
              {
                title: "Chỉ tiêu xét nghiệm",
                render: (_, item) => {
                  let chiTieuNames = item.chiTieuXetNghiems
                    ? item.chiTieuXetNghiems.map(
                        (chiTieu) => chiTieu.tenChiTieu
                      )
                    : [];
                  return chiTieuNames.join(", ");
                },
              },
              {
                title: "Số lượng mẫu",
                render: (_, item) => {
                  return item.soLuongMau;
                },
              },
              {
                title: "Địa chỉ",
                render: (_, item) => {
                  const cho = item.danhMucCho ? item.danhMucCho : item;
                  const diaChiString = `${cho.diaChi ? cho.diaChi : ""} ${
                    cho.xaPhuong && cho.xaPhuong.ten
                      ? " - " + cho.xaPhuong.ten
                      : ""
                  } ${
                    cho.quanHuyen && cho.quanHuyen.ten
                      ? " - " + cho.quanHuyen.ten
                      : ""
                  } ${
                    cho.tinhThanh && cho.tinhThanh.ten
                      ? " - " + cho.tinhThanh.ten
                      : ""
                  }`;

                  return diaChiString;
                },
              },
              {
                title: "Số điện thoại",
                render: (_, item) => {
                  return item.soDienThoai;
                },
              },
              {
                title: "Ghi chú",
                render: (_, item) => {
                  return item.ghiChu;
                },
                width: 100,
              },
              ...(allowUpdate
                ? [
                    {
                      title: "Thao tác",
                      width: 120,
                      align: "center",
                      render: (_, item, index) => {
                        return (
                          <CommonTableAction
                            key={index}
                            mode="inline"
                            actions={[
                              // {
                              //     tooltip: "Chỉnh sửa",
                              //     icon: "fa fa-pencil-square-o",
                              //     type: "success",
                              //     shape: "circle",
                              //     onClick: () => onAddCoSoNgoaiDanhSach({ ...item, index }),
                              //     // disabled: item.idCoSo
                              // },
                              {
                                tooltip: "Xoá",
                                icon: "fa fa-trash",
                                type: "danger",
                                shape: "circle",
                                confirm: true,
                                confirmLabel: "Bạn chắc chắn muốn xoá?",
                                onClick: () => onRemove(index),
                              },
                            ]}
                          />
                        );
                      },
                    },
                  ]
                : []),
            ]}
            title={
              allowUpdate
                ? () => {
                    return (
                      <React.Fragment>
                        <div className="row">
                          <div className="col-md-12">
                            <Button
                              type="primary"
                              onClick={onAdd}
                              size={constants.CONST_BTN_SIZE_DEFAULT}
                              disabled={!fNam}
                              className="m-r-5"
                            >
                              <i className="fa fa-plus m-r-5" /> Chọn cơ sở quản
                              lý
                            </Button>
                            <Button
                              className="m-r-5"
                              type="success"
                              onClick={() => onAddCoSoNgoaiDanhSach()}
                              size={constants.CONST_BTN_SIZE_DEFAULT}
                              disabled={!fNam}
                            >
                              <i className="fa fa-plus m-r-5" /> Thêm cơ sở
                              ngoài quản lý
                            </Button>
                            <Button
                              className="m-r-5"
                              size={constants.CONST_BTN_SIZE_DEFAULT}
                              disabled={!fNam}
                              onClick={() => onAddCho()}
                            >
                              <i className="fa fa-plus m-r-5" /> Chọn chợ{" "}
                            </Button>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  }
                : null
            }
          />
        </ConfigProvider>
      </div>
    </Fragment>
  );
}

export default DoiTuongGiamSat;

function findListItemInArray(arr, listId) {
  if (!Array.isArray(arr) && !Array.isArray(listId)) return [];

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const idItem = arr[i].id;
    if (listId.includes(idItem)) {
      result.push(arr[i]);
    }
  }

  return result;
}
