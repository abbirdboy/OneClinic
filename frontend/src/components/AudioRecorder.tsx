import React, { useState } from "react";
import { storage } from "../firebase";
import { Button, Typography, Stack } from "@mui/material";
import { ReactMic } from "react-mic";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { observer } from "mobx-react";
import RecordStore, { realResults } from "../stores/RecordStore";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = async (recordedData: { blob: Blob }) => {
    const audioFile = recordedData.blob;

    // Upload audio file to Firebase storage
    const fileRef = ref(storage, `audioFiles/audio-${Date.now()}.mp3`);
    uploadBytes(fileRef, audioFile).then((snapshot) => {
      try {
        console.log("Uploaded a blob or file!");
        console.log(JSON.stringify(snapshot));
        getDownloadURL(ref(storage, snapshot.metadata.fullPath))
          .then((url) => {
            setAudioUrl(url);
            RecordStore.sendRecording(url)
              .then((response) => {
                console.log(
                  "response from transcript: ",
                  JSON.stringify(response)
                );
                const serializedSurveyResponse =
                  RecordStore.formatSurveyResponse(response.survey);
                RecordStore.resourceResults = realResults;
                RecordStore.sendSurvey(serializedSurveyResponse).then(
                  (recommendations) => {
                    RecordStore.formatRecomendationsResponse(recommendations);
                    console.log("recommendations: ", recommendations);
                  }
                );
              })
              .catch((error) => {
                console.error("sent recording: ", error);
              });
          })
          .catch((error) => {
            // Handle any errors
          });
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <Stack alignItems="center">
      <Typography textAlign="left" sx={{ fontSize: "18px", color: "#212F3E" }}>
        Record Conversation
      </Typography>
      <ReactMic
        record={isRecording}
        onData={(recordedData) => {
          console.log("chunk of real-time data is: ", recordedData);
        }}
        onStop={onStop}
        mimeType="audio/wav"
        visualSetting="frequencyBars"
      />
      {audioUrl && <audio src={audioUrl} controls />}
      <Stack direction="row">
        <Button onClick={startRecording}>Start Recording</Button>
        <Button onClick={stopRecording}>Stop Recording</Button>
      </Stack>
    </Stack>
  );
};

export default observer(AudioRecorder);
