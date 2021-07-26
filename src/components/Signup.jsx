import { Box, Heading, Input, Button, Grid, VStack, Center, Text, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Error from "./Error";

const Signup = () => {
	const { inputRef, signup, authError, success, setAvatar } = useContext(AuthContext);
	const toast = useToast();
	return (
		<Center h="100vh">
			<VStack direction="column" align="center" spacing="40px">
				<Heading size="xl">Socia Media</Heading>

				<Box maxW="sm" borderWidth="1px" borderRadius="lg" p="8">
					<Grid gap={6}>
						<Heading size="lg">Sign Up</Heading>

						<Input
							type="text"
							placeholder="Username"
							size="md"
							ref={(value) => (inputRef.current.username = value)}
						/>

						<Input
							type="email"
							placeholder="Email"
							size="md"
							ref={(value) => (inputRef.current.email = value)}
						/>

						<Input
							type="password"
							placeholder="Password"
							size="md"
							ref={(value) => (inputRef.current.password = value)}
						/>

						<Input
							type="password"
							placeholder="Re-Enter Password"
							size="md"
							ref={(value) => (inputRef.current.repassword = value)}
						/>

						<Input
							type="file"
							placeholder="Upload Avatar"
							size="md"
							onChange={(e) => setAvatar(e.target.files[0])}
						/>

						<Button colorScheme="blue" onClick={signup}>
							Submit
						</Button>
					</Grid>
				</Box>
				<Text fontSize="lg" color="#3182ce">
					<Link to="/login">Already have an account? Login.</Link>
				</Text>
			</VStack>

			{success &&
				toast({
					title: "Success",
					description: success,
					status: "success",
					duration: 3000,
					isClosable: true,
				})}

			{authError && <Error error={authError} />}
		</Center>
	);
};

export default Signup;
