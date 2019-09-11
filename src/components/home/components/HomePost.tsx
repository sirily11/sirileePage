import React, { useContext } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Moment from "react-moment";
import { Post } from "../../models/post";
import HoverCard from "./HoverCard";
import {
  CardMedia,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Divider
} from "@material-ui/core";
import { PostContext } from "../../states/PostState";
import ReactMarkdown from "react-markdown";
import { drawerWidth } from "../../utils/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth + 30
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

const HighlightPost = (post: Post) => {
  return (
    <Grid.Column mobile={16} computer={7}>
      <HoverCard linkTo={`${post.id}`}>
        <Grid style={{ margin: 4 }}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Grid.Row>
                <span className="category">{post.post_category.category}</span>
              </Grid.Row>
              <Grid.Row>
                <h2 className="header">{post.title}</h2>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8}>
              <Typography variant="body2" color="textSecondary" component="div">
                <ReactMarkdown
                  source={post.content.slice(0, 150)}
                  escapeHtml={true}
                ></ReactMarkdown>
              </Typography>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={16}>
            <CardMedia
              style={{ height: 400, width: "100%" }}
              image={post.image_url}
              title="Contemplative Reptile"
            />
          </Grid.Column>
        </Grid>
        <Divider></Divider>
      </HoverCard>
    </Grid.Column>
  );
};

const PostList = (posts: Post[]) => {
  return (
    <Grid.Column mobile={16} computer={8}>
      {posts.slice(0, 4).map((p, i) => (
        <HoverCard linkTo={`${p.id}`} key={`post-card-${i}`}>
          <Grid style={{ margin: 10 }}>
            <Grid.Column width={11}>
              <Grid.Row>
                <span className="category">{p.post_category.category}</span>
              </Grid.Row>
              <Grid.Row>
                <h2 className="header">{p.title}</h2>
              </Grid.Row>
              <Grid.Row>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  <ReactMarkdown
                    source={p.content.slice(0, 150)}
                    escapeHtml={true}
                  ></ReactMarkdown>
                </Typography>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={5}>
              <CardMedia
                style={{ height: 100, width: "100%" }}
                image={p.image_url}
                title="Contemplative Reptile"
              />
            </Grid.Column>
          </Grid>
          <Divider></Divider>
        </HoverCard>
      ))}
    </Grid.Column>
  );
};

export default function HomePost() {
  const classes = useStyles();
  const { posts, fetchNext, getPost, seletedCategory } = useContext(
    PostContext
  );

  function split(posts: Post[]): Post[][] {
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
          .slice(i, i + 6)
      );
      i += 6;
    }
    return list;
  }

  return (
    <Grid.Column width={2} className={classes.content}>
      <Grid>
        {split(posts).map((pl, index) => {
          return (
            <Grid.Row>
              {HighlightPost(pl[0])}
              <Divider
                orientation="vertical"
                className={classes.divider}
              ></Divider>
              {PostList(pl.slice(1))}
            </Grid.Row>
          );
        })}
      </Grid>
    </Grid.Column>
  );
}
