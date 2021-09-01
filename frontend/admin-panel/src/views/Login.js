import React, {useRef, useEffect} from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import icon from '../assets/icon.png'
import * as AdminService from '../services/AdminService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = props => {
  const classes = useStyles();
  const history = useHistory();
  const email = useRef('');
  const password = useRef('')

  useEffect(() => {
    if(!!localStorage.getItem('token')) {
        history.push('/home')
    }
  }, [history])

  const submitEventHandler = async e => {
      e.preventDefault();
      const loginDetails = {
          email: email.current.value,
          password: password.current.value
      }
      const loginResult = await AdminService.Login(loginDetails);
      if(!!loginResult.token) {
        localStorage.setItem('token', loginResult.token)
        history.push('/home')
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={icon} className="App-logo" alt="logo" />
        <Typography component="h1" variant="h5">
          התחבר
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitEventHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label='דוא"ל'
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            התחבר
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;