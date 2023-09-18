import AbortController from "abort-controller";
import React, { Fragment, useState, useEffect } from "react";
import { Table, Modal, Button, Form, Input, DatePicker, Divider } from "antd";
import { change, getFormValues, initialize, getFormInitialValues } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import * as actHoSoTuCongBo from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import * as act from "./../../../actions";
import * as main from "./../../../constants/main";
import * as constants from "./../../../constants/constants";
import { dateFormat } from "./../../../constants/controll";
import moment from "moment";
import { CommonPagination } from "../../common";

const pageKey = "PAGE_KEY_HO_SO_SELECT";
const ListHoSo = ({
	formName,
	queryVariable
}) => {
	const [tblLoading, setTblLoading] = useState(false);
	const [visibleModal, setVisibleModal] = useState(false);
	const formValues = useSelector(state => getFormValues(formName)(state));
	const initialValues = useSelector(state => getFormInitialValues(formName)(state));

	const dispatch = useDispatch();
	const getAllRequest = (object = {}) => dispatch(actHoSoTuCongBo.getAllRequest({ ...object, pageKey }));
	const data = formValues && formValues.listHoSo && Array.isArray(formValues.listHoSo) ? formValues.listHoSo : [];
	const _loaiCongBo = formValues && formValues.thongBaoCongBo && formValues.thongBaoCongBo.loaiCongBo ? formValues.thongBaoCongBo.loaiCongBo : constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO;

	const changeValue = (values) => dispatch(change(formName, "listHoSo", values));
	const setInitialize = (data) => dispatch(initialize(formName, data));

	useEffect(() => {
		if (queryVariable && queryVariable.ids && queryVariable.loaiCongBo && (queryVariable.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO || queryVariable.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO)) {
			setTblLoading(true);
			getAllRequest({
				data: {
					searchData: `loaiCongBo=${queryVariable.loaiCongBo}&listId=${queryVariable.ids.split(",")}&daThongBao=false&trangThaiHoSo=${constants.CONST_TRANG_THAI_HO_SO.HOSODAT}`
				},
				isPagination: false,
				requestSuccess: (res) => {
					if (res && res.status) {
						setInitialize({
							thongBaoCongBo: {
								...initialValues.thongBaoCongBo,
								loaiCongBo: queryVariable.loaiCongBo
							},
							listHoSo: res.result.filter(item => item.loaiCongBo === queryVariable.loaiCongBo)
						})
					}
					setTblLoading(false);
				},
				requestError: () => setTblLoading(false)
			})
		}
	}, [queryVariable])

	return <div onKeyPress={e => e.charCode === 13 && e.preventDefault()}>
		<ModalHoSo
			visibleModal={visibleModal}
			setVisibleModal={setVisibleModal}
			onSave={changeValue}
			loaiCongBo={_loaiCongBo}
			hoSoSelected={data}
			idThongBao={formValues && formValues.thongBaoCongBo && formValues.thongBaoCongBo.id ? formValues.thongBaoCongBo.id : null}
		/>
		<Table
			title={() => {
				return <Fragment>
					<div className="row">
						<div className="col-md-12">
							<Button type="primary" onClick={() => setVisibleModal(true)}>
								<i className="fa fa-pencil-square-o m-r-10" />Thay đổi
							</Button>
						</div>
					</div>
				</Fragment>
			}}
			loading={tblLoading}
			pagination={false}
			bordered
			size="small"
			rowKey="id"
			columns={[
				{
					title: "STT",
					render: (_, r, index) => index + 1,
					align: "center",
					width: 50
				},
				{
					title: "Tên sản phẩm",
					render: (_, r) => {
						return r.danhSachSanPhamCongBo.map((item, i) => {
							return <div key={i}>{item.tenSanPham}</div>;
						})
					}
				},
				{
					title: "Tên công ty",
					dataIndex: "tenDangKyKinhDoanh",
					render: (_, record, i) => {
						let rowSpan = 1;
						return {
							children: record.tenDangKyKinhDoanh,
							props: { rowSpan },
						};
					}
				},
				{
					title: "Địa điểm kinh doanh",
					render: (_, record, i) => {
						let rowSpan = 1;
						return {
							children: `${record.diaDiemKinhDoanh} 
							${record.xaPhuong && record.xaPhuong.ten ? ` - ${record.xaPhuong.ten}` : ""}
							${record.quanHuyen && record.quanHuyen.ten ? ` - ${record.quanHuyen.ten}` : ""}
							${record.tinhThanh && record.tinhThanh.ten ? ` - ${record.tinhThanh.ten}` : ""}
							`,
							props: { rowSpan },
						};
					}
				},
				{
					title: "Ngày tiếp nhận",
					dataIndex: "ngayTiepNhan"
				},
			]}
			dataSource={data.filter(item => item.loaiCongBo === _loaiCongBo)}
		/>
	</div>
}

