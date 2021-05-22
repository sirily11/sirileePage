import React from "react";
import { PodcastContext } from "../../../states/PodcastState";
import {
  Grid,
  Typography,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Slide,
  Divider,
} from "@material-ui/core";
//@ts-ignore
import { Player, ControlBar, ClosedCaptionButton } from "video-react";
import "video-react/dist/video-react.css";
import { VideoList } from "../../../models/podcast";

import DescriptionIcon from "@material-ui/icons/Description";
import AssetContainer from "./AssetContainer";

export default function LeftDetail() {
  const { currentPlaylist, clear } = React.useContext(PodcastContext);
  const [selectedVideoList, setSelectedVideoList] = React.useState<VideoList>();
  const [show, setShow] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);

  React.useEffect(() => {
    if (currentPlaylist !== undefined) {
      setSelectedVideoList(currentPlaylist.video_list[0]);
    }
  }, [currentPlaylist]);

  React.useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "95vh" }}>
      <Fade in={currentPlaylist !== undefined} mountOnEnter>
        <div>
          {currentPlaylist && (
            <Grid>
              <Grid item>
                <Player
                  playsInline
                  poster={currentPlaylist.cover}
                  src={selectedVideoList?.video}
                  crossOrigin="anonymous"
                >
                  {currentPlaylist.subtitle && (
                    <track
                      srcLang="zh"
                      label="Chinese"
                      kind="subtitles"
                      src={currentPlaylist.subtitle}
                    ></track>
                  )}

                  <ControlBar autoHide={false}>
                    <ClosedCaptionButton order={7} />
                  </ControlBar>
                </Player>
              </Grid>
              <Grid container style={{ alignContent: "space-between" }}>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Resolution
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedVideoList?.id ?? 0}
                      onChange={(e) => {
                        let selectedVideo = currentPlaylist.video_list.filter(
                          (v) => v.id === e.target.value
                        );
                        if (selectedVideo) {
                          setSelectedVideoList(selectedVideo[0]);
                        }
                      }}
                    >
                      {currentPlaylist.video_list.map((v, i) => (
                        <MenuItem key={`menu-${i}`} value={v.id}>
                          {v.resolution}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => setShow(true)}>
                    <DescriptionIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
              <Grid item style={{ marginTop: 10 }}>
                <Tabs
                  value={currentTab}
                  onChange={(e, value) => setCurrentTab(value)}
                >
                  <Tab label="Content" value={0} />
                  {currentPlaylist.asset_collections.length > 0 && (
                    <Tab label="Assets" value={1} />
                  )}
                </Tabs>
                {/** Info tab */}
                <Fade in={currentTab === 0} mountOnEnter unmountOnExit>
                  <div>
                    <Typography variant="h6">
                      {currentPlaylist?.title}
                    </Typography>
                    <Typography>{currentPlaylist?.description}</Typography>
                  </div>
                </Fade>
                {/** Assets tab */}
                <Fade in={currentTab === 1} mountOnEnter unmountOnExit>
                  <AssetContainer
                    collections={currentPlaylist.asset_collections}
                  />
                </Fade>
              </Grid>
            </Grid>
          )}
        </div>
      </Fade>
      <Fade in={currentPlaylist === undefined} unmountOnExit>
        <Typography>No video selected</Typography>
      </Fade>
      <Dialog open={show} onClose={() => setShow(false)} fullWidth>
        <DialogTitle>
          <Typography variant="h6" style={{ color: "white" }}>
            Original Text
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>{currentPlaylist?.original_text}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
