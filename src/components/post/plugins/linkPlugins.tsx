/** @format */

import React from "react";
import { ContentBlock } from "draft-js";
import { Tooltip } from "@material-ui/core";

export function findLinkEntities(
  contentBlock: ContentBlock,
  callback: any,
  contentState: any
) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

export const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <Tooltip title={url}>
      <a href={url} target="_blank">
        {props.children}
      </a>
    </Tooltip>
  );
};