const Search = ({
	data,
	onChange,
	onSearch
}) => {
	const [show, setShow] = useState(true);
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	return <Fragment>
		<Divider orientation="left">
			<div onClick={() => setShow(show => !show)} className="c-pointer">
				<i className={`fa fa-angle-${show ? "up" : "down"} m-r-10`} />Tìm kiếm
			</div>
		</Divider>
		{
			show && <Form {...layout}>
				<div className="form-group">
					<div className="row">
						<div className="col-md-6">
							<Form.Item label="Tên cơ sở">
								<Input
									value={data.tenCoSo}
									onChange={(e) => { onChange({ ...data, tenCoSo: e.target.value.trim() !== "" ? e.target.value : undefined }) }}
									placeholder="Tên cơ sở"
								/>
							</Form.Item>
						</div>
						<div className="col-md-6">
							<Form.Item label="Tên sản phẩm">
								<Input
									value={data.tenSanPham}
									onChange={(e) => { onChange({ ...data, tenSanPham: e.target.value.trim() !== "" ? e.target.value : undefined }) }}
									placeholder="Tên sản phẩm"
								/>
							</Form.Item>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<Form.Item label="Ngày tiếp nhận">
								<DatePicker
									value={data.tuNgayTiepNhan ? moment(data.tuNgayTiepNhan, dateFormat) : null}
									onChange={(e, date) => onChange({ ...data, tuNgayTiepNhan: date !== "" ? date : undefined })}
									placeholder="Từ ngày"
									format={dateFormat}
									style={{ width: "45%" }}
									disabledDate={d =>
										!d
										|| (data.denNgayTiepNhan && moment(data.denNgayTiepNhan, dateFormat).valueOf() < d.valueOf())
									}
								/>
								<span style={{ width: "10%", display: "inline-block", textAlign: "center" }}>~</span>
								<DatePicker
									value={data.denNgayTiepNhan ? moment(data.denNgayTiepNhan, dateFormat) : null}
									onChange={(e, date) => onChange({ ...data, denNgayTiepNhan: date !== "" ? date : undefined })}
									placeholder="đến ngày"
									format={dateFormat}
									style={{ width: "45%" }}
									disabledDate={d =>
										!d
										|| (data.tuNgayTiepNhan && moment(data.tuNgayTiepNhan, dateFormat).valueOf() > d.valueOf())
									}
								/>
							</Form.Item>
						</div>
						<div className="col-md-6">
							<Form.Item label="Thời điểm tự công bố">
								<DatePicker
									value={data.thoiDiemTuCongBoTuNgay ? moment(data.thoiDiemTuCongBoTuNgay, dateFormat) : null}
									onChange={(e, date) => onChange({ ...data, thoiDiemTuCongBoTuNgay: date !== "" ? date : undefined })}
									placeholder="Từ ngày"
									format={dateFormat}
									style={{ width: "45%" }}
									disabledDate={d =>
										!d
										|| (data.thoiDiemTuCongBoDenNgay && moment(data.thoiDiemTuCongBoDenNgay, dateFormat).valueOf() < d.valueOf())
									}
								/>
								<span style={{ width: "10%", display: "inline-block", textAlign: "center" }}>~</span>
								<DatePicker
									value={data.thoiDiemTuCongBoDenNgay ? moment(data.thoiDiemTuCongBoDenNgay, dateFormat) : null}
									onChange={(e, date) => onChange({ ...data, thoiDiemTuCongBoDenNgay: date !== "" ? date : undefined })}
									placeholder="đến ngày"
									format={dateFormat}
									style={{ width: "45%" }}
									disabledDate={d =>
										!d
										|| (data.thoiDiemTuCongBoTuNgay && moment(data.thoiDiemTuCongBoTuNgay, dateFormat).valueOf() > d.valueOf())
									}
								/>
							</Form.Item>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="row">
						<div className="col-md-12" style={{ textAlign: "right" }}>
							<Button type="primary" onClick={onSearch}>
								<i className="fa fa-search m-r-10" />Tìm kiếm
						</Button>
						</div>
					</div>
				</div>
			</Form>
		}
	</Fragment>
}

