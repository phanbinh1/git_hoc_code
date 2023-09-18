import React, { Fragment, useEffect } from "react";
import { Button, Input, Col, Form, Row, Select } from "antd";
import * as constants from "./../../../../constants/constants";
import { CommonFieldset } from "../../../common";
import { useSelector } from "react-redux";

const Search = ({
    getAccounts,

    pagination,
    setPagination,

    fullName, setFullName,
    email, setEmail,
    phongBan, setPhongBan,

    loading, setLoading,

    phongBans
}) => {

    const phongBanOptions = useSelector(state => state.core.account.phong_bans);

    const onSearch = () => {
        if (!loading) {
            setLoading(true);
            getAccounts({
                data: {
                    pageSize: pagination && pagination.pageSize ? pagination.pageSize : constants.CONST_PAGINATION.pageSize,
                    currentPage: 1,
                    ...(fullName && fullName.trim() !== "" ? { fullNameSearch: fullName } : {}),
                    ...(email && email.trim() !== "" ? { emailSearch: email } : {}),
                    ...(phongBan && phongBan.length > 0 ? { departments: phongBan } : phongBans ? { departments: "" } : {}),
                },
                requestSuccess: (res) => {
                    setPagination(res.pagination);
                    setLoading(false);
                },
                requestError: () => setLoading(false)
            });
        }
    }

    useEffect(() => {
        onSearch();
    }, [phongBan])

    return <Fragment>
        <div className="form-group">
            <CommonFieldset title={<Fragment><i className="fa fa-search m-r-10" />Tìm kiếm</Fragment>}>
                <div className="row">
                    <div className="col-md-12">
                        <Form layout="inline">
                            <Row>
                                <Col span={8} key="full-name">
                                    <Form.Item label="Họ và tên">
                                        <Input
                                            placeholder="Họ và tên"
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)}
                                            onKeyDown={e => {
                                                e.keyCode === 13 && onSearch()
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6} key="email">
                                    <Form.Item label="Email">
                                        <Input
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            onKeyDown={e => {
                                                e.keyCode === 13 && onSearch()
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10} key="email">
                                    <Form.Item label="Phòng ban">
                                        <Select
                                            value={phongBan}
                                            onChange={(value) => setPhongBan(value)}
                                            placeholder="Phòng ban"
                                            allowClear
                                            mode={phongBans ? "multiple" : "default"}
                                            showSearch
                                        >
                                            {phongBanOptions.filter(pb => !phongBans || phongBans.findIndex(_pb => _pb === pb.ma) > -1).map((item, i) => {
                                                return <Select.Option value={item.ma} key={i}>{item.ten}</Select.Option>
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="t-right" style={{ padding: "0 14px", marginTop: 10 }}>
                                    <Button type="primary" style={{ marginTop: 3 }} onClick={onSearch} loading={loading}>
                                        {loading ? "Đang tìm ..." : <Fragment><i className="fa fa-search m-r-5" />Tìm kiếm</Fragment>}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </CommonFieldset>
        </div>
    </Fragment>
}

export default Search;