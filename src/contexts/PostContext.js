import axios from "axios";
import React, { createContext, useContext, useRef, useState } from "react";
import { UsersContext } from "./UsersContext";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const [myPost, setMyPost] = useState([]);
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(false);
	const [postError, setPostError] = useState(null);
	const [toggleForm, setToggleForm] = useState(false);
	const { myProfile } = useContext(UsersContext);
	const title = useRef();

	const getAllPostOfMine = async () => {
		try {
			setLoading(true);

			let response = await axios.get("post/all");
			const data = await response.data;

			setPostError(null);
			setMyPost(data);

			setLoading(false);
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	const addNewPost = async () => {
		if (title.current.value === "") {
			setPostError("Title is required.");
			return;
		} else {
			setPostError(null);
		}

		try {
			let response = await axios.post("post", {
				title: title.current.value,
				createdBy: myProfile._id,
			});
			let data = await response.data;
			let userId = data.createdBy;

			data.createdBy = { _id: userId, username: myProfile.username, avatar: myProfile.avatar };

			setPostError(null);
			setMyPost([...myPost, data]);
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	const likePost = async (pid, index, page) => {
		try {
			let response = await axios.post("post/like", {
				uid: myProfile._id,
				pid: pid,
			});
			const data = await response.data;

			setPostError(null);

			if (page === "home") {
				let myPostCopy = [...myPost];
				myPostCopy.splice(index, 1, data);
				setMyPost(myPostCopy);
			} else {
				let postCopy = [...post];
				postCopy.splice(index, 1, data);
				setPost(postCopy);
			}
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	const deletePost = async (_id, index, page) => {
		try {
			await axios.delete("post", { data: { _id } });

			setPostError(null);

			if (page === "home") {
				let myPostCopy = [...myPost];
				myPostCopy.splice(index, 1);
				setMyPost(myPostCopy);
			} else {
				let postCopy = [...post];
				postCopy.splice(index, 1);
				setPost(postCopy);
			}
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	const getAllPostOfUser = async (username) => {
		try {
			let response = await axios.get(`post/profile/${username}`);
			const data = await response.data;

			setPostError(null);
			setPost(data);
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	return (
		<PostContext.Provider
			value={{
				myPost,
				post,
				title,
				loading,
				postError,
				setPostError,
				getAllPostOfMine,
				getAllPostOfUser,
				addNewPost,
				toggleForm,
				setToggleForm,
				likePost,
				deletePost,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export { PostContext, PostContextProvider };
