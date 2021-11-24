import React, { useState, useContext } from "react";
import { Link as RouterLink, useHistory, } from "react-router-dom";
import {
  DispatchUserContext,
  UserContext,
} from "../../state/contexts/contexts";
import {
  userLoginRequest,
  userLoginFailure,
  userLoginSuccess,
} from "../../state/actions/userActionTypes";
import { signInWithEmailAndPassword, loginWithProvider } from "../../auth/auth";
import firebase, { auth } from "../../firebase";

import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
// material
import { Stack, Button, Divider, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const navigate = useHistory();
  const dispatch = useContext(DispatchUserContext);

  const handleLogin = async (providerId) => {
    dispatch(userLoginRequest());

    loginWithProvider(providerId)
      .then((user) => {
        dispatch(userLoginSuccess(user));
        navigate("/dashboard/app", { replace: true });
      })
      .catch((err) => dispatch(userLoginFailure(err)));
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => handleLogin("google.com")}
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => handleLogin("facebook.com")}
        >
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
