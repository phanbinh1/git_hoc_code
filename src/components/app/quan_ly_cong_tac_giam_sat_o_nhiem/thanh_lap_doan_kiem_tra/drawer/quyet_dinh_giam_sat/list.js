import { Drawer, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createID } from "../../../../../../constants/main";
import { CommonPhongBan } from "../../../../../common";
import QuyetDinhGiamSatItem from "./item";

function QuyetDinhGiamSatList({
  visible,
  onClose,
  item,
  keHoachPhongs = [],
  saveCallback,
}) {
  const [id] = useState(createID());
  const [cuocGiamSats, setCuocGiamSats] = useState([]);

  const [phongBans, setPhongBans] = useState([]);
  const ctt = useSelector((state) =>
    !item
      ? null
      : state.app.quan_ly_cong_tac_giam_sat_o_nhiem.cuoc_giam_sat.list.find(
          (c) => c.id === item.id
        )
  );
  useEffect(() => {
    if (ctt && visible) {
      setCuocGiamSats(ctt.dotGiamSat || []);
      setPhongBans(
        `${ctt.keHoachPhong}${
          ctt.phongBanPhoiHop ? `,${ctt.phongBanPhoiHop}` : ""
        }`
          .split(",")
          .filter((pb) => keHoachPhongs.findIndex((_pb) => _pb === pb) >= 0)
      );
    }
  }, [ctt, visible]);

  const getCuocGiamSat = (maPhongBan) => {
    const cuocGiamSat = cuocGiamSats.find(
      (ctt) => ctt.keHoachPhong === maPhongBan
    );
    if (cuocGiamSat) {
      cuocGiamSat.ngayBatDau = item.ngayBatDau;
      cuocGiamSat.ngayKetThuc = item.ngayKetThuc;
      cuocGiamSat.noiDungGiamSat = item.noiDungGiamSat;
    }

    return cuocGiamSat || {
      ngayBatDau: item.ngayBatDau,
      ngayKetThuc: item.ngayKetThuc,
      noiDungGiamSat: item.noiDungGiamSat
    };
  };

  const getPopupContainer = () => {
    return document.querySelector(`#${id} .ant-drawer-body`);
  };

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title="Quyết định giám sát"
      width={1200}
      destroyOnClose
      bodyStyle={{ padding: "10px" }}
      id={id}
    >
      {phongBans.length === 0 ? null : (
        <Tabs
          tabPosition="top"
          style={{ minHeight: "100%" }}
          type="card"
          renderTabBar={(props, DefaultTabBar) => {
            return <DefaultTabBar {...props} />;
          }}
        >
          {phongBans.map((khp) => (
            <Tabs.TabPane tab={<CommonPhongBan maPhongBan={khp} />} key={khp}>
              <QuyetDinhGiamSatItem
                item={ctt}
                keHoachPhongs={keHoachPhongs}
                maPhongBan={khp}
                cuocGiamSat={
                  {
                    ...getCuocGiamSat(khp),
                  } || {}
                }
                dotGiamSat={cuocGiamSats || []}
                getPopupContainer={getPopupContainer}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </Drawer>
  );
}

export default QuyetDinhGiamSatList;
