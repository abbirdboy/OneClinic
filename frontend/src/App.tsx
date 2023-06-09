import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import logo from "./logo.svg";
import "./App.css";

import { autorun } from "mobx";

import PostEditor from "./components/PostEditor";
import PostStore from "./stores/PostStore";
import ServiceBell from "@servicebell/widget";
import TemplateSuggestions from "./components/TemplateSuggestions";
import { Stack } from "@mui/material";
import Login from "./components/Login";
import AuthStore from "./stores/AuthStore";
import UserStore from "./stores/UserStore";
import Home from "./Home";
import RecordStore from "./stores/RecordStore";

declare global {
  interface Window {
    _clinic: {
      authStore: typeof AuthStore;
      userStore: typeof UserStore;
      recordStore: typeof RecordStore;
    };
  }
}

window._clinic = {
  authStore: AuthStore,
  userStore: UserStore,
  recordStore: RecordStore,
};

function App() {
  // if (ReactDeviceDetect.isMobile)

  useEffect(() => AuthStore.authSubscription(), []);

  useEffect(
    () =>
      autorun(() => {
        if (!!UserStore.userId) {
          return UserStore.subscribeToUser();
        }
      }),
    []
  );

  useEffect(
    () =>
      autorun(() => {
        if (!!UserStore.userId) {
          ServiceBell("init", "19853fc193f4403d860d58fc948f3ddc", {
            launcher: "pill",
          });
        }
      }),
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={UserStore.userId ? <Home /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default observer(App);
