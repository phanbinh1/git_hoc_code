import AbortController from "abort-controller";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider, Input, Button, Select, Form } from "antd";
import * as constants from "../../../../../constants/constants";
import * as actDiaBan from "../../../../../actions/app/danh_muc/dia_ban/dia_ban";
import { createID } from "../../../../../constants/main";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const wrapperId = createID();
const FormTuCongBoSearch = ({ onSubmit, onChange, searchData }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
  const [dsXaPhuong, setDsXaPhuong] = useState([]);
  /**
   *  Get ds quận huyện của Đà Nẵng
   */
  useEffect(() => {
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
  }, []);

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
                  <Form.Item label="Số giấy biên nhận TCB">
                    <Input
                      allowClear
                      value={searchData.soGiayBienNhanTuCongBo}
                      onChange={(e) => {
                        onChange({
                          ...searchData,
                          soGiayBienNhanTuCongBo: e.target.value,
                        });
                      }}
                      placeholder="Số giấy biên nhận TCB"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                {/* <div className="col-md-6">
                            <Form.Item label="Tên sản phẩm">
                                <Input
                                    allowClear
                                    value={searchData.tenSanPham}
                                    onChange={(e) => {
                                        onChange({ ...searchData, tenSanPham: e.target.value })
                                    }}
                                    placeholder="Tên cơ sở"
                                />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Số chứng nhận ATTP">
                                <Input
                                    allowClear
                                    value={searchData.soChungNhanAttp}
                                    onChange={(e) => {
                                        onChange({ ...searchData, soChungNhanAttp: e.target.value })
                                    }}
                                    placeholder="Số chứng nhận ATTP"
                                />
                            </Form.Item>
                        </div> */}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Quận/huyện">
                    <Select
                      onChange={(val, option) => {
                        onChange({ ...searchData, maQuanHuyen: val });
                        val &&
                          dispatch(
                            actDiaBan.getAllRequest({
                              data: { parentCode: val },
                              requestSuccess: (res) => {
                                if (res.result) {
                                  setDsXaPhuong(res.result);
                                }
                              },
                            })
                          );
                      }}
                      allowClear
                      placeholder="Quận/Huyện"
                      value={searchData.maQuanHuyen}
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
                      allowClear
                      disabled={!searchData.maQuanHuyen}
                      getPopupContainer={() => {
                        return (
                          document.getElementById(wrapperId) || document.body
                        );
                      }}
                    >
                      {dsXaPhuong.map((item, i) => {
                        return (
                          <Select.Option key={i} value={item.ma}>
                            {item.ten}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Button onClick={onSubmit} type="primary">
                Tìm kiếm
              </Button>
            </div>
          </Form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormTuCongBoSearch;
