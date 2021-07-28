import { Container, Spinner, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../contexts/PostContext";
import { UsersContext } from "../contexts/UsersContext";
import Navbar from "./Navbar";
import UserInfo from "./UserInfo";
import UsersPost from "./UsersPost";

const Profile = () => {
	const [loading, setLoading] = useState(true);
	const { username } = useParams();
	const { getUser } = useContext(UsersContext);
	const { getAllPostOfUser } = useContext(PostContext);

	useEffect(() => {
		getUser(username);
		getAllPostOfUser(username);
		setTimeout(() => setLoading(false), 1500);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Navbar />
			<Container w="100vw" p={8}>
				<VStack align="center">
					{loading ? (
						<Spinner
							size="xl"
							spedd="0.65s"
							color="blue.500"
							emptyColor="gray.200"
							spacing={4}
							thickness="4px"
							mt={16}
						/>
					) : (
						<>
							<UserInfo />
							<UsersPost name={username} />
						</>
					)}
				</VStack>
			</Container>
		</>
	);
};

export default Profile;
