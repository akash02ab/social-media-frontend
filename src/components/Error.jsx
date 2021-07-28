import { useToast } from "@chakra-ui/react";

const Error = ({ error, setError }) => {
	const toast = useToast();

	return toast({
		title: "Error",
		description: error,
		status: "error",
		duration: 5000,
		isClosable: true,
		onCloseComplete: () => setError(null),
	});
};

export default Error;
