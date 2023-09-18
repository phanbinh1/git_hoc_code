import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
	DashboardCoSoSanXuat,
	DashboardPhongThanhTra,
	DashboardPhongNghiepVu,
	DashboardNghiepVuVanPhong,
	DashboardNghiepVuChung,
	DashboardThongBaoCongBoSanPham
} from "./dashboard/index";
import * as actID from "./../../../constants/action_id";
import * as main from "./../../../constants/main";
import { useLocation } from "react-router";

const Dashboard = () => {
	const location = useLocation();
	const permission_priviliged = useSelector(state => main.getPriviligeds(state.core.permission.menu, location.pathname));

	const content = () => {
		let result = [], row1 = [], row2 = [];
		if (permission_priviliged.find(p => p.idChucNang === actID.ACT_ID_HOME.ACT_PTT)) {
			result.push(<DashboardPhongThanhTra key={actID.ACT_ID_HOME.ACT_PTT} />);
		}
		if (permission_priviliged.find(p => p.idChucNang === actID.ACT_ID_HOME.ACT_PNV)) {
			result.push(<DashboardPhongNghiepVu key={actID.ACT_ID_HOME.ACT_PNV} />);
		}
		if (permission_priviliged.find(p => p.idChucNang === actID.ACT_ID_HOME.ACT_NVVP)) {
			result.push(<DashboardNghiepVuVanPhong key={actID.ACT_ID_HOME.ACT_NVVP} />);
		}
		if (permission_priviliged.find(p => p.idChucNang === actID.ACT_ID_HOME.ACT_CSSX)) {
			result.push(<DashboardCoSoSanXuat key={actID.ACT_ID_HOME.ACT_CSSX} />);
		}
		if (permission_priviliged.find(p => p.idChucNang === actID.ACT_ID_HOME.ACT_NVC)) {
			result.push(<DashboardNghiepVuChung key={actID.ACT_ID_HOME.ACT_NVC} />);
		}
		if (permission_priviliged.find(p => p.idChucNang === actID.ACT_ID_HOME.ACT_TBCBSP)) {
			result.push(<DashboardThongBaoCongBoSanPham key={actID.ACT_ID_HOME.ACT_TBCBSP} />);
		}

		if (result.length <= 3) {
			return [result];
		}
		else if (result.length === 4) {
			row1 = [...result];
			row2 = [...result];
			return [
				row1.splice(0, 2),
				row2.splice(2, 2)
			]
		}
		else {
			row1 = [...result];
			row2 = [...result];
			return [
				row1.splice(0, 3),
				row2.splice(3, 3)
			]
		}
	}

	return <Fragment>
		<div className="dashboard-wrapper">
			{content().map((item, i) => <Fragment key={i}>{item.map(_item => _item)}<br /></Fragment>)}
		</div>
	</Fragment>
}

export default Dashboard;