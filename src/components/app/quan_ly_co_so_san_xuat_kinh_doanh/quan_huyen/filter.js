
import React, { Fragment, useState, useEffect } from 'react';
import { CommonFilter } from "./../../../common";
import { CONST_DEFAULT_TINHTHANH } from '../../../../constants/constants';
import { get } from '../../../../util/api_call';
import { API_LOCALITY_GET_CHILDREN } from '../../../../constants/api';
import { Button } from 'antd';
const ListFilter = ({
    quanHuyenSelected,
    onChange
}) => {
    const [quanHuyens, setQuanHuyens] = useState([]);
    useEffect(() => {
        get({ url: API_LOCALITY_GET_CHILDREN(CONST_DEFAULT_TINHTHANH.ma) })
            .then(res => res && res.status && setQuanHuyens(res.result));
    }, [])
    return <Fragment>
        <CommonFilter
            menus={[
                // { label: "Quận huyện", key: "ALL", iconCls: "fa-reply-all" },
                ...quanHuyens.map(item => ({ key: `${item.ma}`, label: item.ten, ...item }))
            ]}
            selectedKeys={quanHuyenSelected ? [`${quanHuyenSelected}`] : []}
            onSelect={(key, item) => {
                onChange && onChange(key)
            }}
        >
            <Button className="m-l-5">
                <i className="fa fa-sliders m-r-10" />
                <span>
                    {
                        quanHuyenSelected && quanHuyens.findIndex(item => `${item.ma}` === quanHuyenSelected) >= 0 ?
                            quanHuyens.find(item => item.ma === quanHuyenSelected).ten
                            : "Chọn quận huyện"
                    }
                </span>
                <i className="fa fa-angle-down m-l-10" />
            </Button>
        </CommonFilter>
    </Fragment>
}
export default ListFilter;