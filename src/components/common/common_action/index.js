import React, { lazy, Suspense, Fragment } from 'react';
import { useSelector } from 'react-redux';
import _ from "lodash";
const CommonActionApp = lazy(() => import("./app"));
const CommonActionWeb = lazy(() => import("./web"));

const CommonAction = ({ loading = 0 }) => {

    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const arrAction = useSelector(state => state.core.actions);

    const isMobile = document.body.getAttribute("_enviroment") === "app";

    const getActionSort = () => {
        var result = [];
        _.orderBy(permission_priviliged, ["sort"], ["asc"]).map((item) => {
            if (!item.hiddenAction) {
                result.push(item);
            }
            return result;
        });
        return result;
    }

    return isMobile ?
        <Suspense fallback={<div className="btn-skeleton w-100 h-30 ant-btn type-1" ><span /></div>}>
            <CommonActionApp loading={loading} listAction={getActionSort()} arrAction={arrAction} />
        </Suspense> :
        <Suspense fallback={<Fragment>
            <div className="btn-skeleton w-100 h-30 ant-btn type-1" ><span /></div>
            <div className="m-l-5 btn-skeleton w-100 h-30 ant-btn type-1" ><span /></div>
            <div className="m-l-5 btn-skeleton w-100 h-30 ant-btn type-1" ><span /></div>
        </Fragment>}>
            <CommonActionWeb loading={loading} listAction={getActionSort()} arrAction={arrAction} />
        </Suspense>
}

export default CommonAction;
export { default as Header } from "./header";
export const CONST_BTN_SIZE_DEFAULT = "default"
export const CONST_BTN_SHAPE_DEFAULT = undefined;
export const CONST_BTN_CLS_DEFAULT = "btn-header-page-action";