import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useHistory, Link } from "react-router-dom";

// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import {
  DispatchUserContext,
  UserContext,
} from "../../../state/contexts/contexts";
import { signUpWithEmailAndPassword, addUserToCollection } from "../../../auth/auth";
import {
  userLoginRequest,
  userLoginFailure,
  userLoginSuccess,
} from "../../../state/actions/userActionTypes";
import firebase, { auth } from "../../../firebase";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [keepUserLoggedIn, setKeepUserLoggedIn] = useState(true);

  const dispatch = useContext(DispatchUserContext);
  const { loading } = useContext(UserContext);
  const { checkUserContext } = useContext(UserContext);
  const [password, setPassword] = React.useState({
    value: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const user = {
    name,
    email,
    password: password.value,
  };

  const firestoreUserDetails = {
    name,
    email,
    admin: true,
    status:"active",
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      dispatch(userLoginRequest());
      if (!keepUserLoggedIn) {
        // Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
      signUpWithEmailAndPassword(user)
        .then((user) => {
          addUserToCollection(firestoreUserDetails)
          dispatch(userLoginSuccess(user));
          history.push("/");
        })
        .catch((err) => dispatch(userLoginFailure(err)));
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleOnSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            required
            label="User name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>

        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email address"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          label="Password"
          name="password"
          value={password.value}
          type={password.showPassword ? "text" : "password"}
          onChange={handleChange("value")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <Icon icon={password.showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={keepUserLoggedIn}
              color="primary"
              onClick={(e) => setKeepUserLoggedIn(e.target.checked)}
            />
          }
          label="Keep me logged in"
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {loading ? `Signing up...` : `Sign Up`}{" "}
        </LoadingButton>
      </Stack>
    </form>
  );
}
