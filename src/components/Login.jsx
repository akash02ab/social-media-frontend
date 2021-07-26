import { Box, Heading, InputGroup, Input, Button, Grid, VStack, Center, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Error from "./Error";

const Login = () => {
	const { user, inputRef, authError, login } = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		if (user) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [user]);

	return (
		<Center h="100vh">
			<VStack direction="column" align="center" spacing="40px">
				<Heading size="xl">Socia Media</Heading>

				<Box maxW="sm" borderWidth="1px" borderRadius="lg" p="8">
					<Grid gap={6}>
						<Heading size="lg">Login</Heading>

						<InputGroup>
							<Input
								type="text"
								placeholder="Username"
								size="md"
								ref={(value) => (inputRef.current.username = value)}
							/>
						</InputGroup>

						<InputGroup>
							<Input
								type="password"
								placeholder="Password"
								size="md"
								ref={(value) => (inputRef.current.password = value)}
							/>
						</InputGroup>

						<Button colorScheme="blue" onClick={login}>
							Submit
						</Button>
					</Grid>
				</Box>

				<Text fontSize="lg" color="#3182ce">
					<Link to="/signup">Don't have an account? Sign up.</Link>
				</Text>
			</VStack>

			{authError && <Error error={authError} />}
		</Center>
	);
};

export default Login;
