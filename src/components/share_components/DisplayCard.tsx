import React from "react";
import {
  Card,
  CardContent,
  makeStyles,
  Theme,
  createStyles,
  Fade,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Button, Row, Col } from "antd";

interface Props {
  title: string;
  subtitle: string;
  actionTitle: string;
  onClick(): void;
  image: string;
  /**
   * Use white color or black color
   */
  isBright: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 10,
      height: 200,
      backgroundColor: "pink",
    },
    titleBright: {
      position: "absolute",
      top: 30,
      fontWeight: "bold",
      color: "white",
      width: "70%",
    },

    titleDark: {
      position: "absolute",
      top: 30,
      fontWeight: "bold",
      color: "black",
      width: "70%",
    },
    button: {
      position: "absolute",
      bottom: 40,
    },
  })
);

export default function DisplayCard(props: Props) {
  const classes = useStyles();
  const { image, title, subtitle, actionTitle, onClick, isBright } = props;

  return (
    <Card
      elevation={5}
      className={classes.card}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <CardContent>
        <div className={isBright ? classes.titleDark : classes.titleBright}>
          <Row>
            <span>{subtitle}</span>
          </Row>
          <Row>
            <h2 style={{ color: isBright ? "black" : "white" }}>{title}</h2>
          </Row>
        </div>
        <Button type="primary" className={classes.button} onClick={onClick}>
          {actionTitle}
        </Button>
      </CardContent>
    </Card>
  );
}
