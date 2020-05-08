import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Playlist } from "../../models/podcast";
import { PodcastContext } from "../../states/PodcastState";
import {
  Grid,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
  Fade,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  CssBaseline,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import LeftDetail from "./components/LeftDetail";
import RightList from "./components/RightList";
import MenuIcon from "@material-ui/icons/Menu";

interface TParams {
  id: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function PodcastDetail({ match }: RouteComponentProps<TParams>) {
  const classes = useStyles();
  const [podcast, setPodcast] = React.useState<Playlist>();
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { fetchPodcast } = React.useContext(PodcastContext);

  if (podcast === undefined) {
    let id = match.params.id;
    fetchPodcast(id).then((r) => {
      setTimeout(() => {
        setPodcast(r);
      }, 400);
    });
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <CssBaseline />
      <Hidden smUp>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => setShowDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>
      {podcast && (
        <Grid container style={{ padding: 10, height: "100%" }} spacing={10}>
          <Grid item md={8} sm={12} xs={12}>
            <LeftDetail />
          </Grid>
          <Hidden smDown implementation="js">
            <Grid item md={4}>
              <RightList podcast={podcast} />
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Drawer
              style={{ width: 400 }}
              open={showDrawer}
              onClose={() => setShowDrawer(false)}
            >
              <RightList podcast={podcast} />{" "}
            </Drawer>
          </Hidden>
        </Grid>
      )}
      <Backdrop className={classes.backdrop} open={podcast === undefined}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
