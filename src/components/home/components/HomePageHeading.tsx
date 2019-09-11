import React from "react";
import { Container, Header, Button, Icon } from "semantic-ui-react";

interface Props {
  mobile: boolean;
}

export default function HomePageHeading(props: Props) {
  return (
    <Container text>
      <Header
        as="h1"
        content="Imagine-a-Company"
        inverted
        style={{
          fontSize: props.mobile ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: props.mobile ? "1.5em" : "3em"
        }}
      />
      <Header
        as="h2"
        content="Do whatever you want when you want to."
        inverted
        style={{
          fontSize: props.mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: props.mobile ? "0.5em" : "1.5em"
        }}
      />
      <Button primary size="huge">
        Get Started
        <Icon name="arrow right" />
      </Button>
    </Container>
  );
}
