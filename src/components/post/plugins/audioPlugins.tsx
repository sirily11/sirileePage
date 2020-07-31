/** @format */

import React from "react";
import { ContentBlock } from "draft-js";
import {
  Tooltip,
  Typography,
  CircularProgress,
  withStyles,
  Theme,
  LinearProgress,
  Collapse,
  CardMedia,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function findAudioEntities(
  contentBlock: ContentBlock,
  callback: any,
  contentState: any
) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "audio"
    );
  }, callback);
}

export const AudioComponent = (props: any) => {
  const { src } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <React.Fragment>
      <audio src={src} controls />
    </React.Fragment>
  );
};
