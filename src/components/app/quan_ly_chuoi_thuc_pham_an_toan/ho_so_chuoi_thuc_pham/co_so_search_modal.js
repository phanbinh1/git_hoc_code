import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Modal, Input, Button, Badge, Popover, Divider, Form, TreeSelect, Select, Switch, Tooltip } from "antd";
import { parseOptions } from "./../../../../constants/controll";
import { CommonPagination } from "./../../../common";
import * as actCoSoSanXuatKinhDoanh from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as actLoaiHinhCoSo from "./../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import * as pageKeys from "./../../../../constants/page_key";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const FormSearch = ({ onSubmit, onChange, searchData }) => {
    const dispatch = useDispatch();
    const getLoaiHinhCoSoTree = (object = {}) => dispatch(actLoaiHinhCoSo.getTreeRequest(object));
    const [show, setShow] = useState(true);
    const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
    const [dsXaPhuong, setDsXaPhuong] = useState([]);
    const loai_hinh_co_so_tree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);
    useEffect(() => {
        getLoaiHinhCoSoTree();
    }, []);
    /**
     *  Get ds quận huyện của Đà Nẵng
     */
    useEffect(() => {
        dispatch(actDiaBan.getAllRequest({
            data: { parentCode: constants.CONST_DEFAULT_TINHTHANH.ma },
            requestSuccess: (res) => {
                if (res.result) {
                    setDsQuanHuyen(res.result);
                }
            }
        }))
    }, []);
    const _options = parseOptions(loai_hinh_co_so_tree, "id", "label", "children");
    return <React.Fragment>
        <Divider orientation="left">
            <span onClick={() => setShow(!show)} className="c-pointer">
                <i className={`m-r-10 c-pointer fa fa-angle-${show ? "up" : "down"} fa-1x`} />Tìm kiếm
            </span>
        </Divider>
        {show && <React.Fragment>
            <div className="form-group">
                <Form {...layout}>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Tên cơ sở">
                                <Input
                                    allowClear
                                    value={searchData.tenCoSo}
                                    onChange={(e) => {
                                        onChange({ ...searchData, tenCoSo: e.target.value })
                                    }}
                                    placeholder="Tên cơ sở"
                                />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label={<Fragment>
                                Loại hình cơ sở
                                <Tooltip title="Cho phép tìm kiếm theo nhiều loại hình">
                                    <Switch
                                        checkedChildren={<i className="fa fa-check" />}
                                        unCheckedChildren={<i className="fa fa-times" />}
                                        className="m-l-10"
                                        size="small"
                                        checked={searchData.chonNhieuLoaiHinh}
                                        onChange={(chonNhieuLoaiHinh) => onChange({ ...searchData, chonNhieuLoaiHinh })}
                                    />
                                </Tooltip>
                            </Fragment>}>
                                <TreeSelect
                                    value={searchData.loaiHinhCoSoId}
                                    onChange={value => onChange({ ...searchData, loaiHinhCoSoId: value })}
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
                                        onChange({ ...searchData, soGiayPhepDkkd: e.target.value })
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
                                        onChange({ ...searchData, soChungNhanAttp: e.target.value })
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
                                        onChange({ ...searchData, maQuanHuyen: val, maXaPhuong: undefined })
                                        val && dispatch(actDiaBan.getAllRequest({
                                            data: { parentCode: val },
                                            requestSuccess: (res) => {
                                                if (res.result) {
                                                    setDsXaPhuong(res.result);
                                                }
                                            }
                                        }))
                                    }}
                                    placeholder="Quận/Huyện"
                                    value={searchData.maQuanHuyen}
                                    allowClear
                                >
                                    {
                                        dsQuanHuyen.map((item, i) => {
                                            return <Select.Option key={i} value={item.ma}>{item.ten}</Select.Option>;
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Xã/phường">
                                <Select
                                    onChange={(val) => { onChange({ ...searchData, maXaPhuong: val }) }}
                                    placeholder="Xã/Phường"
                                    value={searchData.maXaPhuong}
                                    disabled={!searchData.maQuanHuyen}
                                    allowClear
                                >
                                    {
                                        dsXaPhuong.map((item, i) => {
                                            return <Select.Option key={i} value={item.ma}>{item.ten}</Select.Option>;
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="form-group" style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onSubmit}>
                    <i className="fa fa-search m-r-5" />Tìm kiếm
            </Button>
            </div>
        </React.Fragment>}
    </React.Fragment >
}

const ListCoSo = ({
    onClick,
    searchText = "",
    coSoSelected = [],
    coSoDisabled = [],
    mode = "default",
    _rowSelected,
    _setRowSelected
}) => {
    const [list, setList] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [_pagination, _setPagination] = useState(constants.CONST_PAGINATION);
    const paginations = useSelector(state => state.core.paginations);
    const [search, setSearch] = useState({ tenCoSo: searchText });

    const dispatch = useDispatch();
    const getDsCoSo = (object) => dispatch(actCoSoSanXuatKinhDoanh.getAllRequest({ ...object, pageKey: `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH` }));

    useEffect(() => {
        const index = paginations.findIndex(item => item.key === `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH`);;
        if (index !== -1 && paginations[index].pagination) {
            _setPagination({ ..._pagination, ...paginations[index].pagination });
        }
    }, [paginations]);

    useEffect(() => {
        setFirstLoad(false);
        _setRowSelected(coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []);
    }, [])

    const renderStt = (index) => {
        const { currentPage, pageSize } = _pagination;
        return (currentPage - 1) * pageSize + index + 1;
    };

    const renderLoaiHinhCoSo = (dsLoaiHinhCoSo) => {
        return dsLoaiHinhCoSo.map(item => <div> - {item.ten}</div>);
    }

    const rowSelection = () => {
        return {
            type: mode === "multiple" ? "checkbox" : "radio",
            align: "center",
            columnWidth: 30,
            selectedRowKeys: _rowSelected.map((item) => item.coSoId),
            onChange: (selectedRows) => {
                let index = -1;
                let rowSelected = [..._rowSelected];
                if (mode === "multiple") {
                    list.map((item) => {
                        index = selectedRows.findIndex(val => val === item.id);
                        if (index !== -1) {
                            if (rowSelected.findIndex(row => row.id === item.id) === -1) {
                                const diaChiCoSo = `${item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string" ? item.diaDiemKinhDoanh : ""}` +
                                    `${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}` +
                                    `${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}` +
                                    `${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}`;
                                rowSelected.push({
                                    ...item,
                                    idCoSo: item.id,
                                    diaChiCoSo
                                });
                            }
                        }
                        else {
                            rowSelected.findIndex(row => row.id === item.id) !== -1 && rowSelected.splice(rowSelected.findIndex(row => row.id === item.id), 1);
                        }
                        return null;
                    });
                }
                else {
                    list.map((item) => {
                        index = selectedRows.findIndex(val => val === item.id);
                        if (index !== -1) {
                            if (rowSelected.findIndex(row => row.id === item.id) === -1) {
                                const diaChiCoSo = `${item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string" ? item.diaDiemKinhDoanh : ""}` +
                                    `${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}` +
                                    `${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}` +
                                    `${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}`;
                                rowSelected = [{
                                    ...item,
                                    idCoSo: item.id,
                                    diaChiCoSo
                                }];
                            }
                        }
                        return null;
                    });
                }
                _setRowSelected(rowSelected);
            },
            getCheckboxProps: record => ({
                disabled: coSoDisabled.findIndex(coSo => coSo.id === record.id) !== -1
            }),
        }
    };

    const onSearch = () => {
        setLoading(true);
        let data = { ...search };
        if (search.chonNhieuLoaiHinh) {
            data.listLoaiHinhCoSo = data.loaiHinhCoSoId
            delete data.loaiHinhCoSoId;
        }
        getDsCoSo({
            data: {
                currentPage: 1,
                searchData: main.parseObjectToParams(data)
            },
            pageKey: `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_SEARCH_POPUP`,
            requestSuccess: (res) => {
                setList(res.result.map(item => ({ ...item, coSoId: item.id })));
                setLoading(false);
            },
            requestError: () => {
                setLoading(false);
            }
        })
    }

    return <React.Fragment>
        <FormSearch
            searchData={search || {}}
            onChange={(item) => setSearch(item)}
            onSubmit={onSearch}
        />
        <Table
            bordered
            size="small"
            loading={loading}
            pagination={false}
            className="ant-table-striped"
            rowSelection={rowSelection()}
            columns={[
                { dataIndex: "stt", title: "STT", width: 50, className: "c-pointer", align: "center" },
                { dataIndex: "tenCoSo", title: "Tên cơ sở", width: 200, className: "c-pointer" },
                { dataIndex: "diaChiCoSo", title: "Địa chỉ", className: "c-pointer" },
                { dataIndex: "loaiHinhCoSo", title: "Loại hình cơ sở", width: 150, className: "c-pointer" },
                { dataIndex: "soGiayPhepDkkd", title: "Số DKKD", width: 150, className: "c-pointer" },
                { dataIndex: "soChungNhanAttp", title: "Số CNATTP", width: 150, className: "c-pointer" },
            ]}
            dataSource={list.map((item, index) => {
                const diaChiCoSo = `${item.diaDiemKinhDoanh && typeof item.diaDiemKinhDoanh === "string" ? item.diaDiemKinhDoanh : ""}` +
                    `${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}` +
                    `${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}` +
                    `${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}`;
                return {
                    key: item.id,
                    ...item,
                    stt: renderStt(index),
                    diaChiCoSo,
                    loaiHinhCoSo: renderLoaiHinhCoSo(item.danhSachLoaiHinhCoSo)
                };
            })}
            onRow={(item) => {
                return {
                    onDoubleClick: () => {
                        const index = coSoDisabled.findIndex(coSo => coSo.id === item.id);
                        if (index === -1) {
                            if (mode === "multiple") {
                                onClick([item]);
                            }
                            else {
                                onClick(item);
                            }
                        }
                        else {
                            message.warning({ content: "Không thể chọn cơ sở này!", duration: 1, key: "CO_SO_SELECTED" });
                        }
                    }
                }
            }}
        />
        <CommonPagination
            onChange={(pagination) => {
                setLoading(true);
                getDsCoSo({
                    data: {
                        ...pagination,
                        currentPage: firstLoad ? 1 : pagination.currentPage,
                        searchData: main.parseObjectToParams(search)
                    },
                    pageKey: `${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH`,
                    requestSuccess: (res) => {
                        setList(res.result.map(item => ({ ...item, coSoId: item.id })));
                        setLoading(false);
                    },
                    requestError: () => {
                        setLoading(false);
                    }

                })
            }}
            paginationKey={`${pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH}_POPUP_SEARCH`}
        />
    </React.Fragment>
}

const CoSoSearchModal = ({
    visible = false,
    onCancel,
    onSelectCoSo,
    coSoSelected = [],
    coSoDisabled = [],
    mode = "default" || "multiple",
    searchText = ""
}) => {
    const [_rowSelected, _setRowSelected] = useState([]);
    return <Fragment>
        <Modal
            destroyOnClose
            title={<React.Fragment>
                Danh sách cơ sở
                    <Popover
                    overlayClassName="popover-tutorial-overlay danger"
                    content="Nhấp đúp vào dòng bất kì để chọn cơ sở."
                >
                    <Badge color="red" status="processing" className="m-l-10 c-pointer" />
                </Popover>
            </React.Fragment>}
            visible={visible}
            onCancel={typeof onCancel === "function" ? onCancel : null}
            width={1200}
            style={{ top: 50 }}
            footer={[
                <Button onClick={typeof onCancel === "function" ? onCancel : null} key="default">
                    <i className="fa fa-times m-r-5" />Đóng
                    </Button>,
                <Button
                    onClick={() => {
                        if (mode === "multiple") {
                            typeof onSelectCoSo === "function" && onSelectCoSo(_rowSelected);
                        }
                        else {
                            _rowSelected.length === 1 && typeof onSelectCoSo === "function" && onSelectCoSo(_rowSelected[0]);
                        }
                        typeof onCancel === "function" && onCancel();
                    }}
                    key="primary"
                    type="primary"
                // disabled={mode === "multiple" ? false : !_rowSelected.length === 1}
                >
                    <i className="fa fa-save m-r-5" />Chọn
                    </Button>
            ]}
        >
            <ListCoSo
                onClick={(item) => {
                    typeof onSelectCoSo === "function" && onSelectCoSo(item);
                    typeof onCancel === "function" && onCancel();
                }}
                searchText={searchText}
                coSoSelected={coSoSelected}
                coSoDisabled={coSoDisabled}
                mode={mode}
                _rowSelected={_rowSelected}
                _setRowSelected={_setRowSelected}
            />
        </Modal>
    </Fragment>
}

export default CoSoSearchModal;