import React from "react";
import { Container } from "semantic-ui-react";
import HomePost from "./components/HomePost";
import TabsNav from "./components/Tabs";
import HeaderBar from "./components/HeaderBar";

export default function Homepage() {
  return (
    <Container
      fluid
      style={{ overflowX: "hidden", overflowY: "auto", height: "100%" }}
    >
      {/* <LeftMenu></LeftMenu> */}
      <TabsNav></TabsNav>
      <HeaderBar></HeaderBar>
      <HomePost></HomePost>
    </Container>
  );
}
