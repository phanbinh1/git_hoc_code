
import React, { Fragment } from 'react';
import { Base64 } from '../../../constants/main';
const CommonViewPdf = ({
    url,
    title
}) => {

    return <Fragment>
        <iframe
            title={title || Base64.encode(url)}
            src={url}
            style={{
                width: "100%",
                height: "99%",
                border: "none"
            }}
        />
    </Fragment>
}

export default CommonViewPdf