import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserStore from "./stores/UserStore";
import Home from "./Home";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AuthStore from "./stores/AuthStore";

declare global {
  interface Window {
    _clinic: {
      authStore: typeof AuthStore;
    };
  }
}

window._clinic = {
  authStore: AuthStore,
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_nG0_SYu6sqIiy_DxtTAVPEcr_OGTxeo",
  authDomain: "oneclinic-a26e3.firebaseapp.com",
  projectId: "oneclinic-a26e3",
  storageBucket: "oneclinic-a26e3.appspot.com",
  messagingSenderId: "999716280391",
  appId: "1:999716280391:web:c8a3dbef13f6b1308d7962",
  measurementId: "G-FKM5VYNHZ5",
};

// Initialize Firebase
console.log("initializing firebase");
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth(app);

function App() {
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

export default App;
