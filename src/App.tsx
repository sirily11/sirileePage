/** @format */

import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import PostProvider from "./components/states/PostState";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple, green, grey, blue } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import PostDetail from "./components/post/PostDetail";
import PodcastList from "./components/podcast/PodcastList";
import PodcastDetail from "./components/podcast/details/PodcastDetail";
import PodcastProvider from "./components/states/PodcastState";
import { CssBaseline } from "@material-ui/core";
import { WelcomPage } from "./components/welcomepage";
import "./App.css";
import "react-image-lightbox/style.css";
import "react-h5-audio-player/lib/styles.css";
import "antd/dist/antd.css";
import { routes } from "./settings/routes";
import Navbar from "./components/Nav";
import VideoDiaryProvider from "./components/states/VideoDiaryState";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: purple,
    secondary: blue,
  },
});

const podcastTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: grey,
  },
});

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <ThemeProvider theme={theme}>
          <VideoDiaryProvider>
            <PostProvider>
              <CssBaseline />

              {routes.map((r, i) => (
                <Route path={r.path} exact key={`route-${i}`}>
                  {r.component}
                </Route>
              ))}
              {/* <Route path="/blog/:id?" exact component={Homepage}></Route>
            <Route path="/post/:id" exact component={PostDetail}></Route> */}
            </PostProvider>
          </VideoDiaryProvider>
        </ThemeProvider>
        <ThemeProvider theme={podcastTheme}>
          <PodcastProvider>
            {/* <Route path="/playlist/" exact component={PodcastList}></Route>
            <Route path="/podcast/:id" exact component={PodcastDetail}></Route> */}
          </PodcastProvider>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
