import { Center, HStack, Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import Posts from "./Posts";
import Suggestion from "./Suggestion";

const Wrapper = () => {
	const { getAllPostOfMine, loading } = useContext(PostContext);

	useEffect(() => {
		getAllPostOfMine();
		// eslint-disable-next-line
	}, []);

	return (
		<Center position="relative" overflowX="hidden">
			<HStack w="100vw" minH="100vh" d="flex" justify="center">
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
						<Posts />
						<Suggestion />
					</>
				)}
			</HStack>
		</Center>
	);
};

export default Wrapper;
