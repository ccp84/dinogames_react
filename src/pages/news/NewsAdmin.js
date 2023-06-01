import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ListGroupItem } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CreateNews from "./CreateNews";
import EditNews from "./EditNews";

const NewsAdmin = () => {
  const [listDetails, setListDetails] = useState({
    news: [],
  });

  const currentUser = useCurrentUser();

  const { news } = listDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["newsAdminlist"],
    queryFn: async () =>
      await axiosReq.get("/announcement/admin").then((res) => res.data),
    onSuccess: (data) => setListDetails({ news: data }),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {currentUser?.is_staff ? (
        <Card className="m-1" border="primary">
          <Card.Body>
            <Card.Title className="text-primary">News Admin</Card.Title>

            <CreateNews />
          </Card.Body>

          <ListGroup className="list-group-flush">
            {news.map((item) => {
              return (
                <ListGroupItem key={item.id}>
                  <EditNews
                    id={item.id}
                    title={item.title}
                    content={item.content}
                    category={item.category}
                  />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Card>
      ) : (
        "You must be an administrator to access this page"
      )}
    </>
  );
};

export default NewsAdmin;
