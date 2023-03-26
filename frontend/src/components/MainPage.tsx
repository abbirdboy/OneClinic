import React from "react";
import { observer } from "mobx-react";
import AudioRecorder from "./AudioRecorder";
import {
  Button,
  Typography,
  Stack,
  Popover,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Avatar,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import UserStore from "../stores/UserStore";
import simulatedChartsImg from "../assets/simulated-charts.jpg";
import RecordStore, { Resource } from "../stores/RecordStore";

const MainPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Stack paddingX={3}>
        <Stack direction="row" gap={2}>
          <TextField
            placeholder="Search Patients"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon sx={{ color: "#3065FF" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={handleOpenPopover}>
            <MicIcon sx={{ color: "#B4191A" }} />
          </IconButton>
        </Stack>
        <Stack paddingTop={3}>
          <Typography
            textAlign="left"
            sx={{ fontSize: "22px", color: "#212F3E" }}
          >
            Social Health Tracking
          </Typography>
          <img
            src={simulatedChartsImg}
            style={{
              width: "900px",
            }}
          />
        </Stack>
        <Stack paddingTop={3} paddingBottom={3}>
          <Typography
            textAlign="left"
            sx={{ fontSize: "22px", color: "#212F3E" }}
          >
            New Recommendations
          </Typography>
          <Stack direction="row" gap={2} paddingTop={2} overflow="wrap">
            {RecordStore.resourceResults.slice(0, 3).map((resource) => (
              <ResourceCard resource={resource} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ maxHeight: 500 }}
      >
        <Stack paddingY={2}>
          <AudioRecorder />
        </Stack>
      </Popover>
    </>
  );
};

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const { title, description, thumbnail, url } = resource;

  return (
    <Card style={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia style={{ height: 140 }} image={thumbnail} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={url}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default observer(MainPage);
