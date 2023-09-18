import React, { useEffect, useState, Fragment } from 'react';
import { Calendar, Dropdown, Menu, Button, Tooltip, DatePicker, Modal, Input, InputNumber, Form } from 'antd';
import CaNhanNghiPhepForm from "./../../../core/account_current/ca_nhan_nghi_phep/ca_nhan_nghi_phep_form"
import moment from "moment";
import { dateFormat, monthFormat } from "./../../../../constants/controll";
import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as message from "./../../../../constants/message";
import * as actCauHinh from "./../../../../actions/app/quan_ly_nghi_phep/quan_ly_cau_hinh_nghi_phep";
import { useDispatch } from 'react-redux';
import { CONST_NGHI_PHEP_BUOI, CONST_PHE_DUYET } from '../../../../constants/constants';
import DrawerChiTiet from "./drawer-detail";

const countNgayNghi = (ngayNghi = []) => {
	if (ngayNghi && Array.isArray(ngayNghi)) {
		return ngayNghi
			.map(item => {
				switch (item.loaiBuoi) {
					case CONST_NGHI_PHEP_BUOI.SANG.value:
					case CONST_NGHI_PHEP_BUOI.CHIEU.value:
						return 0.5;
					case CONST_NGHI_PHEP_BUOI.CANGAY.value:
						return 1;
					default: return 0;
				}
			})
			.reduce((a, b) => a + b, 0)
	}
	return 0;
};

