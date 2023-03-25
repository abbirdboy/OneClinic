import React from "react";
import { observer } from "mobx-react";
import { Button, Stack, Typography } from "@mui/material";
import AuthStore from "./stores/AuthStore";
import UserStore from "./stores/UserStore";

const Toolbar = () => {
  return (
    <>
      <Stack
        direction="row"
        flex={1}
        overflow="auto"
        height="90vw"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: "#0B66FF",
          borderRadius: 5,
          marginY: 2,
          paddingX: 2,
        }}
      >
        <Typography>Welcome, {UserStore.user?.name}</Typography>
        <Button onClick={AuthStore.handleSignOut}>
          <Typography color="white">Sign Out</Typography>
        </Button>
      </Stack>
    </>
  );
};

export default observer(Toolbar);
