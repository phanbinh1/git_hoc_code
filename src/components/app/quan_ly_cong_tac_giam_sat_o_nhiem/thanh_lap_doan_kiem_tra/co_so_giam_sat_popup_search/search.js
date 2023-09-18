import AbortController from "abort-controller";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider, Input, Button, Select, Form } from "antd";
import * as constants from "./../../../../../constants/constants";
import * as actDiaBan from "./../../../../../actions/app/danh_muc/dia_ban/dia_ban";
import { createID } from "../../../../../constants/main";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const wrapperId = createID();
const FormSearch = ({
  onSubmit,
  onChange,
  searchData,
  loaiHinhCoSoOptions = [],
  quanHuyenList,
  controller,
  setController,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
  const [dsXaPhuong, setDsXaPhuong] = useState([]);
  /**
   *  Get ds quận huyện của Đà Nẵng
   */
  useEffect(() => {
    if (!quanHuyenList) {
      dispatch(
        actDiaBan.getAllRequest({
          data: { parentCode: constants.CONST_DEFAULT_TINHTHANH.ma },
          requestSuccess: (res) => {
            if (res.result) {
              setDsQuanHuyen(res.result);
            }
          },
        })
      );
    } else {
      setDsQuanHuyen(quanHuyenList);
      onChange({ ...searchData, maXaPhuong: undefined });
      quanHuyenList.map((qh) => {
        dispatch(
          actDiaBan.getAllRequest({
            data: { parentCode: qh.ma },
            requestSuccess: (res) => {
              if (res.result) {
                setDsXaPhuong((dsXaPhuong) => {
                  return [
                    ...dsXaPhuong.filter((item) => item.maQuanHuyen !== qh.ma),
                    {
                      maQuanHuyen: qh.ma,
                      tenQuanHuyen: qh.ten,
                      list: res.result,
                    },
                  ];
                });
              }
            },
          })
        );
        return null;
      });
      controller.abort();
      const _controller = new AbortController();
      setController(_controller);
      onSubmit({ searchData: { ...searchData }, controller: _controller });
    }
  }, [quanHuyenList]);

  return (
    <React.Fragment>
      <Divider orientation="left">
        <span onClick={() => setShow(!show)} className="c-pointer">
          <i
            className={`m-r-10 c-pointer fa fa-angle-${
              show ? "up" : "down"
            } fa-1x`}
          />
          Tìm kiếm
        </span>
      </Divider>
      {show && (
        <React.Fragment>
          <Form {...layout}>
            <div
              className="form-group"
              id={wrapperId}
              style={{ position: "relative" }}
            >
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Tên cơ sở">
                    <Input
                      allowClear
                      value={searchData.tenCoSo}
                      onChange={(e) => {
                        onChange({ ...searchData, tenCoSo: e.target.value });
                      }}
                      placeholder="Tên cơ sở"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Loại hình cơ sở">
                    <Select
                      placeholder="Loại hình cơ sở"
                      value={searchData.listLoaiHinhCoSoId}
                      onChange={(value) =>
                        onChange({ ...searchData, listLoaiHinhCoSoId: value })
                      }
                      mode="multiple"
                      getPopupContainer={() => {
                        return (
                          document.getElementById(wrapperId) || document.body
                        );
                      }}
                    >
                      {loaiHinhCoSoOptions.map((item, i) => {
                        return (
                          <Select.Option value={item.idLoaiHinhCoSo} key={i}>
                            {item.tenLoaiHinhCoSo}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Số giấy phép ĐKKD">
                    <Input
                      allowClear
                      value={searchData.soGiayPhepDKKD}
                      onChange={(e) => {
                        onChange({
                          ...searchData,
                          soGiayPhepDKKD: e.target.value,
                        });
                      }}
                      placeholder="Số giấy phép ĐKKD"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Số chứng nhận ATTP">
                    <Input
                      allowClear
                      value={searchData.soChungNhanAttp}
                      onChange={(e) => {
                        onChange({
                          ...searchData,
                          soChungNhanAttp: e.target.value,
                        });
                      }}
                      placeholder="Số chứng nhận ATTP"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Quận/huyện">
                    <Select
                      onChange={(val, option) => {
                        onChange({
                          ...searchData,
                          listMaQuanHuyen: val,
                          maXaPhuong: undefined,
                        });
                        val &&
                          Array.isArray(val) &&
                          val.map((mqh) => {
                            !dsXaPhuong.find(
                              (item) => item.maQuanHuyen === mqh
                            ) &&
                              dispatch(
                                actDiaBan.getAllRequest({
                                  data: { parentCode: mqh },
                                  requestSuccess: (res) => {
                                    if (res.result) {
                                      setDsXaPhuong((dsXaPhuong) => {
                                        const qh = dsQuanHuyen.find(
                                          (item) => item.ma === mqh
                                        );
                                        return [
                                          ...dsXaPhuong.filter(
                                            (item) => item.maQuanHuyen !== mqh
                                          ),
                                          {
                                            maQuanHuyen: mqh,
                                            tenQuanHuyen: qh.ten,
                                            list: res.result,
                                          },
                                        ];
                                      });
                                    }
                                  },
                                })
                              );
                            return null;
                          });
                      }}
                      placeholder="Quận/Huyện"
                      value={searchData.listMaQuanHuyen || []}
                      allowClear={quanHuyenList ? false : true}
                      mode="multiple"
                      getPopupContainer={() => {
                        return (
                          document.getElementById(wrapperId) || document.body
                        );
                      }}
                    >
                      {dsQuanHuyen.map((item, i) => {
                        return (
                          <Select.Option key={i} {...item} value={item.ma}>
                            {item.ten}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Xã/phường">
                    <Select
                      onChange={(val) => {
                        onChange({ ...searchData, maXaPhuong: val });
                      }}
                      placeholder="Xã/Phường"
                      value={searchData.maXaPhuong}
                      disabled={
                        !searchData.listMaQuanHuyen ||
                        !Array.isArray(searchData.listMaQuanHuyen) ||
                        searchData.listMaQuanHuyen.length === 0
                      }
                      allowClear
                      getPopupContainer={() => {
                        return (
                          document.getElementById(wrapperId) || document.body
                        );
                      }}
                    >
                      {dsXaPhuong
                        .filter(
                          (item) =>
                            (searchData.listMaQuanHuyen || []).findIndex(
                              (ma) => ma === item.maQuanHuyen
                            ) > -1
                        )
                        .map((item, i) => {
                          return (
                            <Select.OptGroup label={item.tenQuanHuyen}>
                              {item.list.map((xp, j) => {
                                return (
                                  <Select.Option key={j} value={xp.ma}>
                                    {xp.ten}
                                  </Select.Option>
                                );
                              })}
                            </Select.OptGroup>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormSearch;
