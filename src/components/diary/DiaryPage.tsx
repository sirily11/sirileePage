import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { Backdrop, Theme } from "@material-ui/core";
import { Anchor, Col, Row, Spin, Typography } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useParams } from "react-router";
import React from "react";
import { VideoDiaryContext } from "../states/VideoDiaryState";
import LeftSider from "./LeftSider";
import VideoDisplay from "./VideoPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("md")]: {
        padding: "20px 50px",
      },
      padding: 0,
    },
  })
);

export default function DiaryPage() {
  const classes = useStyles();
  const { fetchVideo, isLoading } = React.useContext(VideoDiaryContext);
  const params = useParams<{ time?: string }>();

  React.useEffect(() => {
    fetchVideo(params.time);
  }, [params]);

  return (
    <div style={{ overflowY: "hidden" }}>
      <Content className={classes.content}>
        <Row>
          <Col md={3} sm={24} xs={24}>
            <LeftSider />
          </Col>
          <Col md={21} sm={24} xs={24}>
            <VideoDisplay />
          </Col>
        </Row>
      </Content>
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
    </div>
  );
}
