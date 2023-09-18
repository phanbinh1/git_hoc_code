import React, { Fragment, useEffect, useState } from "react";
import QRCode from 'qrcode.react';
import { createID, queryString } from "../../../constants/main";

const imgUrl = "data:image/png;base64,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";
const CommonQrCode = ({ location, size = 70 }) => {
    const host = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
    const url = `${host}` +
        `${location && location.pathname ? location.pathname : ""}` +
        `?${location && location.search ?
            (typeof location.search === "string" ? `${location.search}&qrcode_redirect=1` : queryString.stringify({ ...location.search, qrcode_redirect: 1 }))
            : ""}`
    const [id] = useState(createID());
    useEffect(() => {
        const qrcodeCanvas = document.getElementById(id);
        if (qrcodeCanvas) {
            const img = new Image();
            img.src = imgUrl;
            const canvasCtx = qrcodeCanvas.getContext("2d");
            canvasCtx.drawImage(img, 100, 100, 100, 100);
        }
    }, [])
    return <Fragment>
        <QRCode value={url} size={size} level="L" includeMargin={true} id={id} />
    </Fragment>
}

export default CommonQrCode;