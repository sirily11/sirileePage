/** @format */

import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Hidden,
  CssBaseline,
  Collapse,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
  Backdrop,
} from "@material-ui/core";
import LeftMenu from "./components/LeftMenu";
import RightContent from "./components/RightContent";
import { PodcastContext } from "../states/PodcastState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
export default function PodcastList() {
  const { fetchPlaylist } = React.useContext(PodcastContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles();

  React.useEffect(() => {
    fetchPlaylist()
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        window.alert("Error: " + err);
      });
  }, []);

  return (
    <Grid
      spacing={10}
      style={{
        padding: 10,
        height: "100%",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <CssBaseline />
      <Grid item xs={12}>
        <RightContent />
      </Grid>
      <Backdrop open={isLoading} className={classes.backdrop}>
        <CircularProgress />
      </Backdrop>
    </Grid>
  );
}
