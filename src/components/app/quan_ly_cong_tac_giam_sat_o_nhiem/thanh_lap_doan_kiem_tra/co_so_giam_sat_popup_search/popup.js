import AbortController from "abort-controller";
import { Button, Modal, Tabs } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CONST_LOAI_CO_SO,
  CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO,
} from "../../../../../constants/constants";
import ListCoSoCongBoSanPham from "./co_so_cong_bo_san_pham";
import ListCoSo from "./list_co_so";
import FormSearch from "./search";
import CoSoCapGCN from "./cosocapgcn";
import CoSoQuanHuyen from "./cosoquanhuyen";
import * as main from "./../../../../../constants/main";

function CoSoGiamSatPopupSearch({
  visible = false,
  onCancel,
  form,
  onSelectCoSo,
  coSoSelected = [],
  coSoDisabled = [],
  mode = "default" || "multiple",
  loaiHinhCoSoOptions = [],
  nam,
  quanHuyenList,
  idCuocGiamSat,
  idKeHoachGiamSat,
  list,
}) {
  const [_controller, _setController] = useState(new AbortController());
  const [coSoBanSelected, setCoSoBanSelected] = useState([]);
  const [coSoQuanHuyenSelected, setCoSoQuanHuyenSelected] = useState([]);
  const [coSoCongBoSelected, setCoSoCongBoSelected] = useState([]);
  const [coSoCapGCNSelected, setCoSoCapGCNSelected] = useState([]);
  const [coSoNgoaiSelected, setCoSoNgoaiSelected] = useState([]);
  const [danhMucChosSelected, setDanhMucChosSelected] = useState([]);
  const [search, setSearch] = useState(null);

  const _csSelected = [
    ...coSoBanSelected.map((item) => ({
      ...item,
      //   trangThaiPheDuyetBoSungHoSo:
      //     CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.DADUYET,
    })),

    ...coSoCongBoSelected.map((item) => {
      const c = coSoSelected.find(
        (cs) =>
          cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_CONGBOSANPHAM &&
          cs.tenCoSo === item.tenCoSo
      );

      const trangThaiPheDuyetBoSungHoSo = c
        ? c.trangThaiPheDuyetBoSungHoSo
        : CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.NONE;

      return {
        ...item,
        loaiCoSo: CONST_LOAI_CO_SO.COSO_CONGBOSANPHAM,
        trangThaiPheDuyetBoSungHoSo,
      };
    }),
    ...coSoCapGCNSelected.map((item) => {
      const c = coSoSelected.find(
        (cs) =>
          cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_CAPGCN &&
          cs.idCoSo === item.idCoSo
      );
      const trangThaiPheDuyetBoSungHoSo = c
        ? c.trangThaiPheDuyetBoSungHoSo
        : CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.NONE;
      return {
        ...item,
        loaiCoSo: CONST_LOAI_CO_SO.COSO_CAPGCN,
        trangThaiPheDuyetBoSungHoSo,
      };
    }),
    ...coSoQuanHuyenSelected.map((item) => {
      const c = coSoSelected.find(
        (cs) =>
          cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_QUANHUYEN &&
          cs.idCoSo === item.idCoSo
      );
      const trangThaiPheDuyetBoSungHoSo = c
        ? c.trangThaiPheDuyetBoSungHoSo
        : CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.NONE;
      return {
        ...item,
        tenDoanhNghiep: item.tenDoanhNghiep || item.tenChu,
        diaChi: item.diaDiemKinhDoanh,
        loaiCoSo: CONST_LOAI_CO_SO.COSO_QUANHUYEN,
        trangThaiPheDuyetBoSungHoSo,
      };
    }),
    ...coSoNgoaiSelected,
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    setCoSoBanSelected(() =>
      coSoSelected.filter((cs) => cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_BANATTP)
    );
    setCoSoQuanHuyenSelected(() =>
      coSoSelected.filter(
        (cs) => cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_QUANHUYEN
      )
    );
    setCoSoCongBoSelected(() =>
      coSoSelected.filter(
        (cs) => cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_CONGBOSANPHAM
      )
    );
    setCoSoCapGCNSelected(() =>
      coSoSelected.filter((cs) => cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_CAPGCN)
    );
    setCoSoNgoaiSelected(() =>
      coSoSelected.filter((cs) => cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_NGOAI)
    );
    setDanhMucChosSelected(() =>
      coSoSelected.filter((cs) => Boolean(cs.danhMucCho))
    );
  }, [coSoSelected]);

  return (
    <Fragment>
      <Modal
        destroyOnClose
        title={<React.Fragment>Danh sách cơ sở giám sát</React.Fragment>}
        visible={visible}
        onCancel={typeof onCancel === "function" ? onCancel : null}
        width={1200}
        style={{ top: 50 }}
        bodyStyle={{ padding: 0 }}
        footer={[
          <Button
            onClick={typeof onCancel === "function" ? onCancel : null}
            key="default"
          >
            <i className="fa fa-times m-r-5" />
            Đóng
          </Button>,
          <Button
            onClick={() => {
              const listCoSo = [
                ...coSoNgoaiSelected,
                ...danhMucChosSelected,
                ...main.deduplicate(
                  _csSelected.filter(
                    (item) =>
                      item.idCoSo &&
                      item.loaiCoSo !== CONST_LOAI_CO_SO.COSO_NGOAI
                  ),
                  "idCoSo"
                ),
                ...main.deduplicate(
                  _csSelected.filter(
                    (item) =>
                      !item.idCoSo &&
                      item.loaiCoSo !== CONST_LOAI_CO_SO.COSO_NGOAI
                  ),
                  "tenCoSo"
                ),
              ];
              console.log(listCoSo);
              if (mode === "multiple") {
                typeof onSelectCoSo === "function" && onSelectCoSo(listCoSo);
              } else {
                listCoSo.length === 1 &&
                  typeof onSelectCoSo === "function" &&
                  onSelectCoSo(listCoSo[0]);
              }
              typeof onCancel === "function" && onCancel();
            }}
            key="primary"
            type="primary"
            disabled={
              mode === "multiple"
                ? false
                : [
                    ...main.deduplicate(
                      _csSelected.filter((item) => item.idCoSo),
                      "idCoSo"
                    ),
                    ...main.deduplicate(
                      _csSelected.filter((item) => !item.idCoSo),
                      "tenCoSo"
                    ),
                  ].length !== 1
            }
          >
            <i className="fa fa-save m-r-5" />
            Chọn
          </Button>,
        ]}
      >
        <Tabs className="tab-ds-co-so-thanh-tra" destroyInactiveTabPane>
          <Tabs.TabPane key="tab-1" tab="Cơ sở thuộc Kế hoạch">
            <FormSearch
              controller={_controller}
              setController={_setController}
              quanHuyenList={quanHuyenList}
              searchData={search || {}}
              onChange={(item) => setSearch(item)}
              onSubmit={() => {}}
              loaiHinhCoSoOptions={loaiHinhCoSoOptions}
            />
            <ListCoSo
              quanHuyenList={quanHuyenList}
              nam={nam}
              idCuocGiamSat={idCuocGiamSat}
              list={list.filter((item) => {
                if (!search) {
                  return true;
                }
                let res = true;
                if (
                  search.tenCoSo &&
                  typeof item.tenCoSo === "string" &&
                  !item.tenCoSo.includes(search.tenCoSo)
                ) {
                  res = false;
                }
                if (
                  search.soGiayPhepDKKD &&
                  ((typeof item.soGiayPhepDKKD === "string" &&
                    !item.soGiayPhepDKKD.includes(search.soGiayPhepDKKD)) ||
                    !item.soGiayPhepDKKD)
                ) {
                  res = false;
                }

                if (
                  search.soChungNhanAttp &&
                  ((typeof item.soChungNhanAttp === "string" &&
                    !item.soChungNhanAttp.includes(search.soChungNhanAttp)) ||
                    !item.soChungNhanAttp)
                ) {
                  res = false;
                }
                if (
                  search.listMaQuanHuyen &&
                  Array.isArray(search.listMaQuanHuyen) &&
                  search.listMaQuanHuyen.length > 0 &&
                  ((item.quanHuyen &&
                    item.quanHuyen.ma &&
                    !search.listMaQuanHuyen.includes(item.quanHuyen.ma)) ||
                    !item.quanHuyen ||
                    !item.quanHuyen.ma)
                ) {
                  res = false;
                }
                if (
                  search.maXaPhuong &&
                  ((item.xaPhuong &&
                    item.xaPhuong.ma &&
                    search.maXaPhuong !== item.xaPhuong.ma) ||
                    !item.xaPhuong ||
                    !item.xaPhuong.ma)
                ) {
                  res = false;
                }
                return res;
              })}
              onClick={(item) => {
                typeof onSelectCoSo === "function" && onSelectCoSo(item);
                typeof onCancel === "function" && onCancel();
              }}
              form={form}
              coSoSelected={coSoSelected}
              coSoDisabled={coSoDisabled}
              mode={mode}
              loaiHinhCoSoOptions={loaiHinhCoSoOptions}
              _rowSelected={coSoBanSelected}
              _setRowSelected={setCoSoBanSelected}
              listCoSoSearch={list}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="tab-2" tab="Cơ sở công bố sản phẩm">
            <ListCoSoCongBoSanPham
              coSoSelected={coSoSelected}
              coSoDisabled={coSoDisabled}
              _rowSelected={coSoCongBoSelected}
              _setRowSelected={setCoSoCongBoSelected}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="tab-3" tab="Cơ sở cấp GCN">
            <CoSoCapGCN
              mode={mode}
              coSoSelected={coSoSelected}
              coSoDisabled={coSoDisabled}
              _rowSelected={coSoCapGCNSelected}
              _setRowSelected={setCoSoCapGCNSelected}
              idKeHoachGiamSat={idKeHoachGiamSat}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="tab-4" tab="Cơ sở quận huyện">
            <CoSoQuanHuyen
              onClick={(item) => {
                typeof onSelectCoSo === "function" &&
                  onSelectCoSo(
                    item.map((cs) => ({
                      ...cs,
                      loaiCoSo: CONST_LOAI_CO_SO.COSO_QUANHUYEN,
                    }))
                  );
                typeof onCancel === "function" && onCancel();
              }}
              // searchText={searchText}
              coSoSelected={(coSoSelected && Array.isArray(coSoSelected)
                ? coSoQuanHuyenSelected
                : []
              ).filter(
                (item) => item.loaiCoSo === CONST_LOAI_CO_SO.COSO_QUANHUYEN
              )}
              coSoDisabled={coSoDisabled}
              mode={mode}
              _rowSelected={coSoQuanHuyenSelected}
              _setRowSelected={setCoSoQuanHuyenSelected}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </Fragment>
  );
}

export default CoSoGiamSatPopupSearch;
