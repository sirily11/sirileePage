/** @format */

import React, { Component, useState, useRef } from "react";
import { Container, Menu, Segment, Button, Card } from "semantic-ui-react";
import PostTitle from "./PostTitle";
import { NavLink } from "react-router-dom";
import { Post, Color, Category } from "../models/post";

import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Paper, Grid } from "@material-ui/core";
import { convertFromRaw, EditorState } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";

import * as tocbot from "tocbot";

// plugins
import createImagePlugin from "draft-js-image-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
//@ts-ignore
import createAlignmentPlugin from "draft-js-alignment-plugin";
import "draft-js-alignment-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
import "tocbot/dist/tocbot.css";
import { ContentElement } from "../models/tableOfContent";
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
  tocElement: ContentElement;
  posted_time: string;
  category: Category;
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
        padding: "30px",
      },
      height: 200,
      padding: "10px 40px",
      backgroundColor: "pink",
    },
    container: {
      overflow: "hidden",
      overflowX: "hidden",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        overflow: "scroll",
      },
    },
    content: {
      overflowX: "hidden",
      [theme.breakpoints.down("sm")]: {
        overflow: "hidden",
        maxHeight: "300vh",
        padding: "20px",
      },
      overflowY: "scroll",
      maxHeight: "100vh",
      padding: "5px",
    },
    cover: {
      height: "100vh",
      // [theme.breakpoints.down("sm")]: {
      //   height: "60%"
      // },
      width: "100%",
    },
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
        backgroundSize: "cover",
        backgroundPosition: "center",
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
        posted_time={props.posted_time}
        category={props.category}
      />
      <div style={{ marginLeft: 40 }} id="toc">
        {props.tocElement.render(props.cover_color)}
      </div>
    </Segment>
  );
}

function PostLayout(props: LayoutProps) {
  const classes = useStyles();
  const [height, setHeight] = useState(window.innerHeight);

  window.addEventListener("resize", (ev) => {
    setHeight(window.innerHeight);
  });

  return (
    <Grid container className={classes.container}>
      <Grid item md={6} className={classes.cover}>
        <TitleWithCover
          category={props.post.post_category}
          tocElement={ContentElement.constructElementTree(
            JSON.parse(props.post.content)
          )}
          title={props.post.title}
          author={props.post.author.username}
          imageSrc={props.post.image_url}
          cover_color={props.post.cover_color}
          posted_time={props.post.posted_time}
        />
      </Grid>
      <Grid item md={6} className={classes.content}>
        <div style={{ zIndex: 10 }}>
          <Editor
            onChange={(e) => {}}
            readOnly
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(props.post.content))
            )}
            plugins={[alignmentPlugin, imagePlugin, resizeablePlugin]}
          />
        </div>
      </Grid>
    </Grid>
  );

  // return (
  //   <Grid style={{ width: "100%", height: height }} divided>
  //     <Grid.Row>
  //       <Grid.Column computer={8} tablet={8} mobile={16}>
  //         <TitleWithCover
  //           tocElement={ContentElement.constructElementTree(
  //             JSON.parse(props.post.content)
  //           )}
  //           title={props.post.title}
  //           author={props.post.author.username}
  //           imageSrc={props.post.image_url}
  //           cover_color={props.post.cover_color}
  //         />
  //       </Grid.Column>
  //       <Grid.Column
  //         computer={8}
  //         tablet={8}
  //         mobile={16}
  //         style={{
  //           maxHeight: height,
  //           overflowY: "auto",
  //           padding: 30
  //         }}
  //       >
  //         <div style={{ zIndex: 10 }}>
  //           <Editor
  //             onChange={e => {}}
  //             readOnly
  //             editorState={EditorState.createWithContent(
  //               convertFromRaw(JSON.parse(props.post.content))
  //             )}
  //             plugins={[alignmentPlugin, imagePlugin, resizeablePlugin]}
  //           />
  //         </div>
  //       </Grid.Column>
  //     </Grid.Row>
  //   </Grid>
  // );
}
export default PostLayout;
