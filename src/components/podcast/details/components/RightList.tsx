import React from "react";
import {
  List,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Grid,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import { Playlist } from "../../../models/podcast";
import { ListItem } from "@material-ui/core";
import { PodcastContext } from "../../../states/PodcastState";

interface Props {
  podcast: Playlist;
}

export default function RightList(props: Props) {
  const { podcast } = props;
  const { play, currentPlaylist } = React.useContext(PodcastContext);
  return (
    <List style={{ width: 350, padding: 10 }}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <CardMedia
            image={podcast.cover}
            style={{ height: 100, borderRadius: 10 }}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6">{podcast.title}</Typography>
          <Typography noWrap>{podcast.description}</Typography>
        </Grid>
      </Grid>
      <Divider style={{ width: "100%", marginTop: 10, marginBottom: 10 }} />
      {podcast.videos.map((p, i) => (
        <ListItem
          key={`video-${i}`}
          button
          selected={p.id === currentPlaylist?.id}
          onClick={() => {
            play(p);
          }}
        >
          <ListItemIcon>
            <CardMedia
              image={p.cover}
              style={{ height: 80, width: 100, borderRadius: 10 }}
            />
          </ListItemIcon>
          <ListItemText style={{ marginLeft: 10 }}>{p.title}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
