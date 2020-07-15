/** @format */

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
import { Helmet } from "react-helmet";
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
    drawer: {
      width: "500px",
    },
    body: {
      marginRight: 630,
      [theme.breakpoints.down("md")]: {
        marginRight: 350,
      },
      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
      },
    },
  })
);

export default function PodcastDetail({ match }: RouteComponentProps<TParams>) {
  const classes = useStyles();
  const [podcast, setPodcast] = React.useState<Playlist>();
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { fetchPodcast,  } = React.useContext(PodcastContext);

  React.useEffect(() => {
    let id = match.params.id;
    fetchPodcast(id).then((r) => {
      setPodcast(r);
    });

  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <Helmet>
        <link rel="icon" href={podcast?.cover ?? ""} />
        <title>{podcast?.title ?? "Podcast"}</title>
        <meta property="og:title" content={podcast?.title} />
        <meta property="og:image" content={podcast?.cover ?? ""} />
      </Helmet>
      <CssBaseline />
      <Hidden mdUp>
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
          <Grid className={classes.body} item xs={12}>
            <LeftDetail />
          </Grid>
          <Hidden smDown implementation="js">
            <Drawer
              variant="permanent"
              className={classes.drawer}
              anchor="right"
            >
              <RightList podcast={podcast} />
            </Drawer>
          </Hidden>
          <Hidden mdUp>
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
