import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 50
  },
  bar: {
      justifyContent: 'center'
  },
  button: {
      marginLeft: 20
  }
}));

const NavBar = props => {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const history = useHistory();

  const redirect = path => {
    if(url[url.length - 1] === '/'){
      url = url.substr(0, url.length - 1)
    }
     
    history.push(`${url}/${path}`)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.bar}>
          <Button 
            className={classes.utton} 
            color="inherit"
            onClick={() => {redirect('users')}}
            >
                משתמשים
            </Button>
          <Button 
            className={classes.utton} 
            color="inherit"
            onClick={() => redirect('dogs')}
            >
                כלבים
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;