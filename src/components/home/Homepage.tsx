import React from "react";
import { Container } from "semantic-ui-react";
import LeftMenu from "./components/LeftMenu";
import HomePost from "./components/HomePost";
import TabsNav from "./components/Tabs";
import HeaderBar from "./components/HeaderBar";

export default function Homepage() {
  return (
    <Container fluid>
      <LeftMenu></LeftMenu>
      <HeaderBar></HeaderBar>
      <TabsNav></TabsNav>
      <HomePost></HomePost>
    </Container>
  );
}
