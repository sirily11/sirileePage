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

interface Props {
  reverse?: boolean;
  posts: Post[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    horizentalCard: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 10,
      height: 200,
      backgroundColor: "pink",
    },
    verticalCard: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 10,
      [theme.breakpoints.down("sm")]: {
        height: 300,
      },
      height: 200,
      backgroundColor: "pink",
    },
    titleBright: {
      position: "absolute",
      top: 30,
      fontWeight: "bold",
      color: "white",
      width: "70%",
    },

    titleDark: {
      position: "absolute",
      top: 30,
      fontWeight: "bold",
      color: "black",
      width: "70%",
    },
    button: {
      position: "absolute",
      bottom: 40,
    },
  })
);

export default function DisplayCard(props: Props) {
  const { posts, reverse } = props;
  const classes = useStyles();
  const [inani, setIn] = useState(false);
  setTimeout(() => {
    setIn(true);
  }, 400);

  const btn = (link: number) => (
    <NavLink to={`/blog/post/${link}`}>
      <Button type="primary" className={classes.button}>
        Read
      </Button>
    </NavLink>
  );

  const horizentalCard = () => {
    const isBright =
      posts[0].cover_color.length === 0
        ? false
        : isBrightColor(posts[0].cover_color[0]);
    return (
      <Row>
        <Col span={24}>
          <Card
            elevation={5}
            className={classes.horizentalCard}
            style={{
              backgroundImage: `url(${posts[0].image_url})`,
            }}
          >
            <CardContent>
              <div
                className={isBright ? classes.titleDark : classes.titleBright}
              >
                <Row>
                  <span>{posts[0].post_category.category}</span>
                </Row>
                <Row>
                  <h2 style={{ color: isBright ? "black" : "white" }}>
                    {posts[0].title}
                  </h2>
                </Row>
              </div>
              {btn(posts[0].id)}
            </CardContent>
          </Card>
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
            <Card
              elevation={5}
              className={classes.verticalCard}
              style={{
                backgroundImage: `url(${p.image_url})`,
              }}
            >
              <CardContent>
                <div
                  className={isBright ? classes.titleDark : classes.titleBright}
                >
                  <Row>
                    <span>{p.post_category.category}</span>
                  </Row>
                  <Row>
                    <h2 style={{ color: isBright ? "black" : "white" }}>
                      {p.title}
                    </h2>
                  </Row>
                </div>
                {btn(p.id)}
              </CardContent>
            </Card>
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
