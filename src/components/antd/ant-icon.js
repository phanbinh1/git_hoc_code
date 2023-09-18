import React from "react";
import { Icon } from "antd";

export default ({ type, className, style, ...props }) => {
    return <Icon
        type={type}
        className={className}
        style={style}
        {...props}
    />
}