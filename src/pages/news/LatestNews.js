import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

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

  if (isLoading)
    return (
      <>
        "Loading..."
        <Spinner animation="grow" variant="primary" size="sm" />
        <Spinner animation="grow" variant="primary" />
      </>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <Card className="m-1" border="primary">
      <ListGroup>
        {!news.length ? (
          <ListGroupItem>
            <Card.Body>
              <Card.Text>No news items found</Card.Text>
            </Card.Body>
          </ListGroupItem>
        ) : (
          <>
            {news.slice(0, 5).map((item, id) => {
              return (
                <ListGroupItem key={id}>
                  <Card.Header className="text-primary">
                    <Card.Title className="text-primary">
                      {item.title}
                    </Card.Title>
                  </Card.Header>
                  <Card.Text>{item.content}</Card.Text>
                </ListGroupItem>
              );
            })}
          </>
        )}
      </ListGroup>
    </Card>
  );
};

export default LatestNews;
