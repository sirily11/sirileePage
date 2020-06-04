/** @format */

import React from "react";
import { Container } from "semantic-ui-react";
import HomePost from "./components/HomePost";
import TabsNav from "./components/Tabs";
import HeaderBar from "./components/HeaderBar";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NavLink, RouteComponentProps } from "react-router-dom";

type TParams = { id?: string };

export default function Homepage({ match }: RouteComponentProps<TParams>) {
  React.useEffect(() => {
    document.title = "Blog";
  }, []);

  return (
    <div>
      <Container fluid style={{ overflow: "hidden", height: "100%" }}>
        {/* <LeftMenu></LeftMenu> */}
        <TabsNav
          category_id={match.params.id ? parseInt(match.params.id) : undefined}
        ></TabsNav>
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
    </div>
  );
}
