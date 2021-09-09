import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/NavBar';
import icon from '../assets/icon.png'
import Dogs from './Dogs';
import Users from './Users';
import Attractions from './Attractions';

const useStyles = makeStyles((theme) => ({
    logo: {
        height: 700,
        width: 700
    }
  }));

const Home = props => {
    const classes = useStyles();
    let { path } = useRouteMatch();

  return (
      <div>
        <NavBar />
        <Switch>
            <Route exact path={path}>
                <img src={icon} className={classes.logo} alt="logo" />
            </Route>
            <Route exact path={`${path}/users`} component={Users}/>
            <Route exact path={`${path}/dogs`} component={Dogs} />
            <Route exact path={`${path}/attractions`} component={Attractions} />
        </Switch>
      </div>
  );
}

export default Home;