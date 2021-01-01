/** @format */

import React from "react";
import { ContentBlock } from "draft-js";
import AudioPlayer from "react-h5-audio-player";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

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
      <AudioPlayer src={src} />
      <Typography>
        <b>Audio Src:</b> <Link>{decodeURIComponent(src)}</Link>
      </Typography>
    </React.Fragment>
  );
};
