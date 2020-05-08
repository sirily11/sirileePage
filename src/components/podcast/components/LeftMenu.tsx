import React from "react";
import { ListItemText, List, ListItem } from "@material-ui/core";

export default function LeftMenu() {
  return (
    <List>
      <ListItem button selected>
        <ListItemText>Discover</ListItemText>
      </ListItem>
    </List>
  );
}
