import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
  linkTo: string;
}

export default function HoverCard(props: Props) {
  const [elevation, setElevation] = useState(false);
  return (
    <Paper
      style={{ textAlign: "start" }}
      elevation={elevation ? 2 : 0}
      onMouseEnter={() => {
        setElevation(true);
      }}
      onMouseLeave={() => setElevation(false)}
    >
      <NavLink to={`post/${props.linkTo}`}>{props.children}</NavLink>
    </Paper>
  );
}
