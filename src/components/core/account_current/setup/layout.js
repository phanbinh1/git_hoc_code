import React, { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Collapse } from "antd";
import { SketchPicker } from 'react-color';

const SetupLayout = ({ tab }) => {
    const root_css = useSelector(state => state.root_css);
    return <Fragment>
        {root_css.map(item => <div
            onClick={() => tab.onLayoutChange({ group_code: item.code, group_name: item.name })}
            key={item.code}
            className="config-item"
        >
            {item.name} <i className="fa fa-angle-right config-item-angle-right" />
        </div>)}
    </Fragment>
}

export const LayoutListItem = ({ tab }) => {
    const root_css = useSelector(state => state.root_css);
    const item = root_css.find(gr => gr.code === tab.group_code);
    return <Fragment>
        {item && Array.isArray(item.data) && item.data.map((item, i) => <LayoutItem key={i} item={item} group_code={tab.group_code} />)}
    </Fragment>
}

const LayoutItem = ({ item, group_code }) => {
    const dispatch = useDispatch();
    return <Fragment>
        <div className="config-item">
            <Collapse className="config-item-collapse">
                <Collapse.Panel header={<span>{item.name}</span>} showArrow={false}>
                    <div className="m-b-10">
                        <Checkbox
                            disabled={item.value === item.default}
                            checked={item.value === item.default}
                            onChange={() => dispatch({
                                type: "LAYOUT_CSS_CHANGE",
                                code: item.code,
                                payload: item.default
                            })}
                        >
                            <span>Mặc định</span>
                        </Checkbox>
                    </div>
                    <div>
                        {
                            item.type === "color" ?
                                <SketchPicker
                                    color={item.value}
                                    onChangeComplete={(color) => {
                                        const { rgb } = color;
                                        const { r, g, b, a } = rgb;
                                        dispatch({
                                            type: "LAYOUT_CSS_CHANGE",
                                            group_code,
                                            code: item.code,
                                            payload: `rgb(${r},${g},${b}${a ? `,${a}` : ""})`
                                        })
                                    }}
                                /> :
                                item.value
                        }
                    </div>
                </Collapse.Panel>
            </Collapse>
            {/* <span>{item.name}</span>
            <div className="m-b-10">
                <Checkbox
                    disabled={item.value === item.default}
                    checked={item.value === item.default}
                    onChange={() => dispatch({
                        type: "LAYOUT_CSS_CHANGE",
                        code: item.code,
                        payload: item.default
                    })}
                >
                    <span>Mặc định</span>
                </Checkbox>
            </div>
            <div>
                {
                    item.type === "color" ?
                        <SketchPicker
                            color={item.value}
                            onChangeComplete={(color) => {
                                const { rgb } = color;
                                const { r, g, b, a } = rgb;
                                dispatch({
                                    type: "LAYOUT_CSS_CHANGE",
                                    group_code,
                                    code: item.code,
                                    payload: `rgb(${r},${g},${b}${a ? `,${a}` : ""})`
                                })
                            }}
                        /> :
                        item.value
                }
            </div> */}
        </div>
    </Fragment>
}

export default SetupLayout;