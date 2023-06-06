import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Loading from "../../components/Loading";
import PageContainer from "../../components/Layout/PageContainer";
import { Link } from "react-router-dom";

const LatestNews = () => {
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
        // News list is empty
        <PageContainer
          bodyContent={
            <>
              <ListGroup>
                <ListGroupItem>
                  <Card.Body>
                    <Card.Text>No news items found</Card.Text>
                  </Card.Body>
                </ListGroupItem>
              </ListGroup>
            </>
          }
        />
      ) : (
        // Slice latest 5 news items before displaying
        <>
          <PageContainer
            bodyContent={
              <>
                <ListGroup>
                  {news.slice(0, 5).map((item, id) => {
                    return (
                      <ListGroupItem key={id}>
                        <Card.Header className="text-primary">
                          <Card.Title className="text-primary">
                            <Link to="/news">{item.title}</Link>
                          </Card.Title>
                        </Card.Header>
                        <Card.Text>{item.content}</Card.Text>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </>
            }
          />
        </>
      )}
    </>
  );
};

export default LatestNews;
