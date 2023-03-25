import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Stack, Typography } from "@mui/material";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import UserStore from "../stores/UserStore";
import AuthStore from "../stores/AuthStore";
import { auth } from "../App";

const Login = () => {
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    console.log(JSON.stringify(UserStore.user));
  }, [UserStore.user]);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Stack alignItems="center" justifyContent="center" direction="column">
      <Typography
        style={{ color: "black" }}
      >{`${AuthStore.loggedIn}`}</Typography>
      <Typography>{JSON.stringify(UserStore.user)}</Typography>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={AuthStore.handleSignOut}>Sign out</Button>
    </Stack>
  );
};

export default observer(Login);
