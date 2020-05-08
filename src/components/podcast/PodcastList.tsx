import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Hidden,
  CssBaseline,
} from "@material-ui/core";
import LeftMenu from "./components/LeftMenu";
import RightContent from "./components/RightContent";

export default function PodcastList() {
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
        <RightContent />
      </Grid>
    </Grid>
  );
}
