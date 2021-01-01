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
import { DetailSettings } from "../../models/post";

export function findPostSettingsEntities(
  contentBlock: ContentBlock,
  callback: any,
  contentState: any
) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "POST-SETTINGS"
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

export const PostSettingsComponent = (props: any) => {
  const entity = props.contentState.getEntity(props.entityKey);
  const { settings } = props;
  const [detail, setDetail] = React.useState<DetailSettings>();
  const entityData: DetailSettings | undefined = entity
    ? entity.get("data")
    : undefined;

  React.useEffect(() => {
    if (settings) {
      for (let s of settings) {
        for (let d of s.detailSettings) {
          if (d.id === entityData?.id) {
            setDetail(d);
          }
        }
      }
    }
  }, [settings]);
  return (
    <HtmlTooltip
      title={
        <div>
          <Typography variant="h6">{detail?.name}</Typography>
          <Typography>{detail?.description}</Typography>
        </div>
      }
    >
      <span style={{ cursor: "pointer", color: "blue" }}>{props.children}</span>
    </HtmlTooltip>
  );
};
