/** @format */

import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PostContext } from "../../states/PostState";
import { Menu, Segment, Sticky } from "semantic-ui-react";

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
      <Segment className={classes.root}>
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
    </Sticky>
  );
}
