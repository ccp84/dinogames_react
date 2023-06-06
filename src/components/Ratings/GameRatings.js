import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Badge, Button, Card, Stack, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useQueryClient } from "@tanstack/react-query";

const GameRatings = ({
  thumbsup,
  thumbsdown,
  ratingid,
  ratingvalue,
  gameid,
}) => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  return (
    <>
      {currentUser ? (
        <>
          {ratingid ? (
            // User is logged in and there is a rating already returned
            <>
              {ratingvalue ? (
                // Rating returned is true - thumbs up
                <Card.Footer>
                  <Card.Title className="text-primary">
                    <Stack direction="horizontal" gap={3}>
                      <FontAwesomeIcon
                        className="text-success m-1"
                        icon={`fa-solid fa-thumbs-up`}
                        onClick={async () => {
                          try {
                            await axiosReq.delete(`/ratings/${ratingid}`);
                            queryClient.invalidateQueries({
                              queryKey: ["libraryData"],
                            });
                          } catch (err) {
                            <Toast>{err}</Toast>;
                          }
                        }}
                      />
                      <Badge pill bg="success">
                        {thumbsup}
                      </Badge>
                      <FontAwesomeIcon
                        className="text-secondary m-1"
                        icon={`fa-regular fa-thumbs-down`}
                        onClick={async () => {
                          try {
                            await axiosReq.put(
                              `/ratings/${ratingid}`,
                              `{"game": ${gameid}, "rating": false}`
                            );
                            queryClient.invalidateQueries({
                              queryKey: ["libraryData"],
                            });
                          } catch (err) {
                            <Toast>{err}</Toast>;
                          }
                        }}
                      />
                      <Badge pill bg="danger">
                        {thumbsdown}
                      </Badge>
                    </Stack>
                  </Card.Title>
                </Card.Footer>
              ) : (
                // Rating returned is false - thumbs down
                <Card.Footer>
                  <Card.Title className="text-primary">
                    <Stack direction="horizontal" gap={3}>
                      <FontAwesomeIcon
                        className="text-secondary m-1"
                        icon={`fa-regular fa-thumbs-up`}
                        onClick={async () => {
                          try {
                            await axiosReq.put(
                              `/ratings/${ratingid}`,
                              `{"game": ${gameid}, "rating": true}`
                            );
                            queryClient.invalidateQueries({
                              queryKey: ["libraryData"],
                            });
                          } catch (err) {
                            <Toast>{err}</Toast>;
                          }
                        }}
                      />

                      <Badge pill bg="success">
                        {thumbsup}
                      </Badge>
                      <FontAwesomeIcon
                        className="text-danger m-1"
                        icon={`fa-solid fa-thumbs-down`}
                        onClick={async () => {
                          try {
                            await axiosReq.delete(`/ratings/${ratingid}`);
                            queryClient.invalidateQueries({
                              queryKey: ["libraryData"],
                            });
                          } catch (err) {
                            <Toast>{err}</Toast>;
                          }
                        }}
                      />
                      <Badge pill bg="danger">
                        {thumbsdown}
                      </Badge>
                    </Stack>
                  </Card.Title>
                </Card.Footer>
              )}
            </>
          ) : (
            // User is logged in but there is no rating id returned
            <Card.Footer>
              <Card.Title className="text-primary">
                <Stack direction="horizontal" gap={3}>
                  <FontAwesomeIcon
                    className="text-secondary m-1"
                    icon={`fa-regular fa-thumbs-up`}
                    onClick={async () => {
                      try {
                        await axiosReq.post(
                          "/ratings/",
                          `{
                            "game": ${gameid},
                            "rating": true
                            }`
                        );
                        queryClient.invalidateQueries({
                          queryKey: ["libraryData"],
                        });
                      } catch (err) {
                        <Toast>{err}</Toast>;
                      }
                    }}
                  />
                  <Badge pill bg="success">
                    {thumbsup}
                  </Badge>
                  <FontAwesomeIcon
                    className="text-secondary m-1"
                    icon={`fa-regular fa-thumbs-down`}
                    onClick={async () => {
                      try {
                        await axiosReq.post(
                          "/ratings/",
                          `{
                            "game": ${gameid},
                            "rating": false
                            }`
                        );
                        queryClient.invalidateQueries({
                          queryKey: ["libraryData"],
                        });
                      } catch (err) {
                        <Toast>{err}</Toast>;
                      }
                    }}
                  />
                  <Badge pill bg="danger">
                    {thumbsdown}
                  </Badge>
                </Stack>
              </Card.Title>
            </Card.Footer>
          )}
        </>
      ) : (
        // User is not logged in
        <Card.Footer>
          <Stack direction="horizontal" gap={3}>
            <Link to="/signin">
              <Button className="m-2" variant="info">
                Sign in to rate
              </Button>
              <FontAwesomeIcon
                className="text-secondary m-1"
                icon={`fa-regular fa-thumbs-up`}
              />
              <Badge pill bg="success">
                {thumbsup}
              </Badge>
              <FontAwesomeIcon
                className="text-secondary m-1"
                icon={`fa-regular fa-thumbs-down`}
              />
              <Badge pill bg="danger">
                {thumbsdown}
              </Badge>
            </Link>
          </Stack>
        </Card.Footer>
      )}
    </>
  );
};

export default GameRatings;
