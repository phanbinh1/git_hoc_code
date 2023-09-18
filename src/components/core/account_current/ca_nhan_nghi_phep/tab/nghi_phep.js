import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../../common";
import * as validate from "./../../../../../constants/validate"
import { dateFormat } from "./../../../../../constants/controll";
import { formValueSelector, change } from 'redux-form';
import * as formName from "./../../../../../constants/form_name";
import * as apiUrl from "./../../../../../constants/api";
import * as message from "./../../../../../constants/message";
import * as api from "./../../../../../util/api_call";
import * as constants from "./../../../../../constants/constants";
import moment from 'moment';

const { CONST_PHONG_BAN, CONST_CHUC_VU } = constants;
const { THANHTRA, NGHIEPVU, DOI1, DOI2, VANPHONG, ADMIN, LANHDAO } = CONST_PHONG_BAN;
const { TRUONGBAN, TRUONGPHONG, CHANHVANPHONG, DOITRUONG, } = CONST_CHUC_VU;

const NghiPhep = ({ renderActionThemMoi, setData, itemUpdate }) => {
	const account_current = useSelector(state => state.core.account_current);
	const accounts = useSelector(state => state.core.account.profiles)

	const nguoiTiepNhan = () => {

		const { regency, managementDepartment } = account_current;

		switch (managementDepartment) {
			case NGHIEPVU:
			case THANHTRA:
				return regency === TRUONGPHONG ? {
					chucVu: TRUONGBAN,
					phongBan: LANHDAO
				} : {
						chucVu: TRUONGPHONG,
						phongBan: managementDepartment
					}
			case DOI1:
			case DOI2:
				return regency === DOITRUONG ? {
					chucVu: TRUONGBAN,
					phongBan: LANHDAO
				} : {
						chucVu: DOITRUONG,
						phongBan: managementDepartment
					}
			case VANPHONG:
				return regency === CHANHVANPHONG ? {
					chucVu: TRUONGBAN,
					phongBan: LANHDAO
				} : {
						chucVu: CHANHVANPHONG,
						phongBan: VANPHONG
					}
			case ADMIN:
				return regency === ADMIN ? {
					chucVu: TRUONGBAN,
					phongBan: LANHDAO
				} : {
						chucVu: ADMIN,
						phongBan: CONST_CHUC_VU.ADMIN
					}
			default:
				return {
					chucVu: TRUONGBAN,
					phongBan: LANHDAO
				}
		}
	}

	const handleSubmit = async (data) => {
		if (data.hasOwnProperty("id")) {
			const res = await api.put({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data });
			if (res && res.status) {
				res.msg && message.success({ content: res.msg });
			}
			else {
				res.msg && message.error({ content: res.msg });
			}
		}
		else {
			const res = await api.post({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data });
			if (res && res.status) {
				res.msg && message.success({ content: res.msg });
				setData(data => [...data, res.result]);
				renderActionThemMoi()
			}
			else {
				res.msg && message.error({ content: res.msg });
			}
		}
	};

	const dispatch = useDispatch();

	const tuNgay = useSelector(state => formValueSelector(formName.FORM_NAME_THONG_TIN_NGHI_PHEP)(state, "tuNgay"));
	const denNgay = useSelector(state => formValueSelector(formName.FORM_NAME_THONG_TIN_NGHI_PHEP)(state, "denNgay"));

	useEffect(() => {
		if (tuNgay && denNgay) {
			const _tuNgay = moment(tuNgay, dateFormat)
			const _denNgay = moment(denNgay, dateFormat)
			dispatch(change(formName.FORM_NAME_THONG_TIN_NGHI_PHEP, "soNgayNghi", (_denNgay.diff(_tuNgay, "days") + 1)))
		} else {
			dispatch(change(formName.FORM_NAME_THONG_TIN_NGHI_PHEP, "soNgayNghi", 0))
		}
	}, [tuNgay, denNgay]);
	useEffect(() => {
		if (tuNgay) {
			dispatch(change(formName.FORM_NAME_THONG_TIN_NGHI_PHEP, "nam", moment(tuNgay, dateFormat).year()));
		}
	}, [tuNgay]);

	return <Fragment>
		<CommonForm
			key="f-c-1"
			data={[
				[//row 1
					{
						col: 2,
						label: "Năm",
						placeholder: "Năm",
						name: "nam",
						fieldType: "year",
						disabled: true,
					},
					{
						col: 2,
						label: "Từ ngày",
						placeholder: "Từ ngày",
						fieldType: "date",
						name: "tuNgay",
						checkValid: true,
						maxDate: denNgay,
						// disabledDate: (date) => cauHinh.indexOf(date.isoWeekday()) !== -1,
						validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_TU_NGAY_REQUIRED]
					},
					{
						col: 2,
						label: "Đến ngày",
						placeholder: "Đến ngày",
						fieldType: "date",
						name: "denNgay",
						checkValid: true,
						minDate: tuNgay,
						// disabledDate: (date) => cauHinh.indexOf(date.isoWeekday()) !== -1,
						validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_DEN_NGAY_REQUIRED]
					},
					{
						col: 2,
						label: "Số ngày nghỉ",
						placeholder: "Số ngày nghỉ",
						fieldType: "number",
						name: "soNgayNghi",
						checkValid: true,
						validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_SO_NGAY_NGHI_REQUIRED]
					},
					{
						col: 4,
						label: "Người tiếp nhận",
						placeholder: "Người tiếp nhận",
						fieldType: "select",
						name: "nguoiTiepNhan",
						checkValid: true,
						validates: [validate.VALIDATE_QLTTNP_NGUOI_TIEP_NHAN_REQUIRED],
						options: accounts.filter(acc => acc.managementDepartment === nguoiTiepNhan().phongBan && acc.regency === nguoiTiepNhan().chucVu).map(acc => ({ value: acc.name, label: acc.fullName })),
					},
				],
				[//row 2
					{
						col: 12,
						label: "Lý do",
						placeholder: "Lý do",
						name: "lyDo",
						fieldType: "textarea",
						checkValid: true,
						validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_LY_DO_REQUIRED]
					},
				]
			]}
			onSubmit={handleSubmit}
			form={formName.FORM_NAME_THONG_TIN_NGHI_PHEP}
			initialValues={{
				trangThaiDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET,
				nhanSu: { userName: account_current.name },
				tuNgay: moment().format(dateFormat),
				nam: moment().year(),
				...itemUpdate
			}}
		/>
	</Fragment>
}

export default NghiPhep;