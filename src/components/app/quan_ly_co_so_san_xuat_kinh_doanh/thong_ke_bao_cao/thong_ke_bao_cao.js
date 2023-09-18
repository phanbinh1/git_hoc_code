import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from "antd";
import SoLieuTongHop from "./so_lieu_tong_hop";
import ListCoSo from "./list_co_so";
import Form from "./form";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";

const ThongKeBaoCao = ({ ...props }) => {

    const {
        isVisiableList,
    } = props;

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    };

    // componentDidUpdate
    useEffect(() => {
        onSetAction();
    }, [isVisiableList])

    const onSetAction = () => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        setAction(arrAction);
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.hidden = true;
        return result;
    }

    return (
        <React.Fragment>
            {isVisiableList &&
                <div>
                    <div style={{ marginTop: 20 }}><Form {...props} /></div>
                    <Divider orientation="left">Số liệu tổng hợp</Divider>
                    <div style={{ margin: "0 15px" }}><SoLieuTongHop {...props} /></div>
                    <Divider orientation="left">Danh sách cơ sở</Divider>
                    <div><ListCoSo {...props} /></div>
                </div>
            }
        </React.Fragment>
    );
}

export default ThongKeBaoCao;