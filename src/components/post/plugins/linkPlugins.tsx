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
} from "@material-ui/core";
import axios from "axios";

interface LinkProps {
  title: string;
  image?: string;
  summary?: string;
  link: string;
}

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

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    width: 300,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

export const Link = (props: any) => {
  const entityData: LinkProps = props.contentState
    .getEntity(props.entityKey)
    .getData().url;
  console.log(entityData);

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography variant="h6">{entityData?.title ?? "No data"}</Typography>
          {entityData?.image && (
            <img
              src={entityData?.image}
              alt={""}
              height={200}
              crossOrigin={"anonymous"}
            />
          )}
          <Typography>{entityData?.summary}</Typography>
          <span>{entityData?.link}</span>
        </React.Fragment>
      }
    >
      <a href={entityData.link} target="_blank">
        {props.children}
      </a>
    </HtmlTooltip>
  );
};
