import React, { Component } from "react";
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Button
} from "semantic-ui-react";
import PostTitle from "./PostTitle";
import { NavLink } from "react-router-dom";
import { Post } from "../models/post";
import ReactMarkdown from "react-markdown";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  author: string;
  imageSrc?: string;
}

interface LayoutProps {
  post: Post;
}

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
            <NavLink to="/">
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
  return (
    <DesktopContainer
      author={props.post.author.username}
      title={props.post.title}
      imageSrc={props.post.image_url}
    >
      <Segment style={{ padding: "1em 20em" }} vertical>
        <ReactMarkdown source={props.post.content}></ReactMarkdown>
      </Segment>
    </DesktopContainer>
  );
}
export default PostLayout;
