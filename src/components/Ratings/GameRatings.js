import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetCurrentMessage } from '../../contexts/CurrentMessageContext';
import { axiosReq } from '../../api/axiosDefaults';
import SolidIcon from '../icons/SolidIcon';
import RegularIcon from '../icons/RegularIcon';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { useQueryClient } from '@tanstack/react-query';

const GameRatings = ({
	thumbsup,
	thumbsdown,
	ratingid,
	ratingvalue,
	gameid
}) => {
	const currentUser = useCurrentUser();
	const queryClient = useQueryClient();
	const setCurrentMessage = useSetCurrentMessage();
	return (
		<>
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
											aria-label="thumbs up"
											onClick={async () => {
												try {
													await axiosReq.delete(
														`/ratings/${ratingid}`
													);
													queryClient.invalidateQueries(
														{
															queryKey: [
																'libraryData'
															]
														}
													);
												} catch (err) {
													setCurrentMessage({
														flag: true,
														message:
															err.response?.data,
														variant: 'warning'
													});
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
											aria-label="thumbs down"
											onClick={async () => {
												try {
													await axiosReq.put(
														`/ratings/${ratingid}`,
														`{"game": ${gameid}, "rating": false}`
													);
													queryClient.invalidateQueries(
														{
															queryKey: [
																'libraryData'
															]
														}
													);
												} catch (err) {
													setCurrentMessage({
														flag: true,
														message:
															err.response?.data,
														variant: 'warning'
													});
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
											aria-label="thumbs up"
											onClick={async () => {
												try {
													await axiosReq.put(
														`/ratings/${ratingid}`,
														`{"game": ${gameid}, "rating": true}`
													);
													queryClient.invalidateQueries(
														{
															queryKey: [
																'libraryData'
															]
														}
													);
												} catch (err) {
													setCurrentMessage({
														flag: true,
														message:
															err.response?.data,
														variant: 'warning'
													});
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
											aria-label="thumbs down"
											onClick={async () => {
												try {
													await axiosReq.delete(
														`/ratings/${ratingid}`
													);
													queryClient.invalidateQueries(
														{
															queryKey: [
																'libraryData'
															]
														}
													);
												} catch (err) {
													setCurrentMessage({
														flag: true,
														message:
															err.response?.data,
														variant: 'warning'
													});
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
									aria-label="thumbs up"
									onClick={async () => {
										try {
											await axiosReq.post(
												'/ratings/',
												`{
                            "game": ${gameid},
                            "rating": true
                            }`
											);
											queryClient.invalidateQueries({
												queryKey: ['libraryData']
											});
										} catch (err) {
											setCurrentMessage({
												flag: true,
												message: err.response?.data,
												variant: 'warning'
											});
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
									aria-label="thumbs down"
									onClick={async () => {
										try {
											await axiosReq.post(
												'/ratings/',
												`{
                            "game": ${gameid},
                            "rating": false
                            }`
											);
											queryClient.invalidateQueries({
												queryKey: ['libraryData']
											});
										} catch (err) {
											setCurrentMessage({
												flag: true,
												message: err.response?.data,
												variant: 'warning'
											});
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
						<RegularIcon
							className="text-secondary m-1"
							iconName="thumbs-up"
						/>
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
