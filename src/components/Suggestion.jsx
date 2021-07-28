import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../contexts/PostContext";
import { UsersContext } from "../contexts/UsersContext";
import Error from "./Error";

const Suggestion = () => {
	const {
		myProfile: me,
		users,
		userError,
		setUserError,
		getMyProfile,
		getAllUsers,
		follow,
	} = useContext(UsersContext);
	const { getAllPostOfMine } = useContext(PostContext);

	useEffect(() => {
		getMyProfile();
		getAllUsers();
		// eslint-disable-next-line
	}, []);

	return (
		<Box w="20vw" minHeight="90vh" bg="gray.50" position="fixed" top="10.5%" right={0}>
			{users.length && me ? (
				<Grid gap={6} p={4} m={2}>
					<Text>Follow other users :</Text>

					{users.map((user, index) => {
						return me.username !== user.username && !me.following.includes(user._id) ? (
							<Box p={4} borderRadius="10px" boxShadow="1px 1px 4px 1px grey" bg="white" key={index}>
								<Grid gap={1}>
									<Text color="blue.400" fontSize="lg">
										<Link to={`/profile/${user.username}`}>@{user.username}</Link>
									</Text>

									<Text color="gray">{`Followers: ${user.followers.length}`}</Text>

									<Button
										variant="solid"
										bg="gray.200"
										isFullWidth={false}
										w={28}
										onClick={() => {
											follow(user.username, index);
											setTimeout(() => getAllPostOfMine(), 1000);
										}}
									>
										Follow
									</Button>
								</Grid>
							</Box>
						) : null;
					})}
				</Grid>
			) : (
				<Text p={4} m={2}>
					No one to follow yet
				</Text>
			)}

			{userError && <Error error={userError} setError={setUserError} />}
		</Box>
	);
};

export default Suggestion;
