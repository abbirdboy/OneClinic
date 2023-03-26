import React from "react";
import { observer } from "mobx-react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import PostEditor from "./components/PostEditor";
import TemplateSuggestions from "./components/TemplateSuggestions";
import Toolbar from "./Toolbar";
import Draggable from "react-draggable";
import SelectTest from "./SelectTest";
import MailingItem from "./MailingItem";
import MegaBox from "./MegaBox";
import MuxPlayer from "@mux/mux-player-react";
import AuthStore from "./stores/AuthStore";
import MainPage from "./components/MainPage";
import UserStore from "./stores/UserStore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RecordStore, { Survey } from "./stores/RecordStore";

const Home = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          // width: "100vw",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "fixed",
          // backgroundColor: "red",
          top: 0,
          paddingTop: "1vh",
          // paddingLeft: "150px",
          // paddingRight: "100px",
        }}
      >
        <MainPage />
      </div>
      <div
        style={{
          height: "100vh",
          // display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#212F3E",
          position: "fixed",
          paddingTop: "1vh",
          paddingLeft: "1vw",
          paddingRight: "1vw",
          top: 0,
          right: 0,
        }}
      >
        <Stack justifyContent="center">
          <Stack direction="row" gap={2} sx={{ paddingBottom: 2 }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar
                src={
                  UserStore.user?.avatar ??
                  `https://ui-avatars.com/api/?name=${UserStore.user?.name}`
                }
              />
              <Stack>
                <Typography color={"white"} fontWeight="bold">
                  {UserStore.user?.name}
                </Typography>
                <Typography color={"white"}>19 yrs old</Typography>
              </Stack>
            </Stack>
            <IconButton onClick={AuthStore.handleSignOut}>
              <ExitToAppIcon color="secondary" />
            </IconButton>
          </Stack>
          {RecordStore.surveyResults.map((surveyResult) => (
            <SurveyCard surveyResult={surveyResult} />
          ))}
        </Stack>
      </div>
    </>
  );
};

interface SurveyCardProps {
  surveyResult: Survey;
}

const SurveyCard = ({ surveyResult }: SurveyCardProps) => {
  const { question, answer } = surveyResult;
  return (
    <Card
      style={{
        backgroundColor: "#e6f3ff",
        maxWidth: "230px",
      }}
    >
      <CardContent>
        <Typography style={{ fontWeight: "bold" }}>{question}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {answer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default observer(Home);
