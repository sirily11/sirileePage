/** @format */

import React from "react";
import HomePost from "./components/HomePost";
import LeftSider from "./components/LeftSider";
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
import { Layout, Spin } from "antd";

import { useRouteMatch, useParams } from "react-router";
import { config } from "../../settings/config";

const { Header, Content, Footer } = Layout;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

type TParams = { id?: string };

export default function Homepage() {
  const match = useRouteMatch();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    document.title = "Blog";
  }, []);

  const { isLoading } = React.useContext(PostContext);
  const classes = useStyles();

  return (
    <Layout
      style={{
        height: `calc(100vh - ${config.headerHeight}px)`,
        overflow: "hidden",
      }}
    >
      <Layout style={{ overflow: "hidden" }}>
        <LeftSider />
        <Layout style={{ padding: 0, overflow: "hidden" }}>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
              overflow: "hidden",
              padding: 0,
            }}
          >
            <Backdrop open={isLoading} style={{ color: "#fff", zIndex: 10000 }}>
              <div
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Spin size="large" />
              </div>
            </Backdrop>
            <HomePost />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
