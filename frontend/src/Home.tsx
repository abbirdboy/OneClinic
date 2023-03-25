import React from "react";
import { observer } from "mobx-react";
import { Button, Stack } from "@mui/material";
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
    <Stack>
      <Button onClick={AuthStore.handleSignOut}>Sign Out</Button>
      {/* <iframe src="src/Test/index.html" title="my-iframe"></iframe> */}
    </Stack>
  );
};

export default observer(Home);
