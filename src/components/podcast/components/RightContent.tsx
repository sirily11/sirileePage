/** @format */

import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { PodcastContext } from "../../states/PodcastState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardImage: {
      height: 200,
      [theme.breakpoints.up("md")]: {
        height: 300,
      },
    },
  })
);

export default function RightContent() {
  const { playlist } = React.useContext(PodcastContext);
  const classes = useStyles();

  return (
    <Grid container>
      <Typography variant="h3" style={{ color: "white" }}>
        Podcast
      </Typography>
      <Divider style={{ width: "100%", marginTop: 20, marginBottom: 20 }} />
      <Grid container>
        {playlist.map((p, i) => (
          <Grid item md={4} xs={6}>
            <Card style={{ borderRadius: 10, marginRight: 10 }}>
              <CardActionArea
                onClick={() => {
                  window.location.href = "#/podcast/" + p.id;
                }}
              >
                <CardMedia image={p.cover} className={classes.cardImage} />
                <CardContent>
                  <Typography variant="h6" style={{ color: "white" }}>
                    {p.title}
                  </Typography>
                  <Typography style={{ maxLines: 2 }} noWrap>
                    {p.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
