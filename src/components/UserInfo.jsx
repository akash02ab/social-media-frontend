import { Box, Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";

const UserInfo = () => {
	const { user, myProfile, follow, unfollow } = useContext(UsersContext);

	return (
		<Box minW={300} boxShadow="2px 2px 4px 2px lightblue" p={4}>
			<Grid gap={4}>
				<Flex direction="column" align="center">
					{user.avatar ? (
						<Image
							src={`https://socia-media-api.herokuapp.com/images/${user.avatar}`}
							alt="avatar"
							boxSize="60px"
							p={1}
							borderRadius="50%"
						/>
					) : (
						<Image src="/user-astronaut.svg" alt="avatar" boxSize="60px" justify="center" />
					)}

					<Heading as="h3" size="lg" textTransform="capitalize">
						{user.username}
					</Heading>
				</Flex>

				<Flex justify="space-between" align="center">
					<Text fontSize="xl" fontWeight="700" color="blue.500">
						@{user.username}
					</Text>

					{myProfile.username !== user.username ? (
						myProfile.following.includes(user._id) ? (
							<Button colorScheme="red" variant="solid" onClick={() => unfollow(user.username)}>
								Unfollow
							</Button>
						) : (
							<Button colorScheme="blue" variant="solid" onClick={() => follow(user.username)}>
								Follow
							</Button>
						)
					) : null}
				</Flex>

				<Flex justify="space-between">
					<Text fontSize="lg" color="gray.500">{`Followers: ${user.followers.length}`}</Text>
					<Text fontSize="lg" color="gray.500">{`Following: ${user.following.length}`}</Text>
				</Flex>
			</Grid>
		</Box>
	);
};

export default UserInfo;
