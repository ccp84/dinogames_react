import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import SolidIcon from "../../components/icons/SolidIcon";
import Loading from "../../components/Loading";
import PageContainer from "../../components/Layout/PageContainer";
import HeaderContainer from "../../components/Layout/HeaderContainer";

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

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {!news.length ? (
        // returned list has no length - display message
        <PageContainer bodyContent={<>No news items found</>} />
      ) : (
        // Returned list length greater than 0 - map over objects
        <>
          {news.map((item, id) => {
            return (
              <HeaderContainer
                key={id}
                titleContent={
                  <>
                    <Row>
                      <Col sm={12} md={12}>
                        {item.title}
                      </Col>
                    </Row>
                  </>
                }
                bodyContent={
                  <>
                    <Row>
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
                  </>
                }
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default AllNews;