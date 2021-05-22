import React, { useContext } from "react";
import { Grid, Icon, Button } from "semantic-ui-react";
import { drawerWidth } from "../../utils/utils";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PostContext } from "../../states/PostState";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth + 20,
    },
    marginTop: 30,
    marginLeft: 100,
    width: "100%",
    textAlign: "left",
  },
}));

export default function HeaderBar() {
  const classes = useStyles();
  const postContext = useContext(PostContext);

  return (
    <div className={classes.root}>
      <Grid.Row>
        <h1 className="header">My Blog </h1>
      </Grid.Row>
      <Grid.Row>
        <h2>
          {postContext.seletedCategory && postContext.seletedCategory.category}
        </h2>
      </Grid.Row>
    </div>
  );
}
