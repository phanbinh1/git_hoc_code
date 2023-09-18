import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Table, ConfigProvider, Rate, Button, Empty } from 'antd';
import CommonAccount from '../../../../../components/common/common_account';
import * as constants from "./../../../../../constants/constants";
import moment from 'moment';
import * as actHistoryDownload from "./../../../../../actions/core/history_download";
import * as main from "./../../../../../constants/main";
import * as apiUrl from "./../../../../../constants/api";
import { dateFormat } from "./../../../../../constants/controll";
import { CommonFieldset } from '../../../../../components/common';

const DetailCoSo = ({ item }) => {
    const account_current = useSelector(state => state.core.account_current);
    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));

    const coSoGiamSats = item && item.coSoGiamSats && Array.isArray(item.coSoGiamSats) ? item.coSoGiamSats : [];

    const onDownload = () => {
        if (item && item.id) {
            let searchData = { idCuocGiamSat: item.id };
            const process = {
                date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
                title: "Dách cơ sở giám sát",
                url: main.convertObjectToQueryVariable(apiUrl.API_QTNVTT_CUOCTHANHTRA_DOWNLOAD_COSO, { searchData: main.convertObjectToQueryVariableSearch(searchData) })
            }
            createHistoryDownload({
                username: account_current.name,
                process
            })
        }
    };

    return (
        <Fragment>
            <CommonFieldset title={<Fragment><i className="fa fa-building-o m-r-10" />Cơ sở giám sát</Fragment>}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="pull-right">
                            <Button type="success" onClick={onDownload} disabled={!item || !item.id || coSoKinhDoanhs.length === 0}>
                                <i className="fa fa-download m-r-10" /> Tải danh sách cơ sở
                            </Button>
                        </div>
                    </div>
                </div>

                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                    <Table
                        size="small"
                        bordered
                        rowKey={record => record.key}
                        pagination={{
                            size: "default",
                            pageSizeOptions: constants.CONST_PAGE_SIZE_OPTIONS,
                            showSizeChanger: true,
                        }}
                        columns={[
                            { title: "STT", dataIndex: "stt", width: 50, align: "center" },
                            {
                                title: "Tên cơ sở",
                                dataIndex: "tenCoSo",
                            },
                            {
                                title: "Loại hình cơ sở",
                                dataIndex: "tenLoaiHinhCoSo",

                            },
                            {
                                title: "Số cấp",
                                dataIndex: "soGiayPhepDKKD",
                            },
                            {
                                title: "Ngày cấp",
                                dataIndex: "ngayCap",
                            },
                            {
                                title: "Điểm xếp hạng",
                                render: (_, record) => {
                                    const desc = ['Mức 1', 'Mức 2', 'Mức 3', 'Mức 4', 'Mức 5'];
                                    const danhSachXepHang = (item.danhSachXepHang || []).find(dsxh => dsxh.idCoSo === record.idCoSo);
                                    let sumRating = 0;
                                    (danhSachXepHang && danhSachXepHang.danhSachXepHang ? danhSachXepHang.danhSachXepHang : []).map(xh => {
                                        sumRating += xh.soLuongDanhGia;
                                        return null;
                                    })
                                    const rating = danhSachXepHang && danhSachXepHang.danhSachXepHang && danhSachXepHang.danhSachXepHang.length > 0 ? sumRating / danhSachXepHang.danhSachXepHang.length : 0
                                    return <Fragment>
                                        <Rate
                                            allowHalf
                                            disabled
                                            tooltips={desc}
                                            value={rating}
                                            className="m-r-10"
                                        />
                                        <Popover
                                            overlayClassName="popover-rating-detail"
                                            content={<Fragment>
                                                <Table
                                                    dataSource={danhSachXepHang && danhSachXepHang.danhSachXepHang ? danhSachXepHang.danhSachXepHang : []}
                                                    showHeader={false}
                                                    size="small"
                                                    pagination={false}
                                                    columns={[
                                                        {
                                                            render: (_, record) => {
                                                                return <Rate
                                                                    tooltips={desc}
                                                                    disabled
                                                                    value={record.soLuongDanhGia}
                                                                />
                                                            }
                                                        },
                                                        {
                                                            render: (_, record) => {
                                                                return <CommonAccount username={record.thanhVienDoanThanhTra.account} >
                                                                    {record.thanhVienDoanThanhTra.hoTen}
                                                                </CommonAccount>
                                                            }
                                                        }
                                                    ]}
                                                />
                                            </Fragment>
                                            }
                                            trigger="click"
                                        >
                                            <b className="c-pointer">{Math.round(rating * 100) / 100}</b>
                                        </Popover>
                                    </Fragment>
                                }
                            },
                            {
                                title: "Số điện thoại",
                                dataIndex: "soDienThoai",
                            },
                        ]}
                        dataSource={coSoKinhDoanhs.map((item, i) => ({ ...item, stt: i + 1 }))}
                        scroll={{ x: 700 }}
                    />
                </ConfigProvider>
            </CommonFieldset>
        </Fragment >
    );
}

export default DetailCoSo;