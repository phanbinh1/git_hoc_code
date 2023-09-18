import React from "react";
import routes_core from "./routes_core";
import routes_app from "./routes_app";
import routes_mobile from "./routes_mobile";
import PageTest from "./page_test";

export default [
    {
        path: "/test.html",
        exact: true,
        main: () => <PageTest />,
        requireAuth: false,
        extendTemplate: false,
    },
    ...routes_app,
    ...routes_core,
    ...routes_mobile
];