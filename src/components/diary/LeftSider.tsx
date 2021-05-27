import React from "react";
import { Anchor, Col, Row, Typography } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { VideoDiaryContext } from "../states/VideoDiaryState";
import moment from "moment";
import { useHistory, useLocation, useParams } from "react-router";

const { Link } = Anchor;

export default function LeftSider() {
  const params = useParams<{ time?: string }>();
  const { months } = React.useContext(VideoDiaryContext);
  const getCurrentAnchor = () => `#/diary/${params.time ?? ""}`;

  return (
    <Anchor
      style={{ overflowY: "scroll", margin: 10 }}
      getCurrentAnchor={getCurrentAnchor}
    >
      {months
        ?.map((m) => moment(m))
        .map((m, i) => (
          <Link
            href={`#/diary/${m.format("YYYY-MM")}`}
            title={`${m.format("YYYY-MM")}`}
          />
        ))}
    </Anchor>
  );
}
