import {
	Box,
	Heading,
	Input,
	Button,
	Grid,
	VStack,
	Center,
	Text,
	useToast,
	InputGroup,
	InputLeftElement,
	Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Error from "./Error";

const Signup = () => {
	const { inputRef, signup, success, setAvatar, authError, setAuthError } = useContext(AuthContext);
	const toast = useToast();
	const history = useHistory();

	return (
		<Center h="100vh">
			<VStack direction="column" align="center" spacing="40px">
				<Heading size="xl">Socia Media</Heading>

				<Box maxW="sm" borderWidth="1px" borderRadius="lg" p="8">
					<Grid gap={6}>
						<Heading size="lg">Sign Up</Heading>

						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Image src="/user-circle-solid.svg" boxSize={4} />}
							/>
							<Input
								type="text"
								placeholder="Username"
								size="md"
								ref={(value) => (inputRef.current.username = value)}
							/>
						</InputGroup>

						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Image src="/envelope-solid.svg" boxSize={4} />}
							/>
							<Input
								type="email"
								placeholder="Email"
								size="md"
								ref={(value) => (inputRef.current.email = value)}
							/>
						</InputGroup>

						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Image src="/lock-solid.svg" boxSize={4} />}
							/>
							<Input
								type="password"
								placeholder="Password"
								size="md"
								ref={(value) => (inputRef.current.password = value)}
							/>
						</InputGroup>

						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Image src="/lock-solid.svg" boxSize={4} />}
							/>
							<Input
								type="password"
								placeholder="Re-Enter Password"
								size="md"
								ref={(value) => (inputRef.current.repassword = value)}
							/>
						</InputGroup>

						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<Image src="/file-image-solid.svg" boxSize={4} />}
							/>
							<Input
								type="file"
								placeholder="Upload Avatar"
								size="md"
								onChange={(e) => setAvatar(e.target.files[0])}
							/>
						</InputGroup>

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
					onCloseComplete: () => history.push("/login"),
				})}

			{authError && <Error error={authError} setError={setAuthError} />}
		</Center>
	);
};

export default Signup;
