import React, { Fragment } from "react";

const Loading = () => {
    return <Fragment>
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999
        }}>
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    background: "rgb(0,0,0,.25)",
                    display: "table-cell",
                    verticalAlign: "middle"
                }}
            >
                <span className="_loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: document.body.innerHTML }} />
    </Fragment>
}
export default Loading;