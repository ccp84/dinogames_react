import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import SolidIcon from "../../components/icons/SolidIcon";

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
          {news.map((item, id) => {
            return (
              <Card className="m-1" border="primary" key={id}>
                <Row>
                  <Col sm={12} md={12}>
                    <Card.Header className="text-primary">
                      <Card.Title className="text-primary">
                        {item.title}
                      </Card.Title>
                    </Card.Header>
                  </Col>
                  <Col sm={12} md={6}>
                    <Card.Body>
                      <Card.Text>{item.content}</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col sm={12} md={6}>
                    <Card.Body>
                      <ListGroup>
                        <ListGroupItem>
                          Updated on: {item.lastupdated}
                        </ListGroupItem>
                        <ListGroupItem>
                          Written by: {item.author}
                          <SolidIcon
                            className="text-primary m-1"
                            iconName={item.profileicon}
                          />
                        </ListGroupItem>
                        <ListGroupItem>
                          Category: {item.category_title}
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
};

export default AllNews;
