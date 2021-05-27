/** @format */

import React, { useContext, useState } from "react";
import { Post } from "../../models/post";
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Fade,
} from "@material-ui/core";
import { PostContext } from "../../states/PostState";
import { drawerWidth, split } from "../../utils/utils";
import { Row, Button } from "antd";
import CardPanel from "./CardPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth + 30,
        margin: 40,
      },
    },
    divider: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    hrDivider: {
      backgroundImage:
        "linear-gradient(to right, #333 10%, rgba(255, 255, 255, 0) 0%)",
      backgroundPosition: "top",
      backgroundSize: "10px 1px",
      backgroundRepeat: "repeat-x",
    },
  })
);

export default function HomePost() {
  const classes = useStyles();
  const { posts, fetchNext, getPost, seletedCategory, nextURL } =
    useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ height: "100vh", overflow: "scroll" }}>
      <Row className={classes.content}>
        {split<Post>(posts).map((pl, index) => {
          if (pl.length === 0) {
            return <div></div>;
          }
          return <CardPanel posts={pl} reverse={index % 2 !== 0} />;
        })}
      </Row>
      <Fade
        in={nextURL !== undefined && nextURL != null}
        mountOnEnter
        unmountOnExit
        timeout={100}
      >
        <Button
          loading={isLoading}
          type="primary"
          onClick={async () => {
            setIsLoading(true);
            await fetchNext();
            setIsLoading(false);
          }}
        >
          Load more
        </Button>
      </Fade>
    </div>
  );
}
