/**
 *  actions     |   Array [{...action1},{...actions2}]
 *  ex:
 *  action1:{
 *      idChucNang  |   Required : false
 *      sort        |   Number              default:    permission.sort
 *      label       |   String              default:    permission.name
 *      icon        |   String              default:    permission.icon
 *      confirm     |   Boolean             default:    false
 *      confirmLabel|   String | Node       default:    'Bạn chắc chắn muốn thao tác?'
 *      onClick     |   Function            default:    message('Thao tác chưa được định nghĩa')
 *      type        |   String('danger','success','primary','default')  Default:'default'
 *  }
 *  mode:   "dropdown","inline"     Default:"dropdown"
 */

import React, { useState, useEffect, lazy, Fragment, Suspense } from 'react';
import _ from "lodash";
import { useSelector } from 'react-redux';
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";
import * as message from "./../../../../constants/message";

const ActionDropdown = lazy(() => import("./action_dropdown"));
const ActionInline = lazy(() => import("./action_inline"));

const CommonTableAction = ({
    actions,
    mode = "dropdown",
    getPopupContainer
}) => {

    const [firstLoad, setFirstLoad] = useState(false);
    const [_actions, _setActions] = useState([]);

    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const handleClickActionNotDefined = () => message.error({ content: constants.CONST_NOT_DEFIENED_ACTION, key: "NOT_DEFIENED_ACTION", duration: 3 })
    useEffect(() => {
        let index = -1;
        let result = [];
        let action = null;
        (Array.isArray(actions) ? actions : []).map((act) => {
            index = -1;
            if (!act.hidden) {
                if (act.idChucNang) {
                    index = permission_priviliged.findIndex(item => item.idChucNang === act.idChucNang);
                    if (index !== -1) {
                        action = permission_priviliged[index];
                        result.push({
                            uid: main.createID(),
                            sort: act.sort && typeof act.sort === "number" ? act.sort : action.sort,
                            disabled: act.disabled,
                            label: act.label ? act.label : action.name,
                            icon: act.icon ? act.icon : action.icon,
                            confirm: act.confirm ? true : false,
                            confirmLabel: act.confirmLabel ? act.confirmLabel : "Bạn chắc chắn muốn thao tác?",
                            onClick: act.onClick && typeof act.onClick === "function" ? act.onClick : handleClickActionNotDefined,
                            type: act.type ? act.type : "default",
                            tooltip: act.tooltip,
                            shape: act.shape
                        })
                    }
                }
                else {
                    result.push({
                        uid: main.createID(),
                        disabled: act.disabled,
                        sort: act.sort && typeof act.sort === "number" ? act.sort : -1,
                        label: act.label ? act.label : "",
                        icon: act.icon ? act.icon : "",
                        confirm: act.confirm ? true : false,
                        confirmLabel: act.confirmLabel ? act.confirmLabel : "Bạn chắc chắn muốn thao tác?",
                        onClick: act.onClick && typeof act.onClick === "function" ? act.onClick : handleClickActionNotDefined,
                        type: act.type ? act.type : "default",
                        tooltip: act.tooltip,
                        shape: act.shape
                    })
                }
            }
            return null;
        })
        setFirstLoad(true);
        _setActions(_.orderBy(result, ["sort"], ["asc"]).map((item) => {
            return item;
        }));
    }, [permission_priviliged, actions])

    return <Fragment>
        <Suspense fallback={<div className="btn-skeleton w_100 h-30" />}>
            {
                mode === "inline" ?
                    <ActionInline actions={_actions} getPopupContainer={getPopupContainer} firstLoad={firstLoad} /> :
                    <ActionDropdown actions={_actions} getPopupContainer={getPopupContainer} firstLoad={firstLoad} />
            }
        </Suspense>
    </Fragment>
}

export default CommonTableAction;