import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "@mui/material";

import coverImage from "../assets/bg-cover.png";
import logoImage from "../assets/stethoscope.svg";

function AboutOneClinicPanel() {
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          borderRadius: "10px 0px 0px 10px",
        }}
      >
        <div>
          <img
            src={logoImage}
            alt=""
            style={{
              paddingBottom: "28px",
              height: "107px",
              width: "107px",
            }}
          ></img>
        </div>
        <div style={{ padding: "0px 8px" }}>
          <Typography variant="h5" style={{ color: "white" }} align="center">
            <b>A Digital Social Health Platform</b>
          </Typography>
        </div>
        <div style={{ width: "80%" }}>
          <img
            src={process.env.PUBLIC_URL + "/redirect_graphic.png"}
            alt=""
            style={{ width: "100%" }}
          ></img>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "transparent", color: "white" }}
            startIcon={<PlayCircleOutlineIcon />}
          >
            Watch why teams use OneClinic
          </Button>
        </div>
      </div>
    </>
  );
}

export default observer(AboutOneClinicPanel);
