/** @format */

import React, { useState } from "react";
import { Post } from "../../models/post";
import {
  Card,
  CardContent,
  makeStyles,
  Theme,
  createStyles,
  Fade,
} from "@material-ui/core";
import { isBrightColor } from "../../utils/utils";
import { NavLink } from "react-router-dom";
import { Button, Row, Col } from "antd";
import DisplayCard from "../../share_components/DisplayCard";
import { useHistory } from "react-router";

interface Props {
  reverse?: boolean;
  posts: Post[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function CardPanel(props: Props) {
  const { posts, reverse } = props;
  const classes = useStyles();
  const [inani, setIn] = useState(false);
  const history = useHistory();
  setTimeout(() => {
    setIn(true);
  }, 400);

  const horizentalCard = () => {
    const isBright =
      posts[0].cover_color.length === 0
        ? false
        : isBrightColor(posts[0].cover_color[0]);
    return (
      <Row>
        <Col span={24}>
          <DisplayCard
            title={posts[0].title}
            subtitle={posts[0].post_category.category}
            actionTitle={"Read"}
            onClick={() => {
              history.push("/blog/post/" + posts[0].id);
            }}
            image={posts[0].image_url}
            isBright={isBright}
          />
        </Col>
      </Row>
    );
  };

  const verticalCards = () => (
    <Row>
      {posts.slice(1).map((p, i) => {
        const isBright =
          p.cover_color.length === 0 ? false : isBrightColor(p.cover_color[0]);
        return (
          <Col span={12} key={`post-${i}`}>
            <DisplayCard
              title={p.title}
              subtitle={p.post_category.category}
              actionTitle={"Read"}
              onClick={() => {
                history.push("/blog/post/" + p.id);
              }}
              image={p.image_url}
              isBright={isBright}
            />
          </Col>
        );
      })}
    </Row>
  );
  return (
    <Fade in={inani} mountOnEnter>
      <Col xs={24} sm={24} md={12}>
        {reverse ? verticalCards() : horizentalCard()}
        {reverse ? horizentalCard() : verticalCards()}
      </Col>
    </Fade>
  );
}
