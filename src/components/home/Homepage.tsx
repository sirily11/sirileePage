/** @format */

import React from "react";
import { Container } from "semantic-ui-react";
import HomePost from "./components/HomePost";
import TabsNav from "./components/Tabs";
import HeaderBar from "./components/HeaderBar";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { PostContext } from "../states/PostState";
import {
  makeStyles,
  Theme,
  createStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

type TParams = { id?: string };

export default function Homepage({ match }: RouteComponentProps<TParams>) {
  React.useEffect(() => {
    document.title = "Blog";
  }, []);

  const { isLoading } = React.useContext(PostContext);
  const classes = useStyles();

  return (
    <div>
      <TabsNav
        category_id={match.params.id ? parseInt(match.params.id) : undefined}
      />
      <Container fluid style={{ overflow: "hidden", height: "100%" }}>
        {/* <LeftMenu></LeftMenu> */}
        <HeaderBar></HeaderBar>
        <HomePost></HomePost>
      </Container>
      <NavLink to="/">
        <Fab
          style={{ position: "fixed", bottom: "10px", right: "10px" }}
          variant="extended"
        >
          <ArrowBackIosIcon />
          Back
        </Fab>
      </NavLink>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
