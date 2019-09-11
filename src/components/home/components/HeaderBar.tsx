import React from "react";
import { Grid, Icon, Button } from "semantic-ui-react";
import Moment from "react-moment";
import { drawerWidth } from "../../utils/utils";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth + 60
    },
    marginTop: 30,
    width: "100%"
  }
}));

export default function HeaderBar() {
  const classes = useStyles();
  return (
    <Grid>
      <Grid.Row className={classes.root}>
        <Grid.Column mobile={16} computer={4}>
          <h1 className="header">My Blog </h1>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <Moment interval={1000}></Moment>
        </Grid.Column>
        <Grid.Column mobile={16} computer={4}>
          <Button icon>
            <Icon name="search"></Icon>
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
