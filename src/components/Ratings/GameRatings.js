import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Alert, Badge, Button, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useQueryClient } from "@tanstack/react-query";
import SolidIcon from "../icons/SolidIcon";
import RegularIcon from "../icons/RegularIcon";

const GameRatings = ({
	thumbsup,
	thumbsdown,
	ratingid,
	ratingvalue,
	gameid,
}) => {
	const currentUser = useCurrentUser();
	const queryClient = useQueryClient();
	const [errors, setErrors] = useState({});
	return (
		<>{errors.data?.map((message, idx) => (
			<Alert key={idx} variant="warning">
				{message}
			</Alert>
		))}
			{currentUser ? (
				<>
					{ratingid ? (
						// User is logged in and there is a rating already returned
						<>
							{ratingvalue ? (
								// Rating returned is true - thumbs up

								<Card.Title className="text-primary">
									<Stack direction="horizontal" gap={3}>
										<Link
											onClick={async () => {
												try {
													await axiosReq.delete(`/ratings/${ratingid}`);
													queryClient.invalidateQueries({
														queryKey: ["libraryData"],
													});
												} catch (err) {
													setErrors(
														err.response?.data);
												}
											}}
										>
											<SolidIcon
												iconName="thumbs-up"
												className="text-success m-1"
											/>
										</Link>
										<Badge pill bg="success">
											{thumbsup}
										</Badge>
										<Link
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
													setErrors(
														err.response?.data);
												}
											}}
										>
											<RegularIcon
												className="text-secondary m-1"
												iconName="thumbs-down"
											/>
										</Link>
										<Badge pill bg="danger">
											{thumbsdown}
										</Badge>
									</Stack>
								</Card.Title>
							) : (
								// Rating returned is false - thumbs down

								<Card.Title>
									<Stack direction="horizontal" gap={3}>
										<Link
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
													setErrors(
														err.response?.data);
												}
											}}
										>
											<RegularIcon
												className="text-secondary m-1"
												iconName="thumbs-up"
											/>
										</Link>

										<Badge pill bg="success">
											{thumbsup}
										</Badge>
										<Link
											onClick={async () => {
												try {
													await axiosReq.delete(`/ratings/${ratingid}`);
													queryClient.invalidateQueries({
														queryKey: ["libraryData"],
													});
												} catch (err) {
													setErrors(
														err.response?.data);
												}
											}}
										>
											<SolidIcon
												className="text-danger m-1"
												iconName="thumbs-down"
											/>
										</Link>
										<Badge pill bg="danger">
											{thumbsdown}
										</Badge>
									</Stack>
								</Card.Title>
							)}
						</>
					) : (
						// User is logged in but there is no rating id returned

						<Card.Title>
							<Stack direction="horizontal" gap={3}>
								<Link
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
											setErrors(err.response?.data);
										}
									}}
								>
									<RegularIcon
										className="text-secondary m-1"
										iconName="thumbs-up"
									/>
								</Link>
								<Badge pill bg="success">
									{thumbsup}
								</Badge>
								<Link
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
											setErrors(err.response?.data);
										}
									}}
								>
									<RegularIcon
										className="text-secondary m-1"
										iconName="thumbs-down"
									/>
								</Link>
								<Badge pill bg="danger">
									{thumbsdown}
								</Badge>
							</Stack>
						</Card.Title>
					)}
				</>
			) : (
				// User is not logged in

				<Stack direction="horizontal" gap={3}>
					<Link to="/signin">
						<Button className="m-2" variant="info">
							Sign in to rate
						</Button>
						<RegularIcon className="text-secondary m-1" iconName="thumbs-up" />
						<Badge pill bg="success">
							{thumbsup}
						</Badge>
						<RegularIcon
							className="text-secondary m-1"
							iconName="thumbs-down"
						/>
						<Badge pill bg="danger">
							{thumbsdown}
						</Badge>
					</Link>
				</Stack>
			)}
		</>
	);
};

export default GameRatings;
