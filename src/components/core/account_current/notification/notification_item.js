import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { List, Avatar, Dropdown, Menu, Tooltip, Divider } from "antd";
import * as main from "./../../../../constants/main";
import { seenNotifi, deleteNotifi, convertMaThongBao, formatNotifiLink } from "./";
import { URL_ACCOUNT_PROFILE } from "./../../../../constants/url"
import { Markup } from "interweave";
import { Link } from "react-router-dom";
import { dateTimeFormat } from "../../../../constants/controll";

const NotificationItem = ({ item, rightAction }) => {
    const dispatch = useDispatch();

    const seenNotification = ({ ids = [], daXem = 1 }) => dispatch(seenNotifi({ ids, daXem }))
    const deleteNotification = ({ ids = [] }) => dispatch(deleteNotifi({ ids }))

    const [thongBao, setThongBao] = useState({
        title: undefined,
        link: "",
        content: "",
        description: "",
        smallIcon: null,
        nguoiGui: {},
        ngayTao: null
    })

    useEffect(() => {
        const thongBao = convertMaThongBao(item.thongBao);
        setThongBao(thongBao);
    }, [item]);

    if (item.type === "line") {
        return <Divider orientation="left" className="m-b-0">{item.title}</Divider>
    }
    else {
        return <List.Item>
            <List.Item.Meta
                className={`notification c-pointer ${item.daNhan ? "notification-received" : ""} ${item.daXem ? "notification-seen" : ""}`}
                avatar={<div style={{ position: "relative" }}>
                    {
                        thongBao.nguoiGui.name ? <Link to={`${URL_ACCOUNT_PROFILE}?account=${thongBao.nguoiGui.name}`}>
                            <Avatar src={thongBao.nguoiGui.avatar} size={50} >{thongBao.nguoiGui.iconClass ? <i className={thongBao.nguoiGui.iconClass} /> : <b>{`${thongBao.nguoiGui.fullName || ""}`.substring(0, 1).toUpperCase()}</b>}</Avatar>
                        </Link> :
                            <Avatar src={thongBao.nguoiGui.avatar} size={50} >{thongBao.nguoiGui.iconClass ? <i className={thongBao.nguoiGui.iconClass} /> : <b>{`${thongBao.nguoiGui.fullName || ""}`.substring(0, 1).toUpperCase()}</b>}</Avatar>
                    }
                    {thongBao.smallIcon && <i className={thongBao.smallIcon} style={{
                        position: "absolute",
                        bottom: "-5px",
                        right: "-5px",
                        borderRadius: "50%",
                        padding: "5px",
                        fontSize: "10px",
                        height: 20,
                        width: 20,
                        textAlign: "center"
                    }} />}
                </div>}
                title={<React.Fragment>
                    <span className="tag-a" onClick={() => {
                        !item.daXem && seenNotification({ ids: [item.id], daXem: 1 })
                    }}>
                        {thongBao.link && thongBao.link !== "#" ? <Link to={formatNotifiLink(thongBao.link)}>{thongBao.title}</Link> : <span className="link">{thongBao.title}</span>}
                    </span>
                    {rightAction !== false &&
                        <div style={{
                            position: "absolute",
                            top: "5px",
                            right: "15px",
                            width: "25px",
                            textAlign: "center"
                        }} className="notifi-action-extend">
                            <div>
                                <small>
                                    <Tooltip title={item.daXem ? "Đánh dấu chưa xem" : "Đánh dấu đã xem"} style={{ zIndex: 100000 }}>
                                        <i className="fa fa-circle-o c-pointer" onClick={() => seenNotification({ ids: [item.id], daXem: item.daXem ? 0 : 1 })} />
                                    </Tooltip>
                                </small>
                            </div>
                            <div>
                                <Dropdown
                                    overlay={<Menu>
                                        <Menu.Item key="1" className="lb-error" onClick={() => deleteNotification({ ids: [item.id] })}>
                                            <i className="fa fa-trash m-r-10" />Xóa
                                        </Menu.Item>
                                        <Menu.Item key="2" className="lb-primary" onClick={() => seenNotification({ ids: [item.id], daXem: item.daXem ? 0 : 1 })}>
                                            <i className={`fa fa-eye${item.daXem ? "-slash" : ""} m-r-10`} />{item.daXem ? "Chưa xem" : "Đã xem"}
                                        </Menu.Item>
                                    </Menu>}
                                    trigger={['contextMenu', "click"]}
                                    overlayStyle={{ zIndex: 100000 }}
                                >
                                    <i className="fa fa-ellipsis-h c-pointer" />
                                </Dropdown>
                            </div>
                        </div>
                    }
                </React.Fragment>}
                description={<React.Fragment>
                    <div className="notifi-content">
                        {React.isValidElement(thongBao.content) ? thongBao.content : <Markup content={thongBao.content} />}
                    </div>
                    <p className="notifi-description">
                        {React.isValidElement(thongBao.description) ? thongBao.description : <Markup content={thongBao.description} />}
                    </p>
                    <div className={`notifi-time`}>
                        <i className="fa fa-clock-o m-r-5" />
                        {main.formartTimeUnits(thongBao.ngayTao, dateTimeFormat).label}
                    </div>
                </React.Fragment>}
            />
        </List.Item>
    }
}

export default NotificationItem;