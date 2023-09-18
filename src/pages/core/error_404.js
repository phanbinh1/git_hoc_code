import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import * as url from "./../../constants/url";
import { CONST_TITLE } from '../../constants/constants';

const PageError404 = ({ children }) => {

    useEffect(() => {
        const title = "404 Not found";
        const notifiCountStr = document.body.getAttribute("_notifi_count");
        const notifiCount = notifiCountStr ? parseInt(notifiCountStr, 0) : 0;
        document.title = `${notifiCount > 0 ? `(${notifiCount})` : ''} ${CONST_TITLE} ${title}`;
        document.body.setAttribute("_title", CONST_TITLE + title);
    }, []);

    return <div id="notfound">
        <div className="notfound">
            <div className="notfound-404"></div>
            <h1>404</h1>
            <h2>Trang không tồn tại!</h2>
            <p>Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, hoặc đã bị xóa</p>
            <Link to={url.URL_HOME}>Trang chủ</Link>
            {children}
        </div>
    </div>
}

export default PageError404;