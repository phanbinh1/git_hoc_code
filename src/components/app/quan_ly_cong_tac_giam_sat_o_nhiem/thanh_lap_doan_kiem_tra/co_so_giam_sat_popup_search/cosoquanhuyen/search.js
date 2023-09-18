import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Divider, Form, Select, Popover } from "antd";
import * as constants from "../../../../../../constants/constants";
import * as actDiaBan from "../../../../../../actions/app/danh_muc/dia_ban/dia_ban";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const quanHuyenDaCoDuLieu = [
  { ma: "493", ten: "Quận sơn trà" },
  { ma: "495", ten: "Quận cẩm lệ" },
  { ma: "490", ten: "Quận Liên chiểu" },
];

const FormSearch = ({
  onSubmit,
  onChange,
  searchData,
  dsQuanHuyen,
  setDsQuanHuyen,
  dsXaPhuong,
  setDsXaPhuong,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
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
          <div className="form-group">
            <Form {...layout}>
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
                  <Form.Item label="Số điện thoại">
                    <Input
                      allowClear
                      value={searchData.soDienThoai}
                      onChange={(e) => {
                        onChange({
                          ...searchData,
                          soDienThoai: e.target.value,
                        });
                      }}
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Số giấy phép ĐKKD">
                    <Input
                      allowClear
                      value={searchData.soGiayPhepDkkd}
                      onChange={(e) => {
                        onChange({
                          ...searchData,
                          soGiayPhepDkkd: e.target.value,
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
                      value={searchData.soChungNhanVsAttp}
                      onChange={(e) => {
                        onChange({
                          ...searchData,
                          soChungNhanVsAttp: e.target.value,
                        });
                      }}
                      placeholder="Số chứng nhận ATTP"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Quận/huyện" required>
                    <Select
                      onChange={(val) => {
                        onChange({
                          ...searchData,
                          maQuanHuyen: val,
                          maXaPhuong: undefined,
                        });
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
                      placeholder="Quận/Huyện"
                      value={searchData.maQuanHuyen}
                      allowClear
                    >
                      {dsQuanHuyen.map((item, i) => {
                        return (
                          <Select.Option
                            key={i}
                            value={item.ma}
                            disabled={
                              quanHuyenDaCoDuLieu.findIndex(
                                (qh) => qh.ma === item.ma
                              ) === -1
                            }
                          >
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
                      value={searchData.phuong}
                      disabled={!searchData.maQuanHuyen}
                      allowClear
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
            </Form>
          </div>
          <div className="form-group" style={{ textAlign: "right" }}>
            <Popover content="Quận Huyện bắt buộc chọn">
              <Button
                type="primary"
                onClick={onSubmit}
                disabled={!searchData.maQuanHuyen}
              >
                <i className="fa fa-search m-r-5" />
                Tìm kiếm
              </Button>
            </Popover>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormSearch;
