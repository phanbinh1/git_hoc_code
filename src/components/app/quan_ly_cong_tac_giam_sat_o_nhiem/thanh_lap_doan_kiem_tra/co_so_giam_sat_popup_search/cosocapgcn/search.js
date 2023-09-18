import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  Divider,
  Form,
  TreeSelect,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { parseOptions } from "../../../../../../constants/controll";
import * as actLoaiHinhCoSo from "../../../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import * as constants from "../../../../../../constants/constants";
import * as actDiaBan from "../../../../../../actions/app/danh_muc/dia_ban/dia_ban";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormSearch = ({ onSubmit, onChange, searchData }) => {
  const dispatch = useDispatch();
  const getLoaiHinhCoSoTree = (object = {}) =>
    dispatch(actLoaiHinhCoSo.getTreeRequest(object));
  const [show, setShow] = useState(true);
  const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
  const [dsXaPhuong, setDsXaPhuong] = useState([]);
  const loai_hinh_co_so_tree = useSelector(
    (state) => state.app.danh_muc.loai_hinh_co_so.tree
  );
  useEffect(() => {
    getLoaiHinhCoSoTree();
  }, []);
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
  const _options = parseOptions(
    loai_hinh_co_so_tree,
    "id",
    "label",
    "children"
  );
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
                  <Form.Item
                    label={
                      <Fragment>
                        Loại hình cơ sở
                        <Tooltip title="Cho phép tìm kiếm theo nhiều loại hình">
                          <Switch
                            checkedChildren={<i className="fa fa-check" />}
                            unCheckedChildren={<i className="fa fa-times" />}
                            className="m-l-10"
                            size="small"
                            checked={searchData.chonNhieuLoaiHinh}
                            onChange={(chonNhieuLoaiHinh) =>
                              onChange({ ...searchData, chonNhieuLoaiHinh })
                            }
                          />
                        </Tooltip>
                      </Fragment>
                    }
                  >
                    <TreeSelect
                      value={searchData.loaiHinhCoSoId}
                      onChange={(value) =>
                        onChange({ ...searchData, loaiHinhCoSoId: value })
                      }
                      showSearch
                      style={{ width: "100%" }}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Chọn loại hình cơ sở"
                      allowClear
                      treeDefaultExpandAll={false}
                      treeData={_options}
                      multiple={searchData.chonNhieuLoaiHinh}
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
                      onChange={(val) => {
                        onChange({
                          ...searchData,
                          listMaQuanHuyen: val,
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
                      value={searchData.listMaQuanHuyen}
                      allowClear
                    >
                      {dsQuanHuyen.map((item, i) => {
                        return (
                          <Select.Option key={i} value={item.ma}>
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
                      disabled={!searchData.listMaQuanHuyen}
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
            <Button type="primary" onClick={onSubmit}>
              <i className="fa fa-search m-r-5" />
              Tìm kiếm
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormSearch;
