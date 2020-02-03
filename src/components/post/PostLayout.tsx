import React, { Component } from "react";
import { Container, Menu, Segment, Button, Grid } from "semantic-ui-react";
import PostTitle from "./PostTitle";
import { NavLink } from "react-router-dom";
import { Post } from "../models/post";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles } from "@material-ui/core";
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
  children: JSX.Element | JSX.Element[];
  title: string;
  author: string;
  imageSrc?: string;
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

function DesktopContainer(props: ContainerProps) {
  const { children } = props;

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: 700,
          width: "100%",
          padding: "1em 0em",
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
          style={{ marginTop: 40 }}
        >
          <Container>
            <NavLink to="/blog">
              <Button icon="arrow left"></Button>
            </NavLink>
          </Container>
        </Menu>
        <PostTitle title={props.title} author={props.author} />
      </Segment>

      {children}
    </div>
  );
}

function PostLayout(props: LayoutProps) {
  const classes = useStyles();
  return (
    <DesktopContainer
      author={props.post.author.username}
      title={props.post.title}
      imageSrc={props.post.image_url}
    >
      <Segment style={{ padding: "1em 1em" }} vertical>
        <Grid centered>
          <Grid.Column computer={10} tablet={12} mobile={14}>
            <Editor
              onChange={e => {}}
              readOnly
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(props.post.content))
              )}
              plugins={[alignmentPlugin, imagePlugin, resizeablePlugin]}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </DesktopContainer>
  );
}
export default PostLayout;
