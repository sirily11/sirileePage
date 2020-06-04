/** @format */

import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import "./App.css";
import PostProvider from "./components/states/PostState";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple, green, grey } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import PostDetail from "./components/post/PostDetail";
import WelcomePage from "./components/welcomepage/WelcomPage";
import PodcastList from "./components/podcast/PodcastList";
import PodcastDetail from "./components/podcast/details/PodcastDetail";
import PodcastProvider from "./components/states/PodcastState";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: purple,
    secondary: green,
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
    <div>
      <ThemeProvider theme={theme}>
        <PostProvider>
          <Router>
            <CssBaseline />
            <Route path="/" exact component={WelcomePage}></Route>
            <Route path="/blog/:id?" exact component={Homepage}></Route>
            <Route path="/post/:id" exact component={PostDetail}></Route>
          </Router>
        </PostProvider>
      </ThemeProvider>
      <ThemeProvider theme={podcastTheme}>
        <Router>
          <PodcastProvider>
            <Route path="/playlist/" exact component={PodcastList}></Route>
            <Route path="/podcast/:id" exact component={PodcastDetail}></Route>
          </PodcastProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
