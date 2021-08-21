import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import GuardedRoute from './GuardedRoute';
import Login from '../views/Login';
import Home from '../views/Home';

const AppRouter = props => {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <GuardedRoute path='/home' component={Home} />
                <GuardedRoute path='/' component={Login} />
            </Switch>
        </Router>
    )
}

export default AppRouter;