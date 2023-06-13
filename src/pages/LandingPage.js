import React from "react";
import GameList from "./library/GameList";
import { Alert, Col, Row } from "react-bootstrap";
import LatestNews from "./news/LatestNews";
import PageContainer from "../components/Layout/PageContainer";

const LandingPage = () => {
  return (
    <>
      <Row>
        <Col s={12} md={6}>
          <Alert variant="warning" className="m-2"><Alert.Heading>Latest News</Alert.Heading></Alert>
          <>
            <LatestNews />
          </>
        </Col>
        <Col s={12} md={6}>
          <Row>
            <Col>
              <Alert variant="warning" className="m-2"><Alert.Heading>Latest Games</Alert.Heading></Alert>
              <>
                <GameList list="latest" filter="?ordering=-id" />
              </>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert variant="warning" className="m-2"><Alert.Heading>About</Alert.Heading></Alert>
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
