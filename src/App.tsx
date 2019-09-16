import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import "./App.css";
import PostProvider from "./components/states/PostState";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple, green } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import PostDetail from "./components/post/PostDetail";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <PostProvider>
        <Router>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/post/:id" exact component={PostDetail}></Route>
        </Router>
      </PostProvider>
    </ThemeProvider>
  );
};

export default App;
