/** @format */

import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PostContext } from "../../states/PostState";
import { Menu, Segment, Sticky } from "semantic-ui-react";
import { AppBar, Tabs, Tab, Paper } from "@material-ui/core";

interface TabPanelProps {
  category_id?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    // flexGrow: 1,
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: drawerWidth + 50
    // },
    // marginLeft: 10,
    // marginTop: 20,
    // backgroundColor: theme.palette.background.paper
  },
}));

export default function TabsNav(props: TabPanelProps) {
  const classes = useStyles();
  const { category_id } = props;
  const postContext = useContext(PostContext);

  React.useEffect(() => {
    let category = postContext.categories.find((c) => c.id === category_id);
    if (category && postContext.seletedCategory !== category) {
      postContext.selectCategory(category);
    }
  }, [category_id, postContext.categories]);

  return (
    <Sticky>
      <Paper style={{ padding: 10 }}>
        <Tabs
          indicatorColor={"secondary"}
          value={postContext.seletedCategory?.id ?? -1}
          variant="scrollable"
          onChange={(e, newValue) => {
            console.log(newValue);
            if (newValue < 0) {
              postContext.selectCategory(undefined);
              window.location.href = "#/blog/";
            } else {
              window.location.href = "#/blog/" + newValue;
            }
          }}
        >
          <Tab label={"All"} value={-1} />
          {postContext.categories.map((category, index) => (
            <Tab
              key={`category-${index}`}
              label={category.category}
              value={category.id}
            />
          ))}
        </Tabs>
      </Paper>
    </Sticky>
  );
}

/**
 * <Segment className={classes.root}>
        <Menu secondary>
          <Menu.Item
            name="All"
            active={postContext.seletedCategory === undefined}
            onClick={() => {
              postContext.selectCategory(undefined);
              window.location.href = "#/blog";
            }}
          />
          {postContext.categories.map((category, index) => (
            <Menu.Item
              name={category.category}
              active={postContext.seletedCategory === category}
              onClick={() => {
                window.location.href = "#/blog/" + category.id;
              }}
            />
          ))}
        </Menu>
      </Segment>
 * 
 */
