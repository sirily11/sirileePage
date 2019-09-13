import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { drawerWidth } from "../../utils/utils";
import { PostContext } from "../../states/PostState";
import { Menu, Segment } from "semantic-ui-react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%"
    // flexGrow: 1,
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: drawerWidth + 50
    // },
    // marginLeft: 10,
    // marginTop: 20,
    // backgroundColor: theme.palette.background.paper
  }
}));

export default function TabsNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const postContext = useContext(PostContext);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }
  return (
    <Segment className={classes.root}>
      <Menu secondary>
        <Menu.Item
          name="All"
          active={postContext.seletedCategory === undefined}
          onClick={() => postContext.selectCategory(undefined)}
        />
        {postContext.categories.map((category, index) => (
          <Menu.Item
            name={category.category}
            active={postContext.seletedCategory === category}
            onClick={() => postContext.selectCategory(category)}
          />
        ))}
      </Menu>
    </Segment>
  );
}
