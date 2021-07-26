import { useToast } from "@chakra-ui/react";

const Error = ({ error }) => {
	const toast = useToast();

	return toast({
		title: "Error",
		description: error,
		status: "error",
		duration: 5000,
		isClosable: true,
	});
};

export default Error;
