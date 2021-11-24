import * as Yup from "yup";
import { Link as RouterLink, useHistory, Navigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import React, { useState, useContext } from "react";

import {
  DispatchUserContext,
  UserContext,
} from "../../../state/contexts/contexts";
import {
  userLoginRequest,
  userLoginFailure,
  userLoginSuccess,
} from "../../../state/actions/userActionTypes";
import {
  signInWithEmailAndPassword,
  loginWithProvider,
} from "../../../auth/auth";
import firebase, { auth } from "../../../firebase";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [keepUserLoggedIn, setKeepUserLoggedIn] = useState(true);
  const dispatch = useContext(DispatchUserContext);
  const { isLoading } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = React.useState({
    value: "",
    showPassword: false,
  });
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(userLoginRequest());
      if (!keepUserLoggedIn) {
        // Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
      signInWithEmailAndPassword(email, password.value)
        .then((user) => {
          dispatch(userLoginSuccess(user));
          history.push("/dashboard/app");
        })
        .catch((err) => dispatch(userLoginFailure(err)));
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (e) => {
      e.preventDefault();
      if (!isLoading) {
        dispatch(userLoginRequest());
        if (!keepUserLoggedIn) {
          // Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        }
        signInWithEmailAndPassword(email, password.value)
          .then((user) => {
            dispatch(userLoginSuccess(user));
            history("/dashboard/app", { replace: true });
          })
          .catch((err) => dispatch(userLoginFailure(err)));
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleOnSubmit}>
      <Stack spacing={3}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
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
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
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
        <Link component={RouterLink} variant="subtitle2" to="#">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        {isLoading ? `Signing In...` : `Sign In`}
      </LoadingButton>
    </form>
  );
}
