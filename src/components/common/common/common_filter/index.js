import React, { lazy, Suspense } from "react";
const CommonFilter = lazy(() => import("./filter"));

export default ({
    selectedKeys = [],
    onSelect,
    menus = [],
    loading,
    getPopupContainer,
    children
}) => <Suspense fallback={<div className="m-l-5 btn-skeleton w-100 h-30 ant-btn" ><span /></div>}>
        <CommonFilter
            selectedKeys={selectedKeys}
            onSelect={onSelect}
            menus={menus}
            loading={loading}
            getPopupContainer={getPopupContainer}
            children={children}
        />
    </ Suspense>