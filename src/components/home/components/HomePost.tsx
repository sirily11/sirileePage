import React, { useContext, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Post } from "../../models/post";
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Fade
} from "@material-ui/core";
import { PostContext } from "../../states/PostState";
import { drawerWidth } from "../../utils/utils";
import CardPanel from "./CardPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth + 30
      },
      margin: 40
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
  const { posts, fetchNext, getPost, seletedCategory, nextURL } = useContext(
    PostContext
  );
  const [isLoading, setIsLoading] = useState(false);

  function split(posts: Post[]): Post[][] {
    const itemPerList = 3;
    let list: Post[][] = [];
    let i = 0;
    while (i < posts.length) {
      list.push(posts.slice(i, i + itemPerList));
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
      <Fade in={nextURL !== undefined} mountOnEnter unmountOnExit timeout={100}>
        <Grid.Row centered>
          <Button
            loading={isLoading}
            primary
            onClick={async () => {
              setIsLoading(true);
              await fetchNext();
              setIsLoading(false);
            }}
          >
            Load more
          </Button>
        </Grid.Row>
      </Fade>
    </Grid>
  );
}
