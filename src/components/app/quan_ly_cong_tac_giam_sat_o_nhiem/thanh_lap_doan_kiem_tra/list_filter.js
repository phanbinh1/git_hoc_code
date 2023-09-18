import React, { Fragment, useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";
import { CommonFilter } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import { queryString } from "./../../../../constants/main";
import moment from "moment";
import { Redirect, useHistory, useLocation } from "react-router";

const { CONST_PHE_DUYET } = constants;

function ListFilter({
  getAllRequest,
  dataSort,
  dataSearch,
  onSelectRow,
  handleChangeDataSearch,
  keHoachPhongs,
  dotXuat,
  handleStartLoadData,
  handleEndLoadData,
}) {
  const history = useHistory();
  const location = useLocation();
  const qs = queryString.parse(location.search);

  const nam = qs.nam && !isNaN(qs.nam) ? parseInt(qs.nam, 0) : moment().year();
  const trangThaiDuyet =
    qs.trang_thai_phe_duyet &&
    CONST_PHE_DUYET.thanhTraOptions.findIndex(
      (item) => item.num_key === qs.trang_thai_phe_duyet
    ) >= 0
      ? CONST_PHE_DUYET.thanhTraOptions.find(
          (item) => item.num_key === qs.trang_thai_phe_duyet
        ).value
      : undefined;
  const range = (start, end) =>
    Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);

  useEffect(() => {
    const currentYearElm = document.getElementById(`nam-${nam}`);
    currentYearElm && currentYearElm.scrollIntoView();
  }, [nam]);

  useEffect(() => {
    if (qs.loaded) {
      handleStartLoadData();
      const _dataSearch = {
        ...dataSearch,
        trangThaiDuyet,
        nam,
      };
      const data = {
        sortData: queryString.sortStringify(dataSort),
        currentPage: 1,
        searchData: queryString.stringify({
          ..._dataSearch,
          child: "YES",
          dotXuat,
          keHoachPhong: keHoachPhongs.toString(),
          phongBanPhoiHop: keHoachPhongs.toString(),
        }),
      };
      getAllRequest({
        data,
        requestSuccess: () => {
          handleChangeDataSearch({ ..._dataSearch });
          onSelectRow();
          handleEndLoadData();
        },
        requestError: handleEndLoadData,
      });
    }
  }, [nam, trangThaiDuyet, qs.loaded]);

  const getSelectedKeys = () => {
    let result = [];
    qs.trang_thai_phe_duyet &&
      result.push(`trang_thai_phe_duyet${qs.trang_thai_phe_duyet}`);
    result.length === 0 && result.push("ALL");
    return result;
  };

  return (
    <Fragment>
      {!qs.loaded && !qs.nam && (
        <Redirect
          to={{
            pathname: location.pathname,
            hash: location.hash,
            search: queryString.stringify({
              ...qs,
              nam: moment().year(),
              loaded: true,
            }),
          }}
        />
      )}
      <CommonFilter
        menus={[
          { label: "Tất cả kế hoạch", key: "ALL", iconCls: "fa-reply-all" },
          { type: "divider" },
          {
            isTitle: true,
            iconCls: "fa-pencil-square-o",
            label: "Trạng thái phê duyệt",
            disabled: true,
          },
          ...CONST_PHE_DUYET.thanhTraOptions.map((item) => ({
            key: `${item.name}${item.num_key}`,
            label: item.label,
            ...item,
          })),
        ]}
        selectedKeys={getSelectedKeys()}
        onSelect={(key, item) => {
          if (key === "ALL") {
            history.push({
              search: queryString.stringify({
                ...qs,
                ...{ trang_thai_phe_duyet: undefined },
              }),
            });
          } else {
            history.push({
              search: queryString.stringify({
                ...qs,
                ...{
                  [`${item.name}`]:
                    qs[`${item.name}`] === item.num_key
                      ? undefined
                      : item.num_key,
                },
              }),
            });
          }
        }}
      />
      <Dropdown
        trigger={["click"]}
        className="m-l-5"
        overlay={
          <Menu
            selectedKeys={[`${nam}`]}
            onClick={(_data) => {
              history.push({
                search: queryString.stringify({ ...qs, nam: _data.key }),
              });
            }}
          >
            {range(nam - 15, nam + 10)
              .reverse()
              .map((n) => (
                <Menu.Item key={`${n}`} value={n} id={`nam-${n}`}>
                  Năm {n}
                </Menu.Item>
              ))}
          </Menu>
        }
        overlayStyle={{ maxHeight: "100vh", height: "200px", overflow: "auto" }}
      >
        <Button type="success">
          <i className="fa fa-calendar m-r-5" />
          Năm {nam}
          <i className="fa fa-angle-down m-l-5" />
        </Button>
      </Dropdown>
    </Fragment>
  );
}

export default ListFilter;
