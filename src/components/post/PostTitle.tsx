/** @format */

import React from "react";
import { Container, Button, Icon, Header, Image } from "semantic-ui-react";
import { Color, Category } from "../models/post";
import { isBrightColor } from "../utils/utils";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import classes from "*.module.css";
import moment from "moment";

interface Props {
  title: string;
  author: string;
  category: Category;
  posted_time: string;
  cover_color: Color[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleBright: {
      fontWeight: "bold",
      color: "white",
      width: "100%",
      height: "100%",
    },

    titleDark: {
      fontWeight: "bold",
      color: "black",
      width: "100%",
    },
  })
);

export default function PostTitle(props: Props) {
  const isBright =
    props.cover_color.length === 0
      ? false
      : isBrightColor(props.cover_color[0]);

  const classes = useStyles();
  return (
    <Container text style={{ zIndex: 10, padding: 15 }}>
      <Header
        as="div"
        content={
          <div className={isBright ? classes.titleDark : classes.titleBright}>
            {props.title}
            <br></br>
            <h2 className={isBright ? classes.titleDark : classes.titleBright}>
              {props.author} | {props.category.category}
            </h2>
            <p>{moment(props.posted_time).format("YYYY-MM-DD")}</p>
          </div>
        }
        style={{
          fontSize: "3em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      />
    </Container>
  );
}
