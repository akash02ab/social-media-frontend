import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import AddPost from "./AddPost";
import Error from "./Error";
import Post from "./Post";

const Posts = () => {
	const { myPost, toggleForm, setToggleForm, postError, setPostError } = useContext(PostContext);

	return (
		<Box w="80vw" minH="90vh" p={1}>
			<VStack align="center">
				<Heading size="lg" m={4}>
					Posts by your friends
				</Heading>

				<Grid gap={8}>
					{myPost.length ? (
						myPost.map((post, index) => <Post post={post} key={index} index={index} page="home" />)
					) : (
						<Text fontSize="xl">No posts, follow more people</Text>
					)}
				</Grid>
			</VStack>

			<Button
				variant="solid"
				colorScheme="blue"
				borderRadius="50%"
				pos="fixed"
				bottom="5%"
				right="25%"
				onClick={() => setToggleForm(!toggleForm)}
			>
				<Text>+</Text>
			</Button>

			{toggleForm ? <AddPost /> : null}

			{postError && <Error error={postError} setError={setPostError} />}
		</Box>
	);
};

export default Posts;
