import React, { useCallback, lazy } from "react";
import * as url from "./../constants/url";
import * as main from "./../constants/main";
import * as constants from "./../constants/constants";
import MobileHome from "./../pages/mobile";

export default [
    {
        path: url.URL_M_HOME,
        exact: true,
        main: () => <MobileHome />,
        requireAuth: false,
        extendTemplate: false,
    },
]