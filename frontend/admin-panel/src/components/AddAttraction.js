import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from '@material-ui/core/CircularProgress';

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

const AddAttraction = props => {
  const classes = useStyles();
  const name = useRef(null);
  const address = useRef(null);
  const city = useRef(null);
  const phone = useRef(null);
  const image = useRef(null);
  const [type, setType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onTypeSelect = (event) => {
      setType(event.target.value)
  }

  const submitEventHandler = async e => {
      e.preventDefault();
      const attractionDetails = {
          name: name.current.value,
          address: address.current.value,
          city: city.current.value,
          imageURL: image.current.value,
          attractionType: type,
          phoneNumber: phone.current.value
      }

      try {
          setIsLoading(true);
          await AdminService.AddAttraction(attractionDetails);
      } catch(error) {
        
      } finally {
          setIsLoading(false);
          props.closeModal();
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          הוסף אטרקציה
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitEventHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label='שם'
            name="name"
            autoComplete="name"
            autoFocus
            inputRef={name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="כתובת"
            id="address"
            inputRef={address}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="עיר"
            id="city"
            inputRef={city}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="טלפון"
            id="phone"
            inputRef={phone}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            label="קישור לתמונה"
            id="image"
            inputRef={image}
          />
          <InputLabel id="type-label">סוג</InputLabel>
          <Select
            style={{width: 140}}
            labelId="type-label"
            value={type}
            onChange={onTypeSelect}
          >
            <MenuItem value={1}>וטרינר</MenuItem>
            <MenuItem value={2}>חנות אוכל ורווחה</MenuItem>
            <MenuItem value={3}>מספרה</MenuItem>
            <MenuItem value={4}>מאלף כלבים</MenuItem>
            <MenuItem value={5}>פנסיון</MenuItem>
          </Select>
          {isLoading && <CircularProgress style={{display: 'flex', margin: 'auto'}} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            הוסף
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddAttraction;