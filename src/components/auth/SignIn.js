import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';

import { useAuth } from '../../context/authContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    backgroundColor: 'pink',
    color: 'red',
    width: '400px',
    marginTop: '10px',
    padding: '20px',
    textAlign: 'center',
  }
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [btndisable, setBtnDisable] = useState(false);    
    const [error, setError] = useState("");    
    
    const { login, currentUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmailError(false);
        setPasswordError(false);

        if(email === ''){
            setEmailError(true);
        }

        if(password === ''){
            setPasswordError(true);
        }

        if(email && password){
          //   try {
          //     setError("");
          //     login(email, password);
          //     setBtnDisable(true);
          //     setTimeout(() => {
          //       history.push('/');
          //       console.log("Redirecting....")
          //     }, 3000);
          //     console.log("Signed In.")
          //     }
          //   catch {
          //     setError("Failed To Login");
          //     console.log(error);
          // }

          try {
            setError("")
            setBtnDisable(true)
            await login(email, password)
            console.log("User Logged In")
            history.push("/")
          } catch {
            setError("Failed to log in")
          }
          setBtnDisable(false);
        }
    }
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={btndisable}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to='/SignUp' variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              {error && <Typography className={classes.error}>{error}</Typography> }
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}