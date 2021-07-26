import axios from "axios";
import React, { createContext, useRef, useState } from "react";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const [myPost, setMyPost] = useState([]);
	const [loading, setLoading] = useState(false);
	const [postError, setPostError] = useState(null);
	const [toggleForm, setToggleForm] = useState(false);
	const title = useRef();

	let _id;
	let persistance = JSON.parse(localStorage.getItem("social-media"));

	if (persistance) {
		_id = persistance._id;
	}

	const getAllPostOfMine = async () => {
		try {
			setLoading(true);

			let response = await axios.get("post/all/");
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
		}

		try {
			let response = await axios.post("post/", {
				title: title.current.value,
				createdBy: _id,
			});
			const data = await response.data;

			setPostError(null);
			setMyPost([...myPost, data]);
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	const likePost = async (pid, index) => {
		try {
			let response = await axios.post("post/like/", {
				uid: _id,
				pid: pid,
			});
			const data = await response.data;

			setPostError(null);
			let myPostCopy = [...myPost];
			myPostCopy.splice(index, 1, data);
			setMyPost(myPostCopy);
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	const deletePost = async (_id, index) => {
		try {
			await axios.delete("post/", { data: { _id } });

			setPostError(null);
			let myPostCopy = [...myPost];
			myPostCopy.splice(index, 1);
			setMyPost(myPostCopy);
		} catch (err) {
			setPostError(err.response.data);
		}
	};

	return (
		<PostContext.Provider
			value={{
				myPost,
				loading,
				postError,
				getAllPostOfMine,
				title,
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
