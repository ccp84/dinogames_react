import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Loading from "../../components/Loading";
import PageContainer from "../../components/Layout/PageContainer";

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
              <Alert variant="primary">No news items found</Alert>
            </>
          }
        />
      ) : (
        // Slice latest 5 news items before displaying
        <>
          <PageContainer
            bodyContent={
              <>
                {news.slice(0, 5).map((item) => {
                  return (
                    <Alert key={item.id} variant="primary">
                      <Alert.Heading>{item.title}</Alert.Heading>
                      <>{item.content}</>
                    </Alert>
                  );
                })}
              </>
            }
          />
        </>
      )}
    </>
  );
};

export default LatestNews;
