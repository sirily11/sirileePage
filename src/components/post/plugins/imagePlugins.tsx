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

export function findImageEntities(
  contentBlock: ContentBlock,
  callback: any,
  contentState: any
) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "image"
    );
  }, callback);
}

export const ImageComponent = (props: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [show, setShow] = React.useState(false);
  const { alignment, width, src } = props.contentState
    .getEntity(props.entityKey)
    .getData();

  let style: React.CSSProperties = {
    cursor: "grab",
  };

  if (matches) {
    style = {
      ...style,
      maxWidth: `${width}%`,
    };
  } else {
    style = { ...style, width: "100%" };
  }

  if (alignment === "left") {
    style = { ...style, float: "left" };
  } else if (alignment === "right") {
    style = { ...style, float: "right" };
  } else if (alignment === "center") {
    style = {
      ...style,
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
    };
  }

  return (
    <React.Fragment>
      <img src={src} style={style} onClick={() => setShow(true)} />
      <Dialog open={show} fullScreen>
        <DialogContent>
          <img src={src} style={{ maxWidth: "100%" }}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
