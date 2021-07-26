import { Box, Grid, HStack, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";

const Post = ({ post, index }) => {
	const { likePost, deletePost } = useContext(PostContext);
	const {
		user: { username },
	} = useContext(AuthContext);

	return (
		<Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" w="350px">
			<Grid gap={1}>
				<Text fontSize="md" color="blue.400">{`@${username}`}</Text>

				<Text fontSize="2xl">{post.title}</Text>

				<Text fontSize="sm" color="gray.500">{`Posted on: ${new Date(post.createdAt).toLocaleString()}`}</Text>

				<HStack justify="space-between" align="center">
					<HStack align="flex-start">
						<Text>{`${post.likedBy.length} likes`}</Text>

						<Image
							src="./thumbs-up.svg"
							alt="thumbs up"
							boxSize="20px"
							cursor="pointer"
							onClick={() => likePost(post._id, index)}
						/>
					</HStack>

					<Image
						src="./trash.svg"
						alt="delete"
						boxSize="20px"
						cursor="pointer"
						onClick={() => deletePost(post._id, index)}
					/>
				</HStack>
			</Grid>
		</Box>
	);
};

export default Post;
