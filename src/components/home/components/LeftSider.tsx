/** @format */

import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PostContext } from "../../states/PostState";
import { Menu, Layout } from "antd";
import { useHistory, useLocation, useParams } from "react-router";

const { Sider } = Layout;

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

export default function LeftSider() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<{ id?: string }>();
  const postContext = useContext(PostContext);
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>("0");

  React.useEffect(() => {
    const { id } = params;
    let category = postContext.categories.find((c) => c.id.toString() === id);
    if (category) {
      setSelectedCategoryId(category.id.toString());
    }
    if (id === undefined) {
      setSelectedCategoryId("0");
    }
    postContext.selectCategory(category);
  }, [params, postContext.categories]);

  return (
    <Sider
      width={200}
      theme="light"
      style={{ paddingTop: 10 }}
      breakpoint="md"
      collapsedWidth={0}
    >
      <Menu selectedKeys={[selectedCategoryId]} theme="light">
        <Menu.Item
          key={0}
          onClick={() => {
            history.push(`/blog`);
          }}
        >
          {"All"}
        </Menu.Item>
        {postContext.categories.map((c) => (
          <Menu.Item
            key={c.id}
            onClick={() => {
              history.push(`/blog/${c.id}`);
            }}
          >
            {c.category}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
