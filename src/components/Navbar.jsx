import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const history = useHistory();
	return (
		<VStack h="10vh" align="stretch" boxShadow="1px 1px 4px 1px lightblue" bg="blue.50">
			<Flex justify="space-between" align="center">
				<Box ml={8}>
					<Heading color="blue.500">Socia Media</Heading>
				</Box>

				<Box alignSelf="flex-end" m={4}>
					<Button colorScheme="blue" mr={4} onClick={() => history.push(`/profile/${user.username}`)}>
						Profile
					</Button>

					<Button colorScheme="teal" mr={8} onClick={logout}>
						Logout
					</Button>
				</Box>
			</Flex>
		</VStack>
	);
};

export default Navbar;
