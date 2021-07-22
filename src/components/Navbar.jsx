import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
	const { logout } = useContext(AuthContext);

	return (
		<VStack h="10vh" align="stretch" boxShadow="1px 1px 4px 1px gray">
			<Flex justify="space-between" align="center">
				<Box ml={8}>
					<Heading>Social Media</Heading>
				</Box>
				<Box alignSelf="flex-end" m={4}>
					<Button colorScheme="blue" mr={4}>
						Profile
					</Button>
					<Button mr={8} onClick={logout}>
						Logout
					</Button>
				</Box>
			</Flex>
		</VStack>
	);
};

export default Navbar;
