import { Box, Grid, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../contexts/PostContext";
import { UsersContext } from "../contexts/UsersContext";

const Post = ({ post, index, page }) => {
	const { likePost, deletePost } = useContext(PostContext);
	const { myProfile } = useContext(UsersContext);

	return (
		<Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" w="350px">
			<Grid gap={1}>
				<HStack align="center">
					{post.createdBy.avatar ? (
						<Image
							src={`https://socia-media-api.herokuapp.com/images/${post.createdBy.avatar}`}
							alt="avatar"
							boxSize="45px"
							p={1}
							borderRadius="50%"
						/>
					) : (
						<Image src="/user-astronaut.svg" alt="avatar" boxSize="30px" justify="center" />
					)}

					<VStack spacing={0} align="flex-start">
						<Heading as="h5" size="md" textTransform="capitalize">
							{post.createdBy.username}
						</Heading>

						<Text fontSize="sm" color="blue.400">
							<Link to={`/profile/${post.createdBy.username}`}>@{post.createdBy.username}</Link>
						</Text>
					</VStack>
				</HStack>

				<Text fontSize="2xl">{post.title}</Text>

				<Text fontSize="sm" color="gray.500">{`Posted on: ${new Date(post.createdAt).toLocaleString()}`}</Text>

				<HStack justify="space-between" align="center">
					<HStack align="flex-start">
						<Text>{`${post.likedBy.length} likes`}</Text>

						<Image
							src="/thumbs-up.svg"
							alt="thumbs up"
							boxSize="25px"
							p={1}
							cursor="pointer"
							bg={post.likedBy.includes(myProfile._id) ? "blue.100" : ""}
							borderRadius="50%"
							onClick={() => likePost(post._id, index, page)}
						/>
					</HStack>

					{post.createdBy._id === myProfile._id && (
						<Image
							src="/trash.svg"
							alt="delete"
							boxSize="20px"
							cursor="pointer"
							onClick={() => deletePost(post._id, index, page)}
						/>
					)}
				</HStack>
			</Grid>
		</Box>
	);
};

export default Post;
