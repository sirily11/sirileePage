/** @format */

import React from "react";
import { ContentBlock } from "draft-js";
import AudioPlayer from "react-h5-audio-player";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Author, Post } from "../../models/post";
import { Card, CardContent, CardMedia, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export function findInternalLinkEntities(
  contentBlock: ContentBlock,
  callback: any,
  contentState: any
) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "internallink"
    );
  }, callback);
}

export const InternalLinkComponent = (props: any) => {
  const classes = useStyles();
  const { title, id, author, image_url } = props.contentState
    .getEntity(props.entityKey)
    .getData() as Post;

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ cursor: "grab" }}
      onClick={() => {
        window.location.href = "#/post/" + id;
      }}
    >
      <CardMedia className={classes.cover} image={image_url} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {author.username}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};
