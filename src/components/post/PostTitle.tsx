import React from "react";
import { Container, Button, Icon, Header, Image } from "semantic-ui-react";

interface Props {
  title: string;
  author: string;
}

export default function PostTitle(props: Props) {
  return (
    <Container text>
      <Header
        as="h1"
        content={props.title}
        block
        subheader={props.author}
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em"
        }}
      />
    </Container>
  );
}
