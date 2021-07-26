import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
} from "@chakra-ui/react";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

const AddPost = () => {
	const { title, addNewPost, toggleForm, setToggleForm } = useContext(PostContext);

	const clickhandler = () => {
		addNewPost();
		setToggleForm((prev) => !prev);
	};

	return (
		<Modal isOpen={toggleForm} onClose={() => setToggleForm((prev) => !prev)}>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader>Add New Post</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Textarea placeholder="add your post here" size="sm" mb={4} ref={title} />
				</ModalBody>

				<ModalFooter>
					<Button variant="solid" bg="gray.300" mr={6} onClick={() => setToggleForm((prev) => !prev)}>
						Cancel
					</Button>

					<Button variant="solid" colorScheme="blue" onClick={clickhandler}>
						Post
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddPost;
