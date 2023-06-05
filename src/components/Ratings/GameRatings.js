import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Badge, Button, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const GameRatings = ({ thumbsup, thumbsdown, ratingid, ratingvalue }) => {
  const currentUser = useCurrentUser();
  return (
    <>
      {currentUser ? (
        <>
          {ratingid ? (
            <>
              {ratingvalue ? (
                <Card.Footer>
                  <Card.Title className="text-primary">
                    <Stack direction="horizontal" gap={3}>
                      <FontAwesomeIcon
                        className="text-success m-1"
                        icon={`fa-solid fa-thumbs-up`}
                      />
                      <Badge pill bg="success">
                        {thumbsup}
                      </Badge>
                      <FontAwesomeIcon
                        className="text-secondary m-1"
                        icon={`fa-solid fa-thumbs-down`}
                      />
                      <Badge pill bg="danger">
                        {thumbsdown}
                      </Badge>
                    </Stack>
                  </Card.Title>
                </Card.Footer>
              ) : (
                <Card.Footer>
                  <Card.Title className="text-primary">
                    <Stack direction="horizontal" gap={3}>
                      <FontAwesomeIcon
                        className="text-secondary m-1"
                        icon={`fa-solid fa-thumbs-up`}
                      />
                      <Badge pill bg="success">
                        {thumbsup}
                      </Badge>
                      <FontAwesomeIcon
                        className="text-danger m-1"
                        icon={`fa-solid fa-thumbs-down`}
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
            <Card.Footer>
              <Card.Title className="text-primary">
                <Stack direction="horizontal" gap={3}>
                  <FontAwesomeIcon
                    className="text-secondary m-1"
                    icon={`fa-solid fa-thumbs-up`}
                  />
                  <Badge pill bg="success">
                    {thumbsup}
                  </Badge>
                  <FontAwesomeIcon
                    className="text-secondary m-1"
                    icon={`fa-solid fa-thumbs-down`}
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
        <Card.Footer>
          <Stack direction="horizontal" gap={3}>
            <Link to="/signin">
              <Button className="m-2" variant="info">
                Sign in to rate
              </Button>
              <FontAwesomeIcon
                className="text-secondary m-1"
                icon={`fa-solid fa-thumbs-up`}
              />
              <Badge pill bg="success">
                {thumbsup}
              </Badge>
              <FontAwesomeIcon
                className="text-secondary m-1"
                icon={`fa-solid fa-thumbs-down`}
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
