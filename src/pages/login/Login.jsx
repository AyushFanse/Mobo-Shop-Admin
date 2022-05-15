import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import axios from "axios";
import {
  Alert,
  Stack,
  IconButton,
  Button,
  Grid,
  TextField,
  FormControl,
  CircularProgress,
  InputLabel,
  Input,
  InputAdornment,
  Box,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Language,
} from "@mui/icons-material";
import { DataBase } from "../../DataFiles";

const Login = (props) => {
  const history = useHistory();
  const [Worning, setWorning] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState("");
  const contactForm = useRef();

  const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = contactForm.current;
    try {
      setLoading(true);
      if (data.email.value && data.password.value) {
        let response = await axios.post(`${DataBase}/register/login`, {
          email: data.email.value,
          password: data.password.value,
        });

        setWorning(response.data);

        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.userToken);
          props.history.push("/home");
        }
      } else {
        setWorning({
          status: "error",
          msg: "Please fill all the details..!!!",
        });
      }
    } catch (err) {
      if (!err.response) {
        setWorning({ status: "error", msg: "Your Are offline" });
        setLoading(false);
        return;
      }

      setWorning({ status: "error", msg: err.response.data.msg });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <a
        href='https://moboshop.netlify.app'
        target='_blank'
        rel='noopener noreferrer'
        style={{ position: "absolute", right: 40, top: "40px" }}
      >
        <Button
          style={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            textUnderlinePosition: "under",
            textTransform: "capitalize",
          }}
        >
          <Language style={{ color: "#1976d2" }} />
          Website
        </Button>
      </a>
      <Box className='loginLayout'>
        <Grid className='loginCardLayout'>
          <h2 className='loginHeading'>Admin Login</h2>
          {Worning.status === "error" ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant='filled' severity='error'>
                {Worning.msg}
              </Alert>
            </Stack>
          ) : null}
          <br />
          <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
            <Box
              sx={{ mt: -2, "& .MuiTextField-root": { m: 1.8, width: 293 } }}
            >
              <TextField
                id='input-with-icon-textfield'
                label='Email'
                name='email'
                value={props.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant='standard'
              />
            </Box>
            <br />
            <Grid>
              <FormControl sx={{ m: 1.8 }} variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Password
                </InputLabel>
                <Input
                  id='standard-adornment-password'
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={props.password}
                  sx={{ width: 293 }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid sx={{ textAlign: "center" }}>
              <Button
                sx={{ m: 2 }}
                type='submit'
                variant='contained'
                disableElevation
              >
                Submit
              </Button>
              {loading && <CircularProgress size={25} id='CircularProgress' />}
            </Grid>
            <Grid sx={{ textAlign: "center", cursor: "pointer" }}>
              <p className='createAccount'>
                Don&apos;t have account ?{" "}
                <span
                  className='link'
                  onClick={() => {
                    history.replace("/register");
                  }}
                  variant='body2'
                >
                  Register
                </span>
              </p>
            </Grid>
          </form>
        </Grid>
      </Box>
      <Grid
        sx={{
          textAlign: "center",
          m: 7,
          mb: 4,
          fontSize: "0.8rem",
          wordSpacing: "2px",
          fontWeight: 700,
        }}
      >
        If you are already a customer you can login into{" "}
        <a
          style={{ textDecoration: "none" }}
          rel='noopener noreferrer'
          href='https://moboshop.netlify.app'
          target='_blank'
        >
          MOBOSHOP
        </a>{" "}
        website and edit your account and if you are a new user you need to register a new account.
      </Grid>
    </>
  );
};
export default Login;
