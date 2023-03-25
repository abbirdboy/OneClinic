import React from "react";
import { observer } from "mobx-react";
import { Button, Typography } from "@mui/material";
import PostEditor from "./components/PostEditor";
import TemplateSuggestions from "./components/TemplateSuggestions";
import Toolbar from "./Toolbar";
import Draggable from "react-draggable";
import SelectTest from "./SelectTest";
import MailingItem from "./MailingItem";
import MegaBox from "./MegaBox";
import MuxPlayer from "@mux/mux-player-react";
import AuthStore from "./stores/AuthStore";

const Home = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <Button onClick={AuthStore.handleSignOut}>Sign Out</Button>
      </div>
      <div
        style={{
          height: "100%",
          // width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "fixed",
          // backgroundColor: "red",
          top: 0,
        }}
      >
        <Typography sx={{ color: "black" }}>Hello</Typography>
      </div>
    </>
  );
};

export default observer(Home);