const CaNhanNghiPhep = ({
	isVisiableList,
	isVisiableForm,
	renderActionThemMoi,
	itemUpdate,
	onEdit,
	onDelete
}) => {

	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [year, setYear] = useState(moment().year());
	const [month, setMonth] = useState(moment().month());

	const [chiTiet, setChiTiet] = useState({
		visible: false,
		nghiPhep: null,
		onShow: (nghiPhep) => setChiTiet(ct => ({ ...ct, nghiPhep, visible: true })),
		onClose: () => setChiTiet(ct => ({ ...ct, visible: false }))
	})

	const [ngayNghiThucTe, setNgayNghiThucTe] = useState({
		visible: false,
		soNgayNghi: 0,
		soNgayNghiThucTe: 0,
		nghiPhep: null,
		onShow: (nghiPhep) => {
			const soNgayNghi = nghiPhep.thongTinNghiPhepCaNhanThucTe ? nghiPhep.thongTinNghiPhepCaNhanThucTe.soNgayNghi : countNgayNghi(nghiPhep.thongTinNghiPhepChiTiets || []);
			setNgayNghiThucTe(n => ({ ...n, visible: true, nghiPhep, soNgayNghi, soNgayNghiThucTe: soNgayNghi }))
		},
		onChange: (soNgayNghiThucTe) => setNgayNghiThucTe(n => ({ ...n, soNgayNghiThucTe })),
		onCancel: () => setNgayNghiThucTe(n => ({ ...n, visible: false })),
		onSave: async (ngayNghiThucTe, trangThai = CONST_PHE_DUYET.DANGHOANTHIEN) => {
			if (ngayNghiThucTe.nghiPhep) {
				const data = {
					...ngayNghiThucTe.nghiPhep,
					thongTinNghiPhepCaNhanThucTe: {
						...(ngayNghiThucTe.nghiPhep.thongTinNghiPhepCaNhanThucTe ? { ...ngayNghiThucTe.nghiPhep.thongTinNghiPhepCaNhanThucTe } : {}),
						soNgayNghi: ngayNghiThucTe.soNgayNghiThucTe,
						trangThai
					}
				}
				const res = await api.put({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data });
				if (res && res.status && res.result) {
					res.msg && message.success({ content: res.msg });
					setData(data => data.map(item => item.id === res.result.id ? res.result : item))
					ngayNghiThucTe.onCancel();
				}
				else {
					res.msg && message.error({ content: res.msg });
				}
			}
		}
	})

	const [ngayLes, setNgayLes] = useState([]);
	const [ngayNghiTrongTuan, setNgayNghiTrongTuan] = useState([]);
	const [ngayDiLamTrongTuan, setNgayDiLamTrongTuan] = useState([]);
	const getCauHinhByMa = (data = {}) => dispatch(actCauHinh.getOneByMaRequest(data));

	const ngayLeTrongNam = ngayLes.find(item => `${item.nam}` === `${year}`);
	const ngayNghis = ngayLeTrongNam && Array.isArray(ngayLeTrongNam.ngayNghis) ? ngayLeTrongNam.ngayNghis : [];

	const getNgayNghiLeTrongNam = (year) => {
		getCauHinhByMa({
			data: { maCauHinh: `cauhinh_nghile_${year}` },
			requestSuccess: (res) => {
				try {
					const giaTri = JSON.parse(res.result.giaTri);
					setNgayLes(ngayLes => {
						const index = ngayLes.findIndex(item => item.nam === giaTri.nam);
						if (index >= 0) {
							ngayLes[index] = giaTri;
							return ngayLes;
						}
						else {
							return [...ngayLes, giaTri];
						}
					})
				}
				catch (e) { }
			}
		})
	}

	useEffect(() => {
		getCauHinhByMa({
			data: { maCauHinh: "cauhinh_nghitrongtuan" },
			requestSuccess: (res) => {
				try {
					const giaTri = JSON.parse(res.result.giaTri);
					giaTri.ngayNghiTrongTuan && Array.isArray(giaTri.ngayNghiTrongTuan) && setNgayNghiTrongTuan(giaTri.ngayNghiTrongTuan);
					giaTri.ngayDiLam && Array.isArray(giaTri.ngayDiLam) && setNgayDiLamTrongTuan(giaTri.ngayDiLam);
				}
				catch (e) { }
			}
		});
	}, [])

	const loadData = (year) => {
		const searchData = `nam=${year}`;
		api.get({ url: apiUrl.API_THONG_TIN_CA_NHAN_NGHI_PHEP, data: { searchData } })
			.then(res => {
				if (res && res.status) {
					setData(res.result);
				} else {
					res.msg && message.error({ content: res.msg });
				}
			})
	}

	useEffect(() => {
		loadData(year);
		getNgayNghiLeTrongNam(year);
		const elm = document.getElementById(`year-${year}`)
		elm && elm.scrollIntoView()
	}, [year])

	useEffect(() => {
		const elm = document.getElementById(`month-${month}`)
		elm && elm.scrollIntoView()
	}, [month])

	const onNghiPhepMouseEnter = (nghiphep) => {
		if (nghiphep) {
			const nghiPhepElms = document.querySelectorAll(`[dot-nghi-phep-id="${nghiphep.id}"]`);
			nghiPhepElms.forEach(item => {
				if (item.parentElement && item.parentElement.parentElement && item.parentElement.parentElement.parentElement) {
					const tdElm = item.parentElement.parentElement.parentElement;
					tdElm.classList.add("np-active");
				}
			})
		}
	}

	const onNghiPhepMouseLeave = (nghiphep) => {
		if (nghiphep) {
			const nghiPhepElms = document.querySelectorAll(`[dot-nghi-phep-id="${nghiphep.id}"]`);
			nghiPhepElms.forEach(item => {
				if (item.parentElement && item.parentElement.parentElement && item.parentElement.parentElement.parentElement) {
					const tdElm = item.parentElement.parentElement.parentElement;
					tdElm.classList.remove("np-active");
				}
			})
		}
	}

	const getClassName = (date) => {
		let dayNameOfWeek = "", className = "", ngayNghiClass = "";

		const ngayNghiLes = ngayNghis.filter(item => item.ngay === date.format(dateFormat))
		const nghiPhep = data.find(item => item.thongTinNghiPhepChiTiets && Array.isArray(item.thongTinNghiPhepChiTiets) && item.thongTinNghiPhepChiTiets.find(_item => _item.ngayNghi === date.format(dateFormat)));
		const nghiPhepChiTiet = nghiPhep && Array.isArray(nghiPhep.thongTinNghiPhepChiTiets) ? nghiPhep.thongTinNghiPhepChiTiets.find(item => item.ngayNghi === date.format(dateFormat)) : undefined;

		if (nghiPhepChiTiet && nghiPhepChiTiet.loaiBuoi && CONST_NGHI_PHEP_BUOI[`${nghiPhepChiTiet.loaiBuoi}`] && CONST_NGHI_PHEP_BUOI[`${nghiPhepChiTiet.loaiBuoi}`].label) {
			className = CONST_NGHI_PHEP_BUOI[`${nghiPhepChiTiet.loaiBuoi}`].className;
		}

		const _date = ngayDiLamTrongTuan.find(item => item.ngay === date.format(dateFormat));
		if (_date) {
			ngayNghiClass = "di-lam";
		}
		else if (ngayNghiLes.length > 0) {
			ngayNghiClass = "ngay-le";
		}
		switch (date.isoWeekday()) {
			case 1: dayNameOfWeek = "monday"; break;
			case 2: dayNameOfWeek = "tuesday"; break;
			case 3: dayNameOfWeek = "wednesday"; break;
			case 4: dayNameOfWeek = "thursday"; break;
			case 5: dayNameOfWeek = "friday"; break;
			case 6: dayNameOfWeek = "saturday"; break;
			case 7: dayNameOfWeek = "sunday"; break;
			default: break;
		}

		return `${dayNameOfWeek} ${ngayNghiClass} ${className}`;
	}

	const dateContent = (date) => {
		const nghiPhep = data.find(item => item.thongTinNghiPhepChiTiets && Array.isArray(item.thongTinNghiPhepChiTiets) && item.thongTinNghiPhepChiTiets.find(_item => _item.ngayNghi === date.format(dateFormat)));
		let result = [];
		const _date = ngayDiLamTrongTuan.find(item => item.ngay === date.format(dateFormat));
		const ngayNghiLes = ngayNghis.filter(item => item.ngay === date.format(dateFormat))
		if (_date) {
			result.push(<small className="lich-nghi lich-nghi-tuan">{_date.noiDung}</small>)
		}
		else {
			if (ngayNghiTrongTuan.indexOf(date.isoWeekday()) !== -1) {
				result.push(<small className="lich-nghi lich-nghi-tuan">Ngày nghỉ</small>)
			}
			if (ngayNghiLes.length > 0) {
				result = [];
				ngayNghiLes.map(ngayNghiLe => {
					result.push(<small className="lich-nghi lich-nghi-le">{ngayNghiLe.noiDung}</small>)
					return result;
				})
			}
		}
		const trangThai = CONST_PHE_DUYET.render(nghiPhep && nghiPhep.trangThaiDuyet)
		return <Fragment>
			{result.map(item => item)}
			{nghiPhep && <small className="lich-nghi ">{trangThai.label}</small>}
		</Fragment>
	}

	const dateFullCellRender = (date) => {
		const nghiPhep = data.find(item => item.thongTinNghiPhepChiTiets && Array.isArray(item.thongTinNghiPhepChiTiets) && item.thongTinNghiPhepChiTiets.find(_item => _item.ngayNghi === date.format(dateFormat)));
		const content = () => {
			return <div
				className={`ant-fullcalendar-date ${getClassName(date)}`}
				dot-nghi-phep-id={nghiPhep ? nghiPhep.id : ""}
				{...(nghiPhep ? {
					data: `np-${nghiPhep.id}`,
					onMouseEneter: () => onNghiPhepMouseEnter(nghiPhep),
					onMouseLave: () => onNghiPhepMouseLeave(nghiPhep),
				} : {})}
			>
				<div className="ant-fullcalendar-value">
					<span style={{ display: "inline-block", height: 24, width: 24, border: "1px solid #ccc", borderRadius: "50%", textAlign: "center" }}>
						{date.date()}
					</span>
				</div>
				<div className="ant-fullcalendar-content">
					<div id={`date-cell-${date.format("DDMMYYYY")}`}>
						{dateContent(date)}
					</div >
				</div>
			</div>
		}

		return nghiPhep ?
			<Dropdown
				trigger={["contextMenu"]}
				overlay={<Menu>
					<Menu.Item onClick={() => chiTiet.onShow(nghiPhep)}>Chi tiết</Menu.Item>
					<Menu.Divider />
					<Menu.Item
						disabled={nghiPhep.trangThaiDuyet !== CONST_PHE_DUYET.DAPHEDUYET || (nghiPhep.thongTinNghiPhepCaNhanThucTe && nghiPhep.thongTinNghiPhepCaNhanThucTe.trangThai !== CONST_PHE_DUYET.DANGHOANTHIEN)}
						onClick={() => ngayNghiThucTe.onShow(nghiPhep)}
					>
						<i className="fa fa-pencil-square-o m-r-10" />Cập nhật ngày nghỉ thực tế
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item
						disabled={nghiPhep.trangThaiDuyet === CONST_PHE_DUYET.DAPHEDUYET || nghiPhep.trangThaiDuyet === CONST_PHE_DUYET.KHONGPHEDUYET}
						onClick={() => onEdit(nghiPhep)}
					>
						<i className="fa fa-pencil-square-o m-r-10" />Chỉnh sửa
					</Menu.Item>
					<Menu.Item
						disabled={nghiPhep.trangThaiDuyet === CONST_PHE_DUYET.DAPHEDUYET || nghiPhep.trangThaiDuyet === CONST_PHE_DUYET.KHONGPHEDUYET}
						onClick={() => {
							Modal.confirm({
								title: "Bạn chắc chắn muốn xoá?",
								okText: <Fragment><i className="fa fa-check-o m-r-5" />Xác nhận</Fragment>,
								cancelText: <Fragment><i className="fa fa-times m-r-5" />Huỷ</Fragment>,
								onOk: () => onDelete(nghiPhep, (status) => {
									if (status) {
										setData(d => d.filter(item => item.id !== nghiPhep.id))
										message.success({ content: "Xoá thành công!" });
									}
									else {
										message.error({ content: "Xoá thất bại!" });
									}
								})
							})
						}}
					>
						<i className="fa fa-trash m-r-10" />Xóa
					</Menu.Item>
				</Menu>}
			>
				{content()}
			</Dropdown> :
			content()
	}

	const headerRender = ({ value, onChange }) => {
		const start = 0;
		const end = 12;
		const monthOptions = [];
		for (let i = start; i < end; i++) {
			monthOptions.push(<Menu.Item id={`month-${i}`} key={`${i}`} >Tháng {i + 1}</Menu.Item>);
		}
		const month = value.month();
		const year = value.year();
		const yearOptions = [];
		for (let i = year - 10; i < year + 10; i += 1) {
			yearOptions.push(<Menu.Item id={`year-${i}`} key={`${i}`} >Năm {i}</Menu.Item>);
		}
		const nextMonth = () => {
			let _nextMonth = parseInt(month, 10) + 1;
			let _year = year;
			if (_nextMonth === 12) {
				_nextMonth = 0;
				_year = _year + 1;
			}
			const newValue = value.clone();
			newValue.month(_nextMonth);
			newValue.year(_year);
			onChange(newValue);
		}
		const nextYear = () => {
			let _nextYear = year + 1;
			const newValue = value.clone();
			newValue.year(_nextYear);
			onChange(newValue);
		}
		const preMonth = () => {
			let _preMonth = parseInt(month, 10) - 1;
			let _year = year;
			if (_preMonth === -1) {
				_preMonth = 11;
				_year = _year - 1;
			}
			const newValue = value.clone();
			newValue.month(_preMonth);
			newValue.year(_year);
			onChange(newValue);
		}
		const preYear = () => {
			let _preYear = year - 1;
			const newValue = value.clone();
			newValue.year(_preYear);
			onChange(newValue);
		}

		return <div className="row" style={{ padding: "8px 0", margin: 0 }}>
			<div className="col-md-12">
				<div className="pull-left">
					<Button.Group className="m-r-10">
						<BtnIcon
							month={month}
							year={year}
							value={value}
							onChange={onChange}
						/>
						<Dropdown
							trigger={["click"]}
							overlay={<Menu
								selectedKeys={[`${month}`]}
								onClick={({ key }) => {
									const newValue = value.clone();
									newValue.month(parseInt(key, 10));
									onChange(newValue);
								}}
							>
								{monthOptions}
							</Menu>}
							overlayStyle={{ overflow: "auto", maxHeight: "200px" }}
						>
							<Button>
								<span>Tháng {month + 1}</span>
								<i className="fa fa-angle-down m-l-5" />
							</Button>
						</Dropdown>
						<Dropdown
							trigger={["click"]}
							overlay={<Menu
								selectedKeys={[`${year}`]}
								onClick={({ key }) => {
									const now = value.clone().year(parseInt(key, 0));
									onChange(now);
								}}
							>
								{yearOptions}
							</Menu>}
							overlayStyle={{ overflow: "auto", maxHeight: "200px" }}
						>
							<Button>
								<span>Năm {year}</span>
								<i className="fa fa-angle-down m-l-5" />
							</Button>
						</Dropdown>
					</Button.Group>
				</div>
				<div className="pull-right">
					<Button.Group>
						<Tooltip title="Năm trước"><Button onClick={preYear}><i className="fa fa-angle-double-left" /></Button></Tooltip>
						<Tooltip title="Tháng trước"><Button onClick={preMonth}><i className="fa fa-angle-left" /></Button></Tooltip>
						<Tooltip title="Tháng sau"><Button onClick={nextMonth}><i className="fa fa-angle-right" /></Button></Tooltip>
						<Tooltip title="Năm sau"><Button onClick={nextYear}><i className="fa fa-angle-double-right" /></Button></Tooltip>
					</Button.Group>
				</div>
			</div>
		</div>
	}

	return <Fragment>
		<DrawerChiTiet
			visible={chiTiet.visible}
			onClose={chiTiet.onClose}
			nghiPhep={chiTiet.nghiPhep}
		/>
		<Modal
			title="Cập nhật ngày nghỉ thực tế"
			visible={ngayNghiThucTe.visible}
			onCancel={ngayNghiThucTe.onCancel}
			destroyOnClose
			footer={[
				<Button type="success" onClick={() => ngayNghiThucTe.onSave(ngayNghiThucTe, CONST_PHE_DUYET.CHOPHEDUYET)}><i className="fa fa-reply m-r-5" />Lưu và trình phê duyệt</Button>,
				<Button type="primary" onClick={() => ngayNghiThucTe.onSave(ngayNghiThucTe, CONST_PHE_DUYET.DANGHOANTHIEN)}><i className="fa fa-save m-r-5" />Lưu</Button>,
				<Button onClick={ngayNghiThucTe.onCancel}><i className="fa fa-times m-r-5" />Huỷ</Button>,
			]}
		>
			<Form>
				<Form.Item label="Số ngày nghỉ">

					<InputNumber
						style={{ width: "100%" }}
						step={0.5}
						value={ngayNghiThucTe.soNgayNghiThucTe}
						onChange={(v) => ngayNghiThucTe.onChange(v || 0)}
						max={countNgayNghi((ngayNghiThucTe.nghiPhep && ngayNghiThucTe.nghiPhep.thongTinNghiPhepChiTiets) || [])}
						min={0}
						placeholder="Vui lòng nhập số ngày nghỉ thực tế"
					/>
				</Form.Item>
			</Form>
		</Modal>
		{
			isVisiableForm && <CaNhanNghiPhepForm
				loadData={loadData}
				data={data}
				itemUpdate={itemUpdate}
				renderActionThemMoi={renderActionThemMoi}
				setData={setData}
				ngayNghiTrongTuan={ngayNghiTrongTuan}
				ngayDiLamTrongTuan={ngayDiLamTrongTuan}
				ngayLes={ngayLes}
				getNgayNghiLeTrongNam={getNgayNghiLeTrongNam}
			/>
		}
		{
			isVisiableList && <Calendar
				dateFullCellRender={dateFullCellRender}
				onPanelChange={(date) => {
					setYear(moment(date).year());
					setMonth(moment(date).month())
				}}
				headerRender={headerRender}
				disabledDate={date => date.month() !== month}
			/>
		}
	</Fragment >
}

const BtnIcon = ({
	month,
	year,
	value,
	onChange
}) => {
	const [open, setOpen] = useState(false);
	return <Fragment>
		<DatePicker
			dropdownClassName="nghi-phep-dropdown-datepicker"
			value={moment(`${month < 10 ? `0${month + 1}` : month + 1}/${year}`, monthFormat)}
			open={open}
			onOpenChange={open => setOpen(open)}
			mode="month"
			getCalendarContainer={() => document.body}
			style={{ width: 0, height: 0, opacity: 0 }}
			format={monthFormat}
			onPanelChange={(date) => {
				const _month = date.month();
				const _year = date.year();
				const newValue = value.clone();
				newValue.month(_month);
				newValue.year(_year);
				onChange(newValue);
				setOpen(false);
			}}
		/>
		<Button onClick={() => setOpen(true)}>
			<i className="fa fa-calendar" />
		</Button>
	</Fragment>
}

export default CaNhanNghiPhep;