export const ModalHoSo = ({
	visibleModal,
	setVisibleModal,
	onSave,
	loaiCongBo,
	hoSoSelected,
	idThongBao = null
}) => {

	const [controller, setController] = useState(new AbortController())
	const [loading, setLoading] = useState(false);
	const [dataSearch, setDataSearch] = useState({});
	const [pagination, setPagination] = useState(main.getParamPagination(pageKey));

	const [selectedRows, setSelectedRows] = useState([]);
	const ho_so_tu_cong_bo_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.ho_so_tu_cong_bo.list);

	const onCancel = () => {
		setVisibleModal(false)
	}

	const onOk = () => {
		onSave(selectedRows);
		setVisibleModal(false)
	}

	const dispatch = useDispatch();
	const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
	const getAllRequest = (object = {}) => {
		setLoading(true);
		dispatch(actHoSoTuCongBo.getAllRequest({
			...object,
			pageKey,
			controller,
			requestSuccess: (res) => {
				setPagination(res.pagination);
				setLoading(false);
			},
			requestError: () => {
				setLoading(false);
			}
		}))
	};

	useEffect(() => {
		hoSoSelected && loaiCongBo ? setSelectedRows(hoSoSelected.filter(item => item.loaiCongBo === loaiCongBo)) : onSelectRow(hoSoSelected);
	}, [visibleModal, hoSoSelected]);

	useEffect(() => {
		if (!visibleModal) {
			controller.abort();
			setController(new AbortController());
		}
	}, [visibleModal]);

	return <Modal
		visible={visibleModal}
		title="Danh sách hồ sơ"
		onCancel={onCancel}
		width={1000}
		style={{ top: 50 }}
		destroyOnClose
		footer={[
			<Button type="default" onClick={onCancel} key="ok">
				<i className="fa fa-times m-r-5" />Hủy
			</Button>,
			<Button type="primary" onClick={onOk} key="cancel">
				<i className="fa fa-check m-r-5" />Chọn{selectedRows.length > 0 ? `(${selectedRows.length})` : ""}
			</Button>
		]}
	>
		<Search
			data={dataSearch}
			onChange={setDataSearch}
			onSearch={() => {
				getAllRequest({
					data: {
						searchData: main.parseObjectToParams({
							...dataSearch,
							loaiCongBo,
							daThongBao: false,
							listTrangThaiHoSo: constants.CONST_TRANG_THAI_HO_SO.HOSODAT
						})
					}
				})
			}}
		/>
		<Table
			loading={loading}
			size="small"
			bordered
			pagination={false}
			columns={[
				{
					title: "STT",
					width: 50,
					align: "center",
					render: (_, r, index) => {
						const { currentPage, pageSize } = pagination;
						return (currentPage - 1) * pageSize + index + 1;
					}
				},
				{
					title: "Sản phẩm",
					render: (_, record) => {
						const listSanPham = record.danhSachSanPhamCongBo;
						return listSanPham.map((item, i) => {
							return <div key={i}> - {item.tenSanPham}</div>
						})
					}
				},
				{ title: "Tên công ty", dataIndex: "tenDangKyKinhDoanh" },
				{
					title: "Địa điểm kinh doanh",
					render: (_, item) => {
						return `${item.diaDiemKinhDoanh} 
						${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
						${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
						${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
						`;
					}
				},
				{ title: "Ngày tiếp nhận", dataIndex: "ngayTiepNhan" },
			]}
			dataSource={ho_so_tu_cong_bo_list}
			rowKey="id"
			rowClassName={(record) => {
				if ((!idThongBao && record.thongBaoCongBoSanPham) || (idThongBao && record.thongBaoCongBoSanPham && record.thongBaoCongBoSanPham.id !== idThongBao)) {
					return "ant-row-warning";
				}
				return "";
			}}
			rowSelection={{
				selectedRowKeys: selectedRows.map(item => item.id),
				getCheckboxProps: record => ({
					disabled: record.thongBaoCongBoSanPham && record.thongBaoCongBoSanPham.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DAPHEDUYET
				}),
				onSelectAll: (keys, rows) => {
					const newRows = [
						...rows,
						...selectedRows.filter(item => !ho_so_tu_cong_bo_list.find(v => v.id === item.id))
					];
					const hsDaTonTai = newRows.filter(item => (!idThongBao && item.thongBaoCongBoSanPham) || (idThongBao && item.thongBaoCongBoSanPham && idThongBao !== item.thongBaoCongBoSanPham.id));
					if (hsDaTonTai.length > 0) {
						Modal.confirm({
							title: "Xác nhận",
							content: <Fragment>
								Có {hsDaTonTai.length}/{newRows.length} hồ sơ hiện đang tồn tại trong các thông báo đang chờ xử lý.<br />
								Bạn chắc chắn muốn chọn
							</Fragment>,
							onOk: () => { setSelectedRows(newRows) },
							okText: <Fragment><i className="fa fa-check m-r-10" />Đồng ý</Fragment>,
							cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>
						})
					}
					else {
						setSelectedRows(newRows);
					}
				},
				onSelect: (record, selected, rows) => {
					const newRows = [
						...rows,
						...selectedRows.filter(item => !ho_so_tu_cong_bo_list.find(v => v.id === item.id))
					];
					if (selected && ((!idThongBao && record.thongBaoCongBoSanPham) || (idThongBao && record.thongBaoCongBoSanPham && record.thongBaoCongBoSanPham.id !== idThongBao))) {
						Modal.confirm({
							title: "Xác nhận",
							content: <Fragment>
								Hồ sơ này hiện đang tồn tại trong 1 thông báo đang chờ xử lý.<br />
								Bạn chắc chắn muốn chọn
							</Fragment>,
							onOk: () => { setSelectedRows(newRows) },
							okText: <Fragment><i className="fa fa-check m-r-10" />Đồng ý</Fragment>,
							cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>
						})
					}
					else {
						setSelectedRows(newRows)
					}
				}
			}}
		/>
		<CommonPagination
			paginationKey={pageKey}
			onChange={(pagination) => {
				getAllRequest({
					data: {
						searchData: main.parseObjectToParams({
							...dataSearch,
							loaiCongBo,
							daThongBao: false,
							listTrangThaiHoSo: constants.CONST_TRANG_THAI_HO_SO.HOSODAT
						}),
						...pagination
					}
				})
			}}
		/>
	</Modal>
}

export default ListHoSo;