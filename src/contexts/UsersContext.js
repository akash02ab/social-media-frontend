import axios from "axios";
import React, { createContext, useState } from "react";

const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [myProfile, setMyProfile] = useState(null);
	const [userError, setUserError] = useState(null);

	const getMyProfile = async () => {
		try {
			let response = await axios.get("user");
			const data = await response.data;

			setUserError(null);
			setMyProfile(data);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	const getUser = async (username) => {
		try {
			let response = await axios.get(`user/profile/${username}`);
			const data = await response.data;

			setUserError(null);
			setUser(data);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	const getAllUsers = async () => {
		try {
			let response = await axios.get("user/all");
			const data = await response.data;

			setUserError(null);
			setUsers(data);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	const follow = async (username, index) => {
		try {
			let response = await axios.patch("user/follow", { username });
			const data = await response.data;

			setUserError(null);

			if (index) {
				let usersCopy = [...users];
				usersCopy.splice(index, 1, data);
				setUsers(usersCopy);
			}

			let me = { ...myProfile };
			me.following.push(data._id);
			setMyProfile(me);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	const unfollow = async (username) => {
		try {
			let response = await axios.patch("user/unfollow", { username });
			const data = await response.data;

			setUserError(null);
			let me = { ...myProfile };
			let index = me.following.indexOf(data._id);
			me.following.splice(index, 1);
			setMyProfile(me);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	return (
		<UsersContext.Provider
			value={{
				myProfile,
				user,
				users,
				userError,
				setUserError,
				getMyProfile,
				getUser,
				getAllUsers,
				follow,
				unfollow,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

export { UsersContext, UsersContextProvider };
