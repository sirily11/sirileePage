import { Col, Row } from "antd";
import moment from "moment";
import React from "react";
import { Diary } from "../models/diary";
import DisplayCard from "../share_components/DisplayCard";
import { VideoDiaryContext } from "../states/VideoDiaryState";
import { split } from "../utils/utils";

export default function VideoDisplay() {
  const { videos } = React.useContext(VideoDiaryContext);

  return (
    <Row>
      {split(videos).map((v, i) => (
        <VideoPanel diaries={v} reverse={i % 2 === 0} />
      ))}
    </Row>
  );
}

function VideoPanel(props: { diaries: Diary[]; reverse: boolean }) {
  const { diaries, reverse } = props;
  const horizentalCard = () => {
    return (
      <Row>
        <Col span={24}>
          <DisplayCard
            title={diaries[0].title}
            subtitle={moment(diaries[0].date).format("YYYY-MM-DD")}
            actionTitle={"Read"}
            onClick={() => {
              //   history.push("/blog/post/" + diaries[0].id);
            }}
            image={diaries[0].cover}
            isBright={diaries[0].is_bright}
          />
        </Col>
      </Row>
    );
  };

  const verticalCards = () => (
    <Row>
      {diaries.slice(1).map((p, i) => {
        return (
          <Col span={12} key={`post-${i}`}>
            <DisplayCard
              title={p.title}
              subtitle={moment(p.date).format("YYYY-MM-DD")}
              actionTitle={"Read"}
              onClick={() => {
                // history.push("/blog/post/" + p.id);
              }}
              image={p.cover}
              isBright={p.is_bright}
            />
          </Col>
        );
      })}
    </Row>
  );

  return (
    <Col xs={24} sm={24} md={12}>
      {reverse ? verticalCards() : horizentalCard()}
      {reverse ? horizentalCard() : verticalCards()}
    </Col>
  );
}
