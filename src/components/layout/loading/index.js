import React, { Fragment } from "react";
const Loading = () => {

    console.log(window.location.href)
    return <Fragment>
        <div style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
        }}>
            <span className="_loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
    </Fragment>
}
export default Loading;