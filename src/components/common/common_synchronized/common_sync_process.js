import React from 'react';
import { Progress } from 'antd';

const CommonSyncProcess = ({ ...props }) => {
    const { job } = props;
    const { totalStep, currentStep, message } = job;
    var percent = currentStep / totalStep * 100;
    if (message === "finish") {
        percent = 100;
    }
    return <Progress
        type="circle"
        percent={percent}
        format={(percent) => {
            if (percent < 100) {
                return `${parseInt(percent, 0)} %`;
            }
            else {
                return <span><i className="fa fa-check-circle" /> OK</span>;
            }
        }}
        width={70}
    />;
}

export default CommonSyncProcess;