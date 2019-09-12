import React, { useState } from "react";
import { Post } from "../../models/post";
import { Grid, Button } from "semantic-ui-react";
import {
  Card,
  CardContent,
  makeStyles,
  Theme,
  createStyles,
  Collapse,
  Fade
} from "@material-ui/core";
import { drawerWidth } from "../../utils/utils";
import { NavLink } from "react-router-dom";

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
      backgroundColor: "pink"
    },
    verticalCard: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 10,
      [theme.breakpoints.down("sm")]: {
        height: 300
      },
      height: 200,
      backgroundColor: "pink"
    },
    title: {
      position: "absolute",
      top: 30,
      fontWeight: "bold",
      color: "white",
      width: "70%"

      //   textShadow: "1px 1px #000000"
    },
    button: {
      position: "absolute",
      bottom: 40
    }
  })
);

export default function CardPanel(props: Props) {
  const { posts, reverse } = props;
  const classes = useStyles();
  const [inani, setIn] = useState(false);
  setTimeout(() => {
    setIn(true);
  }, 400);

  const btn = (link: number) => (
    <NavLink to={`/post/${link}`}>
      <Button
        primary
        color="teal"
        content="Read more"
        className={classes.button}
      ></Button>
    </NavLink>
  );

  const horizentalCard = (
    <Grid.Row>
      <Grid.Column>
        <Card
          elevation={5}
          className={classes.horizentalCard}
          style={{
            backgroundImage: `url(${posts[0].image_url})`
          }}
        >
          <CardContent>
            <div className={classes.title}>
              <Grid.Row>
                <span>{posts[0].post_category.category}</span>
              </Grid.Row>
              <Grid.Row>
                <h2 style={{ color: "white" }}>{posts[0].title}</h2>
              </Grid.Row>
            </div>
            {btn(posts[0].id)}
          </CardContent>
        </Card>
      </Grid.Column>
    </Grid.Row>
  );

  const verticalCards = (
    <Grid.Row columns={2}>
      {posts.slice(1).map((p, i) => (
        <Grid.Column tablet={8} computer={8} mobile={16}>
          <Card
            elevation={5}
            className={classes.verticalCard}
            style={{
              backgroundImage: `url(${p.image_url})`
            }}
          >
            <CardContent>
              <div className={classes.title}>
                <Grid.Row>
                  <span>{p.post_category.category}</span>
                </Grid.Row>
                <Grid.Row>
                  <h2 style={{ color: "white" }}>{p.title}</h2>
                </Grid.Row>
              </div>
              {btn(p.id)}
            </CardContent>
          </Card>
        </Grid.Column>
      ))}
    </Grid.Row>
  );
  return (
    <Fade in={inani} mountOnEnter>
      <Grid.Column computer={8} tablet={8} mobile={16}>
        <Grid>
          {reverse ? verticalCards : horizentalCard}
          {reverse ? horizentalCard : verticalCards}
        </Grid>
      </Grid.Column>
    </Fade>
  );
}
