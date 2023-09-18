import React, { Fragment } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { getItemSelected } from "../../../../../constants/main";

const DropdownOverlay = ({ pageKey }) => {

    const rows_selected = useSelector(state => state.core.rows_selected);
    const coSoSelected = getItemSelected(rows_selected, pageKey);

    return <Menu mode="vertical">
        <Menu.Item disabled={coSoSelected.length === 0}><i className="fa fa-plus m-r-5" />Tạo mới</Menu.Item>
        <Menu.SubMenu disabled={coSoSelected.length === 0} title={<Fragment><i className="fa fa-pencil-square-o m-r-5" />Thêm vào danh sách đã có</Fragment>}>
            <Menu.Item>Danh sách  1</Menu.Item>
            <Menu.Item>Cộng hòa xã hội chủ nghĩa việt nam</Menu.Item>
            <Menu.Item>Tieu đề 1</Menu.Item>
            <Menu.Item>Tieu đề 2</Menu.Item>
            <Menu.Item>Tieu đề 1</Menu.Item>
            <Menu.Item>Tieu đề 2</Menu.Item>
            <Menu.Item>Tieu đề 1</Menu.Item>
            <Menu.Item>Tieu đề 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item><i className="fa fa-file-text-o m-r-5" />Danh sách</Menu.Item>
    </Menu >
}

export default DropdownOverlay;