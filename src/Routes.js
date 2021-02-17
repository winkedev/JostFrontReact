import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/Dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;