import React from 'react';
import { Form, Switch } from "antd";

export default ({
    input,
    disabled = false,
    className = "",
    id,
    checkedChildren,
    unCheckedChildren,
}) => {
    return (<React.Fragment>
        <Form.Item>
            <Switch
                {...input}
                className={className}
                disabled={disabled}
                id={id}
                checked={input.value}
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
            />
        </Form.Item>
    </React.Fragment>)
}