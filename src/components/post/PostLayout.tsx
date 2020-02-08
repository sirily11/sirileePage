import React, { Component, useState } from "react";
import {
  Container,
  Menu,
  Segment,
  Button,
  Grid,
  Card
} from "semantic-ui-react";
import PostTitle from "./PostTitle";
import { NavLink } from "react-router-dom";
import { Post, Color } from "../models/post";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Paper } from "@material-ui/core";
import { convertFromRaw, EditorState } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";

// plugins
import createImagePlugin from "draft-js-image-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
//@ts-ignore
import createAlignmentPlugin from "draft-js-alignment-plugin";
import "draft-js-alignment-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
// endplugins
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const decorator = composeDecorators(
  alignmentPlugin.decorator,
  resizeablePlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

interface ContainerProps {
  title: string;
  author: string;
  imageSrc?: string;
  cover_color: Color[];
}

interface LayoutProps {
  post: Post;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 10,
      [theme.breakpoints.up("sm")]: {
        padding: "30px"
      },
      height: 200,
      padding: "10px 40px",
      backgroundColor: "pink"
    }
  })
);

function TitleWithCover(props: ContainerProps) {
  return (
    <Segment
      inverted
      textAlign="left"
      style={{
        height: "100%",
        backgroundImage: `url(${props.imageSrc})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      vertical
    >
      <Menu
        inverted={false}
        secondary={true}
        size="large"
        style={{ margin: 10 }}
      >
        <Container>
          <NavLink to="/blog">
            <Button icon="arrow left"></Button>
          </NavLink>
        </Container>
      </Menu>
      <PostTitle
        title={props.title}
        author={props.author}
        cover_color={props.cover_color}
      />
    </Segment>
  );
}

function PostLayout(props: LayoutProps) {
  const classes = useStyles();
  const [height, setHeight] = useState(window.innerHeight);

  window.addEventListener("resize", ev => {
    setHeight(window.innerHeight);
  });
  return (
    <Grid style={{ width: "100%", height: height }} divided>
      <Grid.Row>
        <Grid.Column computer={8} tablet={8} mobile={16}>
          <TitleWithCover
            title={props.post.title}
            author={props.post.author.username}
            imageSrc={props.post.image_url}
            cover_color={props.post.cover_color}
          />
        </Grid.Column>
        <Grid.Column
          computer={8}
          tablet={8}
          mobile={16}
          style={{
            maxHeight: height,
            overflowY: "auto",
            padding: 30
          }}
        >
          <div style={{ zIndex: 10 }}>
            <Editor
              onChange={e => {}}
              readOnly
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(props.post.content))
              )}
              plugins={[alignmentPlugin, imagePlugin, resizeablePlugin]}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default PostLayout;
