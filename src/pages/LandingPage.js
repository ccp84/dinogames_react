import React from "react";
import GameList from "./library/GameList";
import { Col, Row } from "react-bootstrap";
import LatestNews from "./news/LatestNews";
import PageContainer from "../components/Layout/PageContainer";

const LandingPage = () => {
  return (
    <>
      <Row>
        <Col s={12} md={6}>
          <h2 className="text-primary">Latest News</h2>
          <>
            <LatestNews />
          </>
        </Col>
        <Col s={12} md={6}>
          <Row>
            <Col>
              <h2 className="text-primary">Latest Games</h2>
              <>
                <GameList list="latest" filter="?ordering=-id" />
              </>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-primary">About</h2>
              <>
                <PageContainer
                  bodyContent={
                    <>
                      Welcome to the Dinosaur Games Library. A resource for all
                      types of tabletop games. Please use the library search
                      features to find a game to play.
                    </>
                  }
                />
              </>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
