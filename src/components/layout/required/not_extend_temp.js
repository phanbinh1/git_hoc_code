import React, { Fragment, Suspense } from "react";
import { Route, Switch } from 'react-router-dom';
import LazyLoading from "./../loading";

const NotExtendTemp = ({
    routes = [],
}) => {
    return <Fragment>
        <Suspense fallback={<LazyLoading />}>
            <Switch>
                {routes.map(route => <Route path={route.path} component={route.main} />)}
            </Switch>
        </Suspense>
    </Fragment>
}

export default NotExtendTemp;