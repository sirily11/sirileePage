import React, { useContext } from "react";
import { Button, Grid, Icon, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Moment from "react-moment";
import { Post } from "../../models/post";
import {
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Divider,
  Card,
  Container
} from "@material-ui/core";
import { PostContext } from "../../states/PostState";
import ReactMarkdown from "react-markdown";
import { drawerWidth } from "../../utils/utils";
import randomColor from "randomcolor";
import CardPanel from "./CardPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth + 10
      },
      margin: 10
    },
    divider: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    hrDivider: {
      backgroundImage:
        "linear-gradient(to right, #333 10%, rgba(255, 255, 255, 0) 0%)",
      backgroundPosition: "top",
      backgroundSize: "10px 1px",
      backgroundRepeat: "repeat-x"
    }
  })
);

export default function HomePost() {
  const classes = useStyles();
  const { posts, fetchNext, getPost, seletedCategory } = useContext(
    PostContext
  );

  function split(posts: Post[]): Post[][] {
    const itemPerList = 3;
    let list: Post[][] = [];
    let i = 0;
    while (i < posts.length) {
      list.push(
        posts
          .filter(
            post =>
              (seletedCategory &&
                post.post_category.id === seletedCategory.id) ||
              seletedCategory === undefined
          )
          .slice(i, i + itemPerList)
      );
      i += itemPerList;
    }
    return list;
  }

  return (
    <Grid>
      <Grid.Row className={classes.content}>
        {split(posts).map((pl, index) => {
          if (pl.length === 0) {
            return <Container></Container>;
          }
          return <CardPanel posts={pl} reverse={index % 2 !== 0}></CardPanel>;
        })}
      </Grid.Row>
    </Grid>
  );
}
