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
    <Responsive>
      <Visibility once={false}>
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: 700,
            padding: "1em 0em",
            backgroundImage: `url(${"http://0.0.0.0/media/cover/2019/09/09/8583392_R_SET.jpeg"})`
          }}
          vertical
        >
          <Menu inverted={false} secondary={true} size="large">
            <Container>
              <NavLink to="/">
                <Button icon="arrow left"></Button>
              </NavLink>
            </Container>
          </Menu>
          <PostTitle title={"Hello"} author={"sirily11"} />
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  );
}

function PostLayout(props: LayoutProps) {
  return (
    <DesktopContainer
      author={props.post.author.username}
      title={props.post.title}
      imageSrc={props.post.image_url}
    >
      <Segment style={{ padding: "8em 8em" }} vertical>
        <ReactMarkdown source={props.post.content}></ReactMarkdown>
      </Segment>
    </DesktopContainer>
  );
}
export default PostLayout;
