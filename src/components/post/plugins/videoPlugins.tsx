/** @format */

import React from "react";
import { ContentBlock } from "draft-js";
import AudioPlayer from "react-h5-audio-player";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export function findVideoEntities(
  contentBlock: ContentBlock,
  callback: any,
  contentState: any
) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "video"
    );
  }, callback);
}

export const VideoComponent = (props: any) => {
  const { src, captions, description } = props.contentState
    .getEntity(props.entityKey)
    .getData();

  return (
    <React.Fragment>
      <video
        controls
        src={src}
        style={{ width: "100%" }}
        crossOrigin="use-credentials"
      >
        {captions.map((c: any, i: number) => (
          <track key={i} src={c.src} label={c.lang} />
        ))}
      </video>
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
    </React.Fragment>
  );
};
