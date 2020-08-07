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
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const [title, setTitle] = React.useState<string>();

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Collapse in={title !== undefined} mountOnEnter unmountOnExit>
            <Typography variant="h6">{title}</Typography>
          </Collapse>
          <Collapse in={title === undefined} mountOnEnter unmountOnExit>
            <LinearProgress />
          </Collapse>
          <span>{url}</span>
        </React.Fragment>
      }
      onOpen={async () => {
        if (!title) {
          try {
            let result = await axios.get(url);
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(result.data, "text/html");
            let title = htmlDoc.querySelector("title");
            if (title) {
              setTitle(title.innerText);
            }
          } catch (err) {
            setTitle("Fetch Error");
          }
        }
      }}
    >
      <a href={url} target="_blank">
        {props.children}
      </a>
    </HtmlTooltip>
  );
};
