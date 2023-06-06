import React from "react";
import GameList from "./library/GameList";
import { Col, Row } from "react-bootstrap";
import LatestNews from "./news/LatestNews";
import PageContainer from "../components/Layout/PageContainer";
import HeaderContainer from "../components/Layout/HeaderContainer";

const LandingPage = () => {
  return (
    <>
      <HeaderContainer
        titleContent={<h1>Welcome to the Dinosaur Games Library</h1>}
        bodyContent={
          <>
            Please use the library search features to find your next favourite
            game. We hope to see you at an event soon.
          </>
        }
      />
      <Row>
        <Col s={12} md={6}>
          <h2>Latest News</h2>
          <>
            <LatestNews />
          </>
        </Col>
        <Col s={12} md={6}>
          <Row>
            <Col>
              <h2>Latest Games</h2>
              <>
                <GameList list="latest" filter="?ordering=-id" />
              </>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>About</h2>
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
