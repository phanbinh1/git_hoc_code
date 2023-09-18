import React, { lazy, Suspense } from "react";

const CommonAttachments = lazy(() => import("./attachments"));
export default ({
    entityId,
    attachEntityType,
    allowUpdate = true,
    onChange,
    listFile,
    drawer,
    addQrCode,
    displayType
}) => {
    return <Suspense fallback={<div className="btn-skeleton w_100 h-60" />} >
        <CommonAttachments
            entityId={entityId}
            attachEntityType={attachEntityType}
            allowUpdate={allowUpdate}
            onChange={onChange}
            listFile={listFile}
            drawer={drawer}
            addQrCode={addQrCode}
            displayType={displayType}
        />
    </Suspense >
};