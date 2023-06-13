import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosReq } from "../../api/axiosDefaults";
import ListGroup from "react-bootstrap/ListGroup";
import { Alert, Button, ListGroupItem, Stack } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CreateNews from "./CreateNews";
import EditNews from "./EditNews";
import Loading from "../../components/Loading";
import HeaderContainer from "../../components/Layout/HeaderContainer";

const NewsAdmin = () => {
  const [listDetails, setListDetails] = useState({
    news: [],
  });
  const [show, setShow] = useState(false);

  const currentUser = useCurrentUser();

  const { news } = listDetails;

  const { isLoading, error } = useQuery({
    queryKey: ["newsAdminlist"],
    queryFn: async () =>
      await axiosReq.get("/announcement/admin").then((res) => res.data),
    onSuccess: (data) => setListDetails({ news: data }),
  });

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {currentUser?.is_staff ? (
        // Admin user logged in ? display page
        <HeaderContainer
          titleContent={
            <>
              <Stack direction="horizontal" gap={3}>
                <>News Admin</>
                <Button variant="light" onClick={() => setShow(!show)}>
                  {show ? "Close Editor" : "New Announcement"}
                </Button>
              </Stack>
              <Alert variant="primary" show={show}>
                <CreateNews />
              </Alert>
            </>
          }
          bodyContent={
            <>
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
            </>
          }
        />
      ) : (
        "You must be an administrator to access this page"
      )}
    </>
  );
};

export default NewsAdmin;
