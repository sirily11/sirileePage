import React from "react";
import { Container } from "semantic-ui-react";
import HomePost from "./components/HomePost";
import TabsNav from "./components/Tabs";
import HeaderBar from "./components/HeaderBar";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NavLink } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <Container fluid style={{ overflow: "hidden", height: "100%" }}>
        {/* <LeftMenu></LeftMenu> */}
        <TabsNav></TabsNav>
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
