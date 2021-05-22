/** @format */

import React from "react";
import { Color, Category } from "../models/post";
import { isBrightColor } from "../utils/utils";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import classes from "*.module.css";
import moment from "moment";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

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
      padding: 10,
    },

    titleDark: {
      fontWeight: "bold",
      color: "black",
      width: "100%",
      padding: 10,
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
    <div style={{ zIndex: 10, padding: 15 }}>
      <Title
        style={{
          fontSize: "3em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      >
        <div>
          <div className={classes.titleBright} id="post-title">
            {props.title}
          </div>
          <p id="post-detail" className={classes.titleDark}>
            {props.author} | {props.category.category} |
            {moment(props.posted_time).format("YYYY-MM-DD")}
          </p>
        </div>
      </Title>
    </div>
  );
}
