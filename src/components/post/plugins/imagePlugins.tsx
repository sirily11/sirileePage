/** @format */

import React from "react";
import { ContentBlock } from "draft-js";
import Lightbox from "react-image-lightbox";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Fade, CircularProgress } from "@material-ui/core";

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
  const [isLoading, setLoading] = React.useState(true);
  const { alignment, width, src, description } = props.contentState
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

  if (isLoading) {
    style = {
      ...style,
      display: "hidden",
    };
  }

  return (
    <React.Fragment>
      <Fade in={isLoading}>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: "50%",
            top: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      </Fade>

      <div style={style}>
        <img
          style={style}
          src={src}
          onClick={() => setShow(true)}
          onError={() => setLoading(false)}
          onLoad={() => {
            setLoading(false);
          }}
        />
        <div style={{ display: "flex" }}>
          <figcaption
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 16,
              color: "grey",
            }}
          >
            {description}
          </figcaption>
        </div>
      </div>
      {show && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={() => {
            setShow(false);
          }}
        />
      )}
    </React.Fragment>
  );
};
