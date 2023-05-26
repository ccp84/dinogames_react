import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewList = (props) => {

  return (
    <>
      {!props.reviews.length ? (
        <ListGroup>
          <ListGroupItem>
            No reviews yet. Why not write the first one.
          </ListGroupItem>
        </ListGroup>
      ) : (
        <>
          <ListGroup>
            {props.reviews.map((review) => {
              return (
                <ListGroupItem key={review.id}>
                  <p>{review.content}</p>
                  <p>
                    Updated on: {review.lastupdated} by : {review.author}
                    <FontAwesomeIcon
                      className="text-primary m-1"
                      icon={`fa-solid fa-${review.profileicon}`}
                    />
                  </p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
      </>
      )}
    </>
  );
};

export default ReviewList;
