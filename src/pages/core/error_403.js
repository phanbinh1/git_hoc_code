import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as act from "./../../actions/index";
import * as url from "./../../constants/url";
import { CONST_TITLE } from '../../constants/constants';

const PageError403 = () => {

    const dispatch = useDispatch();

    const cancelLoading = () => {
        dispatch(act.endLoading());
    }

    useEffect(() => {
        cancelLoading();
        const title = "403 Access denied";

        const notifiCountStr = document.body.getAttribute("_notifi_count");
        const notifiCount = notifiCountStr ? parseInt(notifiCountStr, 0) : 0;
        document.title = `${notifiCount > 0 ? `(${notifiCount})` : ''} ${CONST_TITLE} ${title}`;
        document.body.setAttribute("_title", CONST_TITLE + title);

    }, []);

    return <div id="notfound" className="page-403">
        <div className="notfound">
            <div className="notfound-404"></div>
            <h1>403</h1>
            <h2>Trang không thể truy cập!</h2>
            <p>Xin lỗi trang bạn đang tìm kiếm cần yêu cầu quyền để truy cập.</p>
            <p>Vui lòng liên hệ với quản trị viên.</p>
            <Link to={url.URL_HOME}>Trang chủ</Link>
        </div>
    </div>
}

export default PageError403;