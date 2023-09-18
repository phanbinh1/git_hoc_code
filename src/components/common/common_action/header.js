import React from "react";
import { PageHeader } from "antd";
import CommonAction from "./";

const Header = ({
    hiddenTitle,
    page404,
    page403,
    history,
    titlePage,
    subTitle,
    loading
}) => {
    return !hiddenTitle && !page404 && !page403 && <div className="content-title" id="content-title">
        <PageHeader
            id="page-header"
            backIcon={<i className="fa fa-arrow-left" />}
            onBack={() => history.goBack()}
            title={titlePage}
            subTitle={subTitle}
            extra={<CommonAction loading={loading} />}
        />
    </div>
}

export default Header;