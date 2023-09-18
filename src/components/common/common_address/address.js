import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, isPristine, getFormInitialValues, formValueSelector } from 'redux-form';
import { CommonFormContent } from "./../common_form";
import {
	VALIDATE_ADDRESS_TINHTHANH_REQUIRED,
	VALIDATE_ADDRESS_QUANHUYEN_REQUIRED,
	VALIDATE_ADDRESS_XAPHUONG_REQUIRED,
	VALIDATE_ADDRESS_DIACHI_REQUIRED
} from "./../../../constants/validate";
import { get } from "./../../../util/api_call";
import { API_LOCALITY_GET_CHILDREN } from '../../../constants/api';
import { CONST_DIA_BAN_LABEL } from '../../../constants/constants';

const getDiaBan = async (parentCode) => {
	const res = await get({ url: API_LOCALITY_GET_CHILDREN(parentCode) });
	return res && res.status && Array.isArray(res.result) ? res.result : [];
}

const getValue = (data, name) => {
	const _nameArr = name ? `${name}`.split(".") : [];
	let result = data;
	let err = false;
	for (let i = 0; i < _nameArr.length; i++) {
		if (result && result[_nameArr[i]]) {
			result = result[_nameArr[i]];
		}
		else {
			err = i === _nameArr.length ? false : true;
			break;
		}
	}
	return err ? null : result;
}

const _tinhThanhDefault = { name: "_tinhThanhPho", label: CONST_DIA_BAN_LABEL[0], placeholder: CONST_DIA_BAN_LABEL[0], hidden: false, validate: true };
const _quanHuyenDefault = { name: "_quanHuyen", label: CONST_DIA_BAN_LABEL[1], placeholder: CONST_DIA_BAN_LABEL[1], hidden: false, validate: true };
const _xaPhuongDefault = { name: "_xaPhuong", label: CONST_DIA_BAN_LABEL[2], placeholder: CONST_DIA_BAN_LABEL[2], hidden: false, validate: true }
const _diaChiDefault = { name: "_diaChi", label: "Địa chỉ", placeholder: "Địa chỉ", hidden: false, validate: true }

const CommonAddress = ({
	form,
	tinhThanh,
	quanHuyen,
	xaPhuong,
	diaChi,
	mode = "inline",
	disabled,
	readOnly,
	dataInit,
	getPopupContainer
}) => {

	const dispatch = useDispatch();

	const [loading, setLoading] = useState(0);

	const [_tinhThanh, setTinhThanh] = useState(null);
	const [tinhThanhs, setTinhThanhs] = useState([]);
	const [_quanHuyen, setQuanHuyen] = useState(null);
	const [quanHuyens, setQuanHuyens] = useState([]);
	const [_xaPhuong, setXaPhuong] = useState(null);
	const [xaPhuongs, setXaPhuongs] = useState([]);
	const [_diaChi, setDiaChi] = useState(null);

	const [col, setCol] = useState(12);

	const state = useSelector(state => state);
	const pristine = isPristine(form)(state);
	const initialValue = getFormInitialValues(form)(state);

	const tinhThanhValue = _tinhThanh ? formValueSelector(form)(state, _tinhThanh.name) : null;
	const quanHuyenValue = _quanHuyen ? formValueSelector(form)(state, _quanHuyen.name) : null;
	const xaPhuongValue = _quanHuyen ? formValueSelector(form)(state, _quanHuyen.name) : null;

	const getTinhThanh = async () => {
		setLoading(loading => loading + 1);
		const tinhThanhs = await getDiaBan("0")
		setTinhThanhs(tinhThanhs);
		setLoading(loading => loading - 1);
	}

	const getQuanHuyen = async (maTinhThanh) => {
		setLoading(loading => loading + 1);
		const quanHuyens = maTinhThanh ? await getDiaBan(maTinhThanh) : [];
		setQuanHuyens(quanHuyens);
		setLoading(loading => loading - 1);
	}
	const getXaPhuong = async (maQuanHuyen) => {
		setLoading(loading => loading + 1);
		const xaPhuongs = maQuanHuyen ? await getDiaBan(maQuanHuyen) : [];
		setXaPhuongs(xaPhuongs);
		setLoading(loading => loading - 1);
	}

	useEffect(() => {
		tinhThanh && setTinhThanh(tinhThanh === true ? _tinhThanhDefault : { ..._tinhThanhDefault, ...tinhThanh });
		quanHuyen && setQuanHuyen(quanHuyen === true ? _quanHuyenDefault : { ..._quanHuyenDefault, ...quanHuyen });
		xaPhuong && setXaPhuong(xaPhuong === true ? _xaPhuongDefault : { ..._xaPhuongDefault, ...xaPhuong });
		diaChi && setDiaChi(diaChi === true ? _diaChiDefault : { ..._diaChiDefault, ...diaChi });

		getTinhThanh();
	}, []);

	useEffect(() => {
		if (pristine) {
			const tinhThanhInitValue = _tinhThanh && _tinhThanh.name && (typeof _tinhThanh.name == "string" || typeof _tinhThanh.name == "number") ? getValue(initialValue, _tinhThanh.name) : null;
			const quanHuyenInitValue = _quanHuyen && _quanHuyen.name && (typeof _quanHuyen.name == "string" || typeof _quanHuyen.name == "number") ? getValue(initialValue, _quanHuyen.name) : null;
			getQuanHuyen(tinhThanhInitValue);
			getXaPhuong(quanHuyenInitValue);
		}
	}, [pristine, _tinhThanh, _quanHuyen, initialValue])

	useEffect(() => {
		if (dataInit) {
			const tinhThanhInitValue = _tinhThanh && _tinhThanh.name && (typeof _tinhThanh.name == "string" || typeof _tinhThanh.name == "number") ? getValue(dataInit, _tinhThanh.name) : null;
			const quanHuyenInitValue = _quanHuyen && _quanHuyen.name && (typeof _quanHuyen.name == "string" || typeof _quanHuyen.name == "number") ? getValue(dataInit, _quanHuyen.name) : null;
			getQuanHuyen(tinhThanhInitValue);
			getXaPhuong(quanHuyenInitValue);
		}
	}, [_tinhThanh, _quanHuyen, dataInit])

	const onChangeTinhThanh = async (ma, option) => {
		_tinhThanh && typeof _tinhThanh.onChange === "function" && _tinhThanh.onChange(ma, option);
		const quanHuyens = ma ? await getDiaBan(ma) : [];
		setQuanHuyens(quanHuyens);
		setXaPhuongs([]);
		dispatch(change(form, quanHuyen.name, null));
		dispatch(change(form, xaPhuong.name, null));
	}

	const onChangeQuanHuyen = async (ma, option) => {
		_quanHuyen && typeof _quanHuyen.onChange === "function" && _quanHuyen.onChange(ma, option);
		if (ma) {
			let result = [];
			if (Array.isArray(ma)) {
				ma.map(async _ma => {
					const quanHuyen = quanHuyens.find(qh => qh.ma === _ma);
					if (quanHuyen) {
						const _result = await getDiaBan(_ma);
						result = [
							...result,
							{ ...quanHuyen, disabled: true },
							..._result
						];
						setXaPhuongs(result);
					}
					return null;
				})
			}
			else {
				result = await getDiaBan(ma);
				setXaPhuongs(result);
			}
		}
		else {
			setXaPhuongs([]);
		}
		dispatch(change(form, xaPhuong.name, null));
	}
	const onChangeXaPhuong = async (ma, option) => {
		_xaPhuong && typeof _xaPhuong.onChange === "function" && _xaPhuong.onChange(ma, option);
	}

	useEffect(() => {
		let _col = 4;
		if (mode !== "block") {
			if (!_tinhThanh || _tinhThanh.hidden) { _col--; }
			if (!_quanHuyen || _quanHuyen.hidden) { _col--; }
			if (!_xaPhuong || _xaPhuong.hidden) { _col--; }
			if (!_diaChi || _diaChi.hidden) { _col--; }
		}
		else {
			_col = 1;
		}
		setCol(_col === 0 ? 0 : 12 / _col);
	}, [mode, _tinhThanh, _quanHuyen, _xaPhuong])

	return (
		<React.Fragment >
			<CommonFormContent
				data={[
					[
						...(
							_tinhThanh && !_tinhThanh.hidden ? [
								{
									col,
									name: _tinhThanh.name,
									fieldType: "select",
									options: tinhThanhs.map(item => ({ ...item, value: item.ma, label: item.ten })),
									label: _tinhThanh.label,
									placeholder: _tinhThanh.placeholder,
									changeCallback: loading === 0 ? onChangeTinhThanh : null,
									validates: _tinhThanh.validate && tinhThanhs.length > 0 ? [VALIDATE_ADDRESS_TINHTHANH_REQUIRED] : [],
									checkValid: _tinhThanh.validate && tinhThanhs.length > 0,
									disabled,
									readOnly,
									getPopupContainer,
									mode: _tinhThanh.mode || "default"
								}
							] : []
						),
						...(
							_quanHuyen && !_quanHuyen.hidden ? [
								{
									col,
									name: _quanHuyen.name,
									fieldType: "select",
									options: quanHuyens
										.map(item => ({ ...item, value: item.ma, label: item.ten }))
										.filter(item => {
											if (_quanHuyen.optionShows && Array.isArray(_quanHuyen.optionShows)) {
												return _quanHuyen.optionShows.findIndex(qh => qh.ma === item.ma) >= 0;
											}
											return true;
										}),
									label: _quanHuyen.label,
									placeholder: _quanHuyen.placeholder,
									changeCallback: loading === 0 ? onChangeQuanHuyen : null,
									validates: _quanHuyen.validate && quanHuyens.length > 0 && tinhThanhValue ? [VALIDATE_ADDRESS_QUANHUYEN_REQUIRED] : [],
									checkValid: _quanHuyen.validate && quanHuyens.length > 0 && tinhThanhValue ? true : false,
									disabled: disabled || !tinhThanhValue ? true : false,
									readOnly,
									getPopupContainer,
									mode: _quanHuyen.mode || "default"
								}
							] : []
						),
						...(
							_xaPhuong && !_xaPhuong.hidden ? [
								{
									col,
									name: _xaPhuong.name,
									fieldType: "select",
									options: xaPhuongs.map(item => ({ ...item, value: item.ma, label: item.ten })),
									label: _xaPhuong.label,
									placeholder: _xaPhuong.placeholder,
									changeCallback: loading === 0 ? onChangeXaPhuong : null,
									validates: _xaPhuong.validate && xaPhuongs.length > 0 && quanHuyenValue ? [VALIDATE_ADDRESS_XAPHUONG_REQUIRED] : [],
									checkValid: _xaPhuong.validate && xaPhuongs.length > 0 && quanHuyenValue ? true : false,
									disabled: disabled || !quanHuyenValue ? true : false,
									getPopupContainer,
									readOnly
								}
							] : []
						),
						...(
							_diaChi && !_diaChi.hidden ? [
								{
									col,
									name: _diaChi.name,
									fieldType: "textarea",
									label: _diaChi.label,
									placeholder: _diaChi.placeholder,
									validates: _diaChi.validate ? [VALIDATE_ADDRESS_DIACHI_REQUIRED] : [],
									checkValid: _diaChi.validate,
									disabled,
									readOnly,
									autoSize: true
								}
							] : []
						)
					]
				]}
			/>
		</React.Fragment >
	);
}

export default CommonAddress;