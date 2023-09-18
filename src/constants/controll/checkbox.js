import React from 'react';
import { Form, Checkbox } from "antd";

export default ({
    input,
    disabled = false,
    className = "",
    id,
    label,
    nonStyle = false
}) => {
    return (<React.Fragment>
        <Form.Item>
            <Checkbox
                style={nonStyle ? {} : { marginTop: 25 }}
                {...input}
                className={className}
                disabled={disabled}
                id={id}
                checked={input.value ? true : false}
            >
                {label}
            </Checkbox>
        </Form.Item>
    </React.Fragment>)
}