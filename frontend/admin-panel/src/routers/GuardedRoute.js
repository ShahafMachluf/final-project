
import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, ...rest }) => {
    const auth = !!localStorage.getItem('token');

    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default GuardedRoute;