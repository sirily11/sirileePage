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
} from "@material-ui/core";
import LeftMenu from "./components/LeftMenu";
import RightContent from "./components/RightContent";
import { PodcastContext } from "../states/PodcastState";

export default function PodcastList() {
  const { fetchPlaylist } = React.useContext(PodcastContext);
  const [isLoading, setIsLoading] = React.useState(true);
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
      container
      spacing={10}
      style={{
        padding: 10,
        height: "100%",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <CssBaseline />
      <Hidden smDown implementation="js">
        <Grid item md={3} lg={2} sm={12}>
          <LeftMenu />
        </Grid>
      </Hidden>
      <Grid item md={9} lg={10} xs={12}>
        <Collapse in={isLoading}>
          <CircularProgress />
        </Collapse>
        <RightContent />
      </Grid>
    </Grid>
  );
}
