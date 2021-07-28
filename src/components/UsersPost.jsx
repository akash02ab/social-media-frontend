import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import Post from "./Post";

const UsersPost = ({ name }) => {
	const { post } = useContext(PostContext);

	return (
		<Box p={8}>
			<Heading as="h2" size="lg" textTransform="capitalize" my={4}>
				{name}'s Post:
			</Heading>

			<Grid gap={8}>
				{post.length ? (
					post.map((post, index) => <Post post={post} key={index} index={index} page="proflie" />)
				) : (
					<Text fontSize="xl">No Post To Show</Text>
				)}
			</Grid>
		</Box>
	);
};

export default UsersPost;
