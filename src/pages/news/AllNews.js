import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllNews = () => {
  const [listDetails, setListDetails] = useState({
    news: [],
  });

  const { news } = listDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["newsData"],
    queryFn: () => axiosReq.get("/announcement").then((res) => res.data),
    onSuccess: (data) => setListDetails({ news: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {!news.length ? (
        <Card className="m-1" border="primary">
          <Card.Text>No news items found</Card.Text>
        </Card>
      ) : (
        <>
          <Row>
            {news.map((item, id) => {
              return (
                <Col s={12} md={6} lg={4} key={id}>
                  <Card className="m-1" border="primary" key={id}>
                    <Card.Header className="text-primary">
                      <Card.Title className="text-primary">
                        {item.title}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{item.content}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <ListGroup>
                        <ListGroupItem>
                          Updated on: {item.lastupdated}
                        </ListGroupItem>
                        <ListGroupItem>
                          Written by: {item.author}{" "}
                          <FontAwesomeIcon
                            className="text-primary m-1"
                            icon={`fa-solid fa-${item.profileicon}`}
                          />
                        </ListGroupItem>
                        <ListGroupItem>
                          Category: {item.category_title}
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default AllNews;
