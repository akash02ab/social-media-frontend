import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";
import Error from "./Error";

const Suggestion = () => {
	const { myProfile: me, users, userError, getMyProfile, getAllUsers, follow } = useContext(UsersContext);

	useEffect(() => {
		getMyProfile();
		getAllUsers();
		// eslint-disable-next-line
	}, []);

	return (
		<Box w="20vw" minH="89vh" bg="blue.50">
			{users.length && me ? (
				<Grid gap={6} p={4} m={2}>
					<Text>Follow other users :</Text>

					{users.map((user, index) => {
						return me.username !== user.username && !me.following.includes(user._id) ? (
							<Box p={4} borderRadius="10px" boxShadow="1px 1px 4px 1px grey" bg="white" key={index}>
								<Grid gap={1}>
									<Text color="blue.400" fontSize="lg">
										@{user.username}
									</Text>

									<Text color="gray">{`Followers: ${user.followers.length}`}</Text>

									<Button
										variant="solid"
										bg="gray.200"
										isFullWidth={false}
										w={28}
										onClick={() => follow(user.username, index)}
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

			{userError && <Error error={userError} />}
		</Box>
	);
};

export default Suggestion;
