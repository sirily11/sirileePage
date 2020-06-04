/** @format */

import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getURL } from "../utils/utils";
import { Post } from "../models/post";

import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import { Grid, Container } from "semantic-ui-react";
import PostLayout from "./PostLayout";
import { Fade } from "@material-ui/core";
import "./post.css";
import "draft-js/dist/Draft.css";

type TParams = { id?: string };

function LoadingCard() {
  return (
    <Grid style={{ marginTop: 20, width: "100%" }}>
      <Grid.Row>
        <Grid.Column width={6}>
          {Array.from({ length: 5 }, (v, k) => k + 1).map((i) => (
            <Skeleton
              variant="rect"
              height={10}
              width={"100%"}
              style={{ margin: 10 }}
            ></Skeleton>
          ))}
        </Grid.Column>
        <Grid.Column width={10}>
          <Skeleton
            variant="rect"
            height={"80%"}
            style={{ margin: 10 }}
          ></Skeleton>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {Array.from({ length: 20 }, (v, k) => k + 1).map((i) => (
          <Skeleton
            variant="rect"
            height={10}
            width={"100%"}
            style={{ margin: 10 }}
          ></Skeleton>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default function PostDetail({ match }: RouteComponentProps<TParams>) {
  const [post, setPost] = useState<Post>();

  React.useEffect(() => {
    const url = getURL(`post/${match.params.id}/`);
    axios.get(url).then((res) => {
      setPost(res.data);
      document.title = res.data.title;
    });
  }, []);

  return (
    <div style={{ height: "100%" }} id="container">
      <Fade in={post !== undefined} mountOnEnter>
        <div style={{ width: "100%", height: "100%" }}>
          <meta property="og:title" content={post?.title} />
          <meta property="og:image" content={post?.image_url} />
          {post && <PostLayout post={post}></PostLayout>}
        </div>
      </Fade>
      <Fade in={post === undefined} unmountOnExit mountOnEnter>
        <LoadingCard></LoadingCard>
      </Fade>
    </div>
  );
}
