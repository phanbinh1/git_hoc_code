import React, { useState } from 'react';
import { createID } from "./../../../constants/main"

const CommonFieldset = ({
    title,
    className = "",
    children,
    scrollIntoView,
    id
}) => {
    const [uid] = useState(id || createID());
    return <React.Fragment>
        <fieldset className={`${className}`} id={uid} >
            {title &&
                <legend
                    onClick={e => {
                        if (scrollIntoView) {
                            const frElm = document.getElementById(uid);
                            frElm && frElm.scrollIntoView();
                        }
                    }}
                >
                    {title}
                </legend>}
            {children}
        </fieldset>
    </React.Fragment>
}

export default CommonFieldset